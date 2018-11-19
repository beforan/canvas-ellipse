import Component from "../enum/Component";
import Engine from "../Engine";
import Entity from "../Entity";
import PositionComponent from "../components/PositionComponent";
import AppearanceComponent from "../components/AppearanceComponent";
import LabelComponent from "../components/LabelComponent";
import WidthComponent from "../components/WidthComponent";
import ParentComponent from "../components/ParentComponent";

/** A System for drawing text */
export default class TextRenderer {
    /** The instance of the Engine we belong to */
    engine: Engine;

    /**
     * Create a text renderer instance for the provided Engine instance
     * @param {Engine} engine - The instance of the Engine we belong to
     */
    constructor(engine: Engine) {
        this.engine = engine;
    }

    /**
     * Check whether an entity meets the requirements to be processed by this system.
     * @param entity The entity to check.
     */
    static canProcess(entity: Entity): boolean {
        return (entity[Component.Position] != null)
            && entity[Component.Label] != null
            && entity[Component.Appearance] != null;
    }

    /** Draw the specified Text entity */
    draw(entity: Entity) {
        if (!TextRenderer.canProcess(entity)) return;

        const label = entity[Component.Label] as LabelComponent;
        const pos = entity[Component.Position] as PositionComponent;

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

        //draw using the graphics api function
        this.engine.Graphics.print(label.text, drawPos, {
            width: entity[Component.Width] ? entity[Component.Width].value : null,
            font: label.font,
            baseline: label.baseline,
            alignment: label.alignment,
            colour: entity[Component.Appearance].colour
        })
    }
}