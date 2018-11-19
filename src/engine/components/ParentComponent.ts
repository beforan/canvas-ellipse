import Name from "../enum/Component";
import Component from "./Component";
import Entity from "../Entity";

/** A component that stores data about this entity's parent entity */
export default class ParentComponent extends Component {
    /** the parent entity */
    entity: Entity;

    /**
     * Create a ParentComponent with parent entity id
     * @param {Entity} entity Required: reference to the parent entity. Normally easy to know as parents will instantiate their children.
     */
    constructor(entity: Entity ) {
        super(Name.Parent);
        this.entity = entity;
        return this;
    }
}