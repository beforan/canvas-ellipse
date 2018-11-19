import Engine from "../Engine";
import Component from "../enum/Component";
import Frame from "../Frame";
import Entity from "../Entity";
import PositionComponent from "../components/PositionComponent";
import AppearanceComponent from "../components/AppearanceComponent";
import WidthComponent from "../components/WidthComponent";
import DirectionComponent from "../components/DirectionComponent";
import ParentComponent from "../components/ParentComponent";

/** A System for drawing straight lines */
export default class LineRenderer {
    /** The instance of the Engine we belong to */
    engine: Engine;

    /**
     * Create a line renderer instance for the provided Engine instance
     * @param {Engine} engine - The instance of the Engine we belong to
     */
    constructor(engine: Engine) {
        this.engine = engine;
    }

    /**
     * Check whether an entity meets the requirements to be processed by this system.
     * @param entity The entity to check.
     */
    public static canProcess(entity: Entity): boolean {
        return entity[Component.Position] != null
            && entity[Component.Direction] != null
            && entity[Component.Width] != null
            && entity[Component.Appearance] != null;
    }

    /** Draw the specified line entity */
    draw(entity: Entity) {
        if (!LineRenderer.canProcess(entity)) return;

        const pos = entity[Component.Position] as PositionComponent;
        const dir = entity[Component.Direction] as DirectionComponent;

        let drawPos = { x: 0, y: 0 };
        if (entity[Component.Parent]) {
            let parentPos = (entity[Component.Parent] as ParentComponent).entity[Component.Position] as PositionComponent;
            //make position relative to parent
            drawPos.x = pos.x + parentPos.x;
            drawPos.y = pos.y + parentPos.y;
        } else {
            drawPos.x = pos.x;
            drawPos.y = pos.y;
        }

        //use the re-usable Graphics API function to draw the line
        this.engine.Graphics.line(drawPos, dir, {
            treatEndAsDirectionVector: true,
            width: entity[Component.Width].value,
            colour: entity[Component.Appearance].colour
        });
    }
}