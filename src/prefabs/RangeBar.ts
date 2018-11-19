import Component from "../engine/enum/Component";
import Entity from "../engine/Entity";
import DirectionComponent from "../engine/components/DirectionComponent";
import AppearanceComponent from "../engine/components/AppearanceComponent";
import WidthComponent from "../engine/components/WidthComponent";
import IRangeBarOptions from "../params/IRangeBarOptions";
import IRangeBarLabelOptions from "../params/IRangeBarLabelOptions";
import PositionComponent from "../engine/components/PositionComponent";
import RangeBarLabel from "./RangeBarLabel";
import RangeBarLabelPosition from "../enum/RangeBarLabelPosition";
import RangeBarLabelAlignment from "../enum/RangeBarLabelAlignment";
import Engine from "../engine/Engine";
import LineColliderComponent from "../engine/components/LineColliderComponent";
import * as Vector2 from "victor";
import RangeBarMarker from "./RangeBarMarker";
import IRangeBarMarkerOptions from "../params/IRangeBarMarkerOptions";

/** The bar representing the range of answer values */
export default class RangeBar extends Entity {
    /** Minimum value for the Top Percentage Margin */
    static readonly topMarginMin: number = 30;
    /** Maximum value for the Top Percentage Margin */
    static readonly topMarginMax: number = 70;
    /** Default value for the Top Percentage Margin */
    static readonly topMarginDefault: number = 50;

    /** Minimum value for the Left and Right Percentage Margin */
    static readonly marginMin: number = 1;
    /** Maximum value for the Left and Right Percentage Margin */
    static readonly marginMax: number = 25;
    /** Default value for the Left and Right Percentage Margin */
    static readonly marginDefault: number = 10;

    /** Mininum value for the line width */
    static readonly widthMin: number = 2;
    /** Maxinum value for the line width */
    static readonly widthMax: number = 10;
    /** Default value for the line width */
    static readonly widthDefault: number = 2;

    /** "Above" Label relative position */
    static readonly labelMarginTop: number = -30;
    /** "Below" Label relative position */
    static readonly labelMarginBottom: number = 30;

    /** RangeBarMarker options to be used for Range Markers */
    rangeMarkerOptions: IRangeBarMarkerOptions;

    //All children
    public labels: RangeBarLabel[] = [];
    public rangemarkers: RangeBarMarker[] = [];

    /** The Minimum value of the bar (left hand end) */
    private _barMin: number;
    /** The Minimum value of the bar (left hand end) */
    get barMin() { return this._barMin; }

    /** The Maximum value of the bar (right hand end) */
    private _barMax: number;
    /** The Maximum value of the bar (right hand end) */
    get barMax() { return this._barMax; }

    /**
     * Creates a RangeBar Entity with the specified left and right margin percentage within a frame, optionally top percentage,colour and line width.
     * @param {number} left - Set the left margin percentage.
     * @param {number} right - Set the right margin percentage
     * @param {IRangeBarOptions} options - Optionally set the top margin percentage, bar width & colour"
     */
    constructor(left: number, right: number, min: number, max: number, options?: IRangeBarOptions) {
        super()
        let e = Engine.lastInitialised;

        //process the percentage margins
        let x = (e.Frame.Width / 100) * left;
        let y = (e.Frame.Height / 100) * (options && options.top || RangeBar.topMarginDefault);
        let x2 = e.Frame.Width - (e.Frame.Width / 100) * right;
        let length = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y - y, 2));

        this.addComponent(new PositionComponent(x, y));
        this.addComponent(new DirectionComponent(length, 0)); //lock direction to horizontal
        this.addComponent(new LineColliderComponent(0, y, e.Frame.Width, y)) //collider spans full width of the frame, at the same height as the bar
        this.addComponent(new AppearanceComponent(options && options.colour || null));
        this.addComponent(new WidthComponent(options && options.width || RangeBar.widthDefault));

        this._barMin = min;
        this._barMax = max;

        //child labels
        if (options) {
            if (options.minLabel) this.labels.push(new RangeBarLabel(this, RangeBarLabelPosition.Min, options.minLabel));
            if (options.midLabel) this.labels.push(new RangeBarLabel(this, RangeBarLabelPosition.Mid, options.midLabel));
            if (options.maxLabel) this.labels.push(new RangeBarLabel(this, RangeBarLabelPosition.Max, options.maxLabel));
        }

        return this;
    }

    /** Get the correct RangeBarLabel margin value based on a RangeBarLabelAlignment */
    public static getLabelMargin(alignment: RangeBarLabelAlignment) {
        switch (alignment) {
            case RangeBarLabelAlignment.Above:
                return RangeBar.labelMarginTop;
            default:
                return RangeBar.labelMarginBottom;
        }
    }

    /** Get the relative x position for a RangeBarLabel based on a RangeBarLabelPosition */
    getLabelPosition(position: RangeBarLabelPosition) {
        switch (position) {
            case RangeBarLabelPosition.Min:
                return 0;
            case RangeBarLabelPosition.Mid:
                return this.length / 2;
            case RangeBarLabelPosition.Max:
                return this.length;
        }
    }

    /**
     * Convert an absolute x co-ordinate to a value on this RangeBar
     * @param x the absolute x co-ordinate
     */
    getValueForX(x: number) {
        //get relative x pos
        let relativeX = x <= this.x //clamp results to the bar bounds, else adjust the offset
            ? 0
            : x >= this.x + this.length
                ? this.length
                : x - this.x;
        return ((this.barMax - this.barMin) * (relativeX / this.length) + this.barMin);
    }

    /**
     * Set RangeBarMarkers for the min and max values of an ellipse.
     * @param min the value (not x-co-ord) of the Ellipse minimum value
     * @param max the value (not x-co-ord) of the Ellipse maximum value
     */
    setRangeMarkers(min: number, max: number) {
        let minX = this.getXPosForValue(min);
        let maxX = this.getXPosForValue(max);
        if(this.rangemarkers.length == 0) {
            //create rangemarkers if necessary
            let e = Engine.instanceFor(this.id) || Engine.lastInitialised;
            this.rangemarkers.push(new RangeBarMarker(this, minX, this.rangeMarkerOptions));
            this.rangemarkers.push(new RangeBarMarker(this, maxX, this.rangeMarkerOptions));
            e.addEntity(...this.rangemarkers);
        } else {
            //or just update their positions
            this.rangemarkers[0].x = minX;
            this.rangemarkers[1].x = maxX;
        }
    }

    /**
     * Convert a value on the bar back to a relative x co-ordinate
     * @param value the value to convert
     */
    getXPosForValue(value: number) {
        //get value as a ratio of absolute bar range
        let adjustedValue = value - this.barMin;
        let absBarMax = this.barMax - this.barMin;
        let valueRatio = adjustedValue / absBarMax;

        //apply the ratio to the relative max co-ord
        return this.length * valueRatio;
    }

    /** CSS colour string for the bar */
    get colour(): string {
        return this[Component.Appearance].colour;
    }
    set colour(value: string) {
        this[Component.Appearance].colour = value;
    }

    /** Line Width for the bar */
    get width() {
        return this[Component.Width].value;
    }
    set width(value: number) {
        if (value < RangeBar.widthMin || value > RangeBar.widthMax) {
            throw new Error("Out of range value : RangeBar.width. Min:" + RangeBar.widthMin + " Max:" + RangeBar.widthMax);
        }
        else {
            this[Component.Width].value = value;
        }
    }

    /** Length of the bar, based on the specified Left and Right margins and the canvas width */
    get length() {
        return this[Component.Direction].vector.magnitude();
    }

    /** x position of the start of the bar */
    get x() {
        return this[Component.Position].x;
    }

    /** y position of the start of the bar */
    get y() {
        return this[Component.Position].y;
    }
}
