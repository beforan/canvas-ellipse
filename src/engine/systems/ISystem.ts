import Entity from "../Entity";

/** Represents contractual features of all Systems */
export default interface ISystem {
    /** Returns whether or not an entity can be processed by this system */
    canProcess(entity: Entity) : boolean
}

