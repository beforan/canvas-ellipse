import Component from "../enum/Component";
import Entity from "../Entity";
import * as Vector2 from "victor";

/** A collision system for checking entities */
export default class LineCollider {
    /**
     * Check whether an entity meets the requirements to be processed by this system.
     * @param entity The entity to check.
     */
    public static canProcess(entity: Entity): boolean {
        return entity[Component.LineCollider] != null;
    }

    /**
     * Check if an entity with a LineColliderComponent collides with any other entities with LineColliderComponents
     * @param entity The entity to test. On any collision, this entity's LineCollider.onCollision() callback will be invoked.
     * @param entities The entities to test against.
     */
    checkCollision(entity: Entity, entities: Entity[]) {
        if(!LineCollider.canProcess(entity)) return;

        entities.forEach(e => {
            if(e == entity) return; //of course we collide with ourselves
            if(!LineCollider.canProcess(e)) return; //we only collide lines with lines in this system!

            let p = entity[Component.LineCollider].position,
                r = entity[Component.LineCollider].direction,
                q = e[Component.LineCollider].position,
                s = e[Component.LineCollider].direction;

            let hit = LineCollider.findIntersection(p, r, q, s);
            if(hit != null) entity[Component.LineCollider].onCollision(entity, e, hit);
        })
    }

    /**
     * Find the point of intersection, if any, of two lines
     * @param p 2D Vector representing the start point of the line A
     * @param r 2D Vector representing line A relative to its start point (p)
     * @param q 2D Vector representing the start point of the line B
     * @param s 2D Vector representing line B relative to its start point (p)
     */
    static findIntersection(p: Vector2, r: Vector2, q: Vector2, s: Vector2): Vector2 { 
        //https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
        //we use vector math on the LineColliderComponents to get the collision point
        if(r.cross(s) == 0) return null; //either don't collide, or are overlapping (guess we don't care if they overlap?)
        
        //Important note: Victor vectors are mutable!
        //most (all?) functions that return vectors return the mutated source

        //do this step by step

        //find t using t = (q - p) x s / (r x s)
        let qMinusP = new Vector2(q.x, q.y)
        qMinusP.subtract(p);
        let qpCrossS = qMinusP.cross(s),
            rCrossS = r.cross(s);

        let t = qpCrossS / rCrossS;

        //find u using u = (q - p) x r / r x s
        let qpCrossR = qMinusP.cross(r),
            u = qpCrossR / rCrossS;

        if(t >= 0 && t <= 1 && u >= 0 && u <= 1) { //collision!
            //find the hitpoint (p + tr = q + us) we only need to do one side
            
            //don't mutate p or r
            let result = new Vector2(p.x, p.y),
                newR = new Vector2(r.x, r.y);
            return result.add(newR.multiplyScalar(t)); //p + tr
        }
        
        return null;
    }
}