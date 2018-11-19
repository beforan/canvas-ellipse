import Name from "../enum/Component";
import Component from "./Component";
import * as Vector2 from "victor";

/** A component that stores data about position in 2D space */
export default class PositionComponent extends Component {
    /** The position stored as a vector (relative to origin) */
    vector: Vector2;
    
    /** x co-ordinate of the position */
    get x(): number { return this.vector.x; }
    set x(value) { this.vector.x = value; }

    /** y co-ordinate of the position */
    get y(): number { return this.vector.y; }
    set y(value) { this.vector.y = value; }

    /**
     * Create a PositionComponent with optional x and y co-ords
     * @param {number} x Optionally set the x co-ord. Defaults to 0.
     * @param {number} y Optionally set the y co-ord. Defaults to 0.
     */
    constructor(x?: number, y?: number) {
        super(Name.Position);
        this.vector = new Vector2(x || 0, y || 0);

        return this;
    }
}