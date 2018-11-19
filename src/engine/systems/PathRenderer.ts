import Engine from "../Engine";
import Component from "../enum/Component";
import Frame from "../Frame";
import Entity from "../Entity";
import PositionComponent from "../components/PositionComponent";
import AppearanceComponent from "../components/AppearanceComponent";
import WidthComponent from "../components/WidthComponent";
import DirectionComponent from "../components/DirectionComponent";
import ParentComponent from "../components/ParentComponent";

/** A System for drawing paths made up of straight lines between multiple points */
export default class PathRenderer {
    /** The instance of the Engine we belong to */
    engine: Engine;

    /**
     * Create a path renderer instance for the provided Engine instance
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
        return entity[Component.Path] != null
            && entity[Component.Width] != null
            && entity[Component.Appearance] != null;
    }

    /** Draw the specified line entity */
    draw(entity: Entity) {
        if (!PathRenderer.canProcess(entity)) return;

        //Note: PathComponents are never parent relative; their points are always absolute co-ords!

        let points = entity[Component.Path].points;
        for (let i = 0; i < points.length; i++) {
            if (i == 0) continue; // we need current point and previous to work
            let p1 = points[i - 1],
                p2 = points[i];

            //use the re-usable Graphics API function to draw the line
            this.engine.Graphics.line(p1, p2, {
                width: entity[Component.Width].value,
                colour: entity[Component.Appearance].colour
            });
        }
    }
}