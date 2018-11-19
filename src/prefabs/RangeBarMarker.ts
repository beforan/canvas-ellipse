import Component from "../engine/enum/Component";
import Entity from "../engine/Entity";
import AppearanceComponent from "../engine/components/AppearanceComponent";
import PositionComponent from "../engine/components/PositionComponent";
import ParentComponent from "../engine/components/ParentComponent";
import IRangeBarMarkerOptions from "../params/IRangeBarMarkerOptions";
import RangeBar from "./RangeBar";
import DirectionComponent from "../engine/components/DirectionComponent";
import WidthComponent from "../engine/components/WidthComponent";

/** Marker Line for a particular position on a parent Range Bar */
export default class RangeBarMarker extends Entity {
    /**
         * Creates a RangeBarLabel Entity with the specified text & position with optional font, colour and vertical alignment
         * @param {RangeBar} parent - The parent RangeBar
         * @param {number} x - x position of the marker relative to the parent RangeBar's x
         * @param {IRangeBarMarkerOptions} options - Optional configuration items for the label.
     */
    constructor(parent: RangeBar, x: number, options?: IRangeBarMarkerOptions) {
        super();

        this.addComponent(new ParentComponent(parent));
        this.addComponent(new PositionComponent());
        this.addComponent(new DirectionComponent(0, options && options.length || 50)); //lock direction to vertical
        this.addComponent(new AppearanceComponent());
        this.addComponent(new WidthComponent());

        if (options) {
            if (options.colour) { this.colour = options.colour; };
            if (options.width) { this[Component.Width].value = options.width; };
        }

        //set position
        this.y = 0 - this[Component.Direction].vector.magnitude() / 2;
        this.x = x;

        return this;
    }

    /** CSS colour string for the label text */
    get colour(): string {
        return this[Component.Appearance].colour;
    }
    set colour(value: string) {
        this[Component.Appearance].colour = value;
    }

    /** x position of the label (relative to parent) */
    get x() {
        return this[Component.Position].x;
    }
    set x(value: number) {
        this[Component.Position].x = value;
    }

    /** y position of the label (relative to parent) */
    get y() {
        return this[Component.Position].y;
    }
    set y(value: number) {
        this[Component.Position].y = value;
    }

}
