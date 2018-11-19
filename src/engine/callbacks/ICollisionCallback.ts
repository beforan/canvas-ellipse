import Entity from "../Entity";
import * as Vector2 from "victor";

/** Represents the function signature for a collision callback */
export default interface ICollisionCallback {
    (entity: Entity, other: Entity, hit: Vector2)
}