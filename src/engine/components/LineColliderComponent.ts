import Name from "../enum/Component";
import Component from "./Component";
import Entity from "../Entity";
import ICollisionCallback from "../callbacks/ICollisionCallback";
import * as Vector2 from "victor";

/** A component that stores contextual data about width */
export default class LineColliderComponent extends Component {
    /** The "Position" of the line i.e. the vector from origin to its start point */
    position: Vector2;
    /** Direction vector of the line from its position */
    direction: Vector2;

    onCollision: ICollisionCallback = function() {}; //do nothing by default
    
    /**
     * Create a LineColliderComponent with the specified values.
     * @param x1 - x position of the start of the line
     * @param y1 - y position of the start of the line
     * @param x2 - x position of the end of the line
     * @param y2 - y position of the end of the line
     */
    constructor(x1: number, y1: number, x2: number, y2: number, callback?: ICollisionCallback) {
        super(Name.LineCollider);
        this.position = new Vector2(x1, y1);
        this.direction = new Vector2(x2 - x1, y2 - y1); // direction is relative to position, not origin

        this.onCollision = callback || this.onCollision;
        return this;
    }
}