import Name from "../enum/Component";
import Component from "./Component";

/** A component that stores data about appearance of a drawn entity */
export default class AppearanceComponent extends Component {
    /** CSS Value for colour */
    colour: string;

    /**
     * Create an AppearanceComponent with the specified colour value.
     * @param {string} colour Set the CSS value for colour. Defaults to Black.
     */
    constructor(colour?: string) {
        super(Name.Appearance);
        this.colour = colour || "black";
        return this;
    }
}