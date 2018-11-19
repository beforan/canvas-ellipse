import Component from "../engine/enum/Component";
import * as Vector2 from "victor";
import Entity from "../engine/Entity";
import LineColliderComponent from "../engine/components/LineColliderComponent";
import PathComponent from "../engine/components/PathComponent";
import WidthComponent from "../engine/components/WidthComponent";
import AppearanceComponent from "../engine/components/AppearanceComponent";
import IPenLineOptions from "../params/IPenLineOptions";
import RangeBar from "./RangeBar";

export default class PenLine extends Entity {
    /** Instances of this PenLine colliding with a RangeBar */
    hits = new Array<Vector2>();

    /**
     * Create a Pen Line instance, with a start point
     * @param start - the start point
     */
    constructor(start: Vector2, options?: IPenLineOptions) {
        super();

        this.addComponent(new PathComponent(start));
        this.addComponent(new WidthComponent());
        this.addComponent(new AppearanceComponent());

        if(options) {
            if(options.width) this[Component.Width].value = options.width;
            if(options.colour) this[Component.Appearance].colour = options.colour;
        }
    }

    /** 
     * Update the Pen Line's LineCollider to only represent the line between the last 2 points.
     * An efficiency due to known usage within Ellipse.
     */
    private updateCollider() {
        let points = this[Component.Path].points;
        if (points.length > 1) {
            let p = points[points.length - 2],
                q = points[points.length - 1];
            this.addComponent(new LineColliderComponent(p.x, p.y, q.x, q.y, this.collisionCallback))
        }
    }

    /**
     * Append a point to the path.
     * @param point - a 2D vector for the absolute co-ordinates of the point
     */
    addPoint(point: Vector2) {
        this[Component.Path].points.push(point);
        this.updateCollider();
    }

    /**
     * Clears all currently stored points for this path, and starts from a new initial point
     * @param start 
     */
    reset(start: Vector2) {
        let p = this[Component.Path];
        p.points.length = 0;
        p.points.push(start);
        this.removeComponent(Component.LineCollider);
        this.hits.length = 0;
    }

    private collisionCallback(e: PenLine, other: Entity, hit: Vector2) {
        e.hits.push(hit);
    }
}