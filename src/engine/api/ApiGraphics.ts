import Frame from "../Frame";
import ILineOptions from "../params/ILineOptions"
import ITextOptions from "../params/ITextOptions"
import * as Vector2 from "victor";

export default class ApiGraphics {
    /** The Engine's actual Frame */
    private frame: Frame;
    
    /**
     * Create an instance of an API Frame
     * @param {Frame} frame the Engine's actual Frame
     */
    constructor(frame: Frame) {
        this.frame = frame;
    }

    /**
     * Draw a line between 2 points, or from one point following a dirction vector.
     * @param {Vector2} start the start point
     * @param {Vector2} end the end point or direction vector
     * @param {ILineOptions} options options for this line drawing call
     */
    line(start: Vector2, end: Vector2, options?: ILineOptions) {
        let c = this.frame.context;
        let dir = options && options.treatEndAsDirectionVector || false;
        c.beginPath();
        c.moveTo(start.x, start.y);
        c.lineTo(dir ? start.x + end.x : end.x, dir ? start.y + end.y : end.y);
        c.lineWidth = options && options.width || 1;
        c.strokeStyle = options && options.colour || "black";
        c.stroke();
    }

    /**
     * Draw text at a position, subject to options.
     * @param {string} text The text to draw
     * @param {Vector2} pos The position at which to draw the text
     * @param {ITextOptions} options options for this text drawing call
     */
    print(text: string, pos: Vector2, options?: ITextOptions) {
        if (options) { //these change context properties if they are set, else they will use the last set value
            if(options.font) this.frame.context.font = options.font;
            if(options.baseline) this.frame.context.textBaseline = options.baseline;
            if(options.alignment) this.frame.context.textAlign = options.alignment;
            if(options.colour) this.frame.context.fillStyle = options.colour;
        }

        if(options && options.width)
            this.frame.context.fillText(text, pos.x, pos.y, options.width);
        else
        this.frame.context.fillText(text, pos.x, pos.y);
    }
}