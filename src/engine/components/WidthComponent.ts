import Name from "../enum/Component";
import Component from "./Component";

/** A component that stores contextual data about width */
export default class WidthComponent extends Component {
    /** The width value */
    value: number;

    /**
     * Create a WidthComponent with the specified value. Defaults to 2
     * @param {number} width Set the width value.
     */
    constructor(value?: number) {
        super(Name.Width);
        this.value = value || 1;
        return this;
    }
}