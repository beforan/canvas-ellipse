
import Component from "../engine/enum/Component";
import PositionComponent from "../engine/components/PositionComponent";
import LabelComponent from "../engine/components/LabelComponent";
import AppearanceComponent from "../engine/components/AppearanceComponent";
import Entity from "../engine/Entity";
import IQuestionOptions from "../params/IQuestionOptions";
import Engine from "../engine/Engine";

/** The Question the Ellipse is seeking to answer */
export default class Question extends Entity {
    /** Minimum margin value */
    static readonly marginMin : number = 1;
    /** Maximum margin value */
    static readonly marginMax : number = 25;
    /** Default margin value */
    static readonly marginDefault : number = 10;

    /**
     * Creates a Question Entity with the specified text and, optionally, font.
     * @param {string} question - Set the question text.
     * @param {IQuestionOptions} options - Optionally set the font, colour, top and left border percentage
     */
    constructor(question: string, options?: IQuestionOptions ){
        super ();
        let e = Engine.lastInitialised;

        //process percentage margins
        let x = (e.Frame.Width / 100) * (options && options.left || Question.marginDefault);
        let y = (e.Frame.Height / 100) * (options && options.top || Question.marginDefault);

        this.addComponent(new LabelComponent(question, options && options.font || null)); 
        this.addComponent(new AppearanceComponent(options && options.colour || null));
        this.addComponent( new PositionComponent(x, y));
           
        return this;
    }

    /** The Question text */
    get question(): string {
        return this[Component.Label].text;
    }
    set question(value: string) {
        this[Component.Label].text = value;
    }

    /** CSS string for the font of the text */
    get font(): string {
        return this[Component.Label].font;
    }
    set font(value: string){
        this[Component.Label].font = value;
    }

    /** CSS string for the colour of the text */
    get colour() : string {
        return this[Component.Appearance].colour;
    }
    set colour(value:string){
        this[Component.Appearance].colour = value;
    }
}
