import Component from "./Component";
import Name from "../enum/Component";
import * as Vector2 from "victor";

/** A component that stores data about a linear direction */
export default class DirectionComponent extends Component {    
    vector: Vector2;
    
    private _x: number;

    /** x component of the direction vector */
    get x(): number { return this.vector.x; }
    set x(value) { this.vector.x = value; }

    /** y coomponent of the direction vector */
    get y(): number { return this.vector.y; }
    set y(value) { this.vector.y = value; }

    /**
     * Create a DirectionComponent with optional x, y to form a direction vector relative to a position.
     * @param {number} x Optionally set the x component. Defaults to 0.
     * @param {number} y Optionally set the y component. Defaults to 0.
     */
    constructor(x?: number, y?: number) {
        super(Name.Direction);
        this.vector = new Vector2(x, y);
        return this;
    }
}