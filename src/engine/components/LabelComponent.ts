import Name from "../enum/Component";
import Component from "./Component";
import TextBaseLine from "../enum/TextBaseLine";

export default class LabelComponent extends Component {
    /** The text content of the label */
    text: string;

    /** CSS font value */
    font: string;

    /** CSS text alignment value */
    alignment: string

    /*text baseline position*/
    baseline: TextBaseLine;

    /**
     * Creates a LabelComponent with the specified text and, optionally, font.
     * @param {string} text - The text content of the label.
     * @param {string} font - Optional CSS font string for the label.
     * @param {string} align - optional CSS alignment string.
     * @param {TextBaseLine} baseline - Optional baseline position of text - top or bottom
     */
    constructor(text: string, font?: string, align?: string, baseline?: TextBaseLine) {
        super(Name.Label);
        this.text = text;
        this.font = font || "16px Arial";
        this.baseline = baseline || TextBaseLine.Top;
        this.alignment = align || "left";
        return this;
    }
}