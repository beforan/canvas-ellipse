import Component from "../engine/enum/Component";
import Entity from "../engine/Entity";
import AppearanceComponent from "../engine/components/AppearanceComponent";
import PositionComponent from "../engine/components/PositionComponent";
import LabelComponent from "../engine/components/LabelComponent";
import ParentComponent from "../engine/components/ParentComponent";
import RangeBarLabelPosition from "../enum/RangeBarLabelPosition";
import RangeBarLabelAlignment from "../enum/RangeBarLabelAlignment";
import TextBaseLine from "../engine/enum/TextBaseLine";
import IRangeBarLabelOptions from "../params/IRangeBarLabelOptions";
import RangeBar from "./RangeBar";

/** Label for a particular position on a parent Range Bar */
export default class RangeBarLabel extends Entity {
    /** The Horizontal Position of the Label on the Range Bar. */
    public labelPosition: RangeBarLabelPosition;
    
    private _alignment: RangeBarLabelAlignment;

    /**
         * Creates a RangeBarLabel Entity with the specified text & position with optional font, colour and vertical alignment
         * @param {RangeBar} parent - The parent RangeBar
         * @param {RangeBarLabelPosition} position - Set the bar label position. Min Mid Max
         * @param {IRangeBarLabelOptions} options - Optional configuration items for the label.
     */
    constructor(parent: RangeBar, labelPosition: RangeBarLabelPosition, options?: IRangeBarLabelOptions) {
        super();

        this.addComponent(new ParentComponent(parent));
        this.addComponent(new LabelComponent(options && options.text || ""));
        this.addComponent(new PositionComponent());
        this.addComponent(new AppearanceComponent());
        this.labelPosition = labelPosition;
        this.alignment = RangeBarLabelAlignment.Above;
        this.baseLine = TextBaseLine.Bottom;

        if (options) {
            if (options.colour) { this.colour = options.colour; };
            if (options.font) { this.font = options.font; }
            if (options.alignment) { this.alignment = (+options.alignment); }
        }

        //set position based on options and the range bar's properties
        this.y = RangeBar.getLabelMargin(this.alignment);
        this.repositionX();
        this.setTextAlignment();

        return this;
    }

    /** Recalculate relative x position based on the parent margin settings and labelPosition */
    repositionX() {
        this.x = ((this[Component.Parent] as ParentComponent).entity as RangeBar).getLabelPosition(this.labelPosition);
    }

    /** Set label component alignment based on labelPosition */
    setTextAlignment() {
        let l = (this[Component.Label] as LabelComponent);
        switch (this.labelPosition) {
            case RangeBarLabelPosition.Min:
                l.alignment = "left"; break;
            case RangeBarLabelPosition.Mid:
                l.alignment = "center"; break;
            case RangeBarLabelPosition.Max:
                l.alignment = "right"; break;
        }
    }

    /** The text for the label */
    get text(): string {
        return this[Component.Label].text;
    }
    set text(value: string) {
        this[Component.Label].text = value;
    }

    /** CSS font string for the label text */
    get font(): string {
        return this[Component.Label].font;
    }
    set font(value: string) {
        this[Component.Label].font = value;
    }

    /** CSS colour string for the label text */
    get colour(): string {
        return this[Component.Appearance].colour;
    }
    set colour(value: string) {
        this[Component.Appearance].colour = value;
    }

    /** The Vertical position of the Label; Above or Below the Range Bar */
    get alignment(): RangeBarLabelAlignment {
        return this._alignment;
    }
    set alignment(value: RangeBarLabelAlignment) {
        this._alignment = value;
        if (value == RangeBarLabelAlignment.Above) {
            this.baseLine = TextBaseLine.Bottom;
        }
        else {
            this.baseLine = TextBaseLine.Top;
        }
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

    /** The Text Baseline position for the Label. Set automatically when alignment is set */
    get baseLine() {
        return this[Component.Label].baseline;
    }
    set baseLine(value: TextBaseLine) {
        this[Component.Label].baseline = value;
    }
}
