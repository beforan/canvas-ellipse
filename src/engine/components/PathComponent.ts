import Name from "../enum/Component";
import * as Vector2 from "victor";
import Component from "./Component";

/** Represents a path made by joining absolute co-ordinates in order. */
export default class PathComponent extends Component {
    /** An array of absolute frame positions that join to make a path */
    points = new Array<Vector2>();
    
    /**
     * Create a PathComponent with the specified initial point, and optional additional ones.
     * @param start - The initial point to start the path at
     * @param points - additional points to add upon initialisation
     */
    constructor(start: Vector2, ...points: Array<Vector2>) {
        super(Name.Path);
        
        this.points.push(start);
        this.points.push(...points);

        return this;
    }
}