import MouseButton from "../enum/MouseButton";
import * as Vector2 from "victor";

/** An abstracted class exposing aspects of the Engine's Frame for app use */
export default class ApiMouse {
    private _y: number;
    private _x: number;

    private _buttons: number;

    /** The Engine's actual Frame */
    private canvas: HTMLCanvasElement;
    
    /**
     * Create an instance of an API Mouse
     * @param {HTMLCanvasElement} canvas the Engine Frame Canvas element
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.registerCallbacks();
    }

    /** Register private callbacks for the Mouse API to set properties privately */
    private registerCallbacks() {
        let c = this.canvas;
        
        c.addEventListener("mousemove", (event) => {
            //store fixed mouse pos
            let mousePos = this.convertMouseCoOrds(event, c);
            this._x = mousePos.x;
            this._y = mousePos.y;
            //update button states in case the buttons changed outside canvas focus
            this._buttons = event.buttons;
        });

        c.addEventListener("mousedown", (event) => {
            //update button states
            this._buttons = event.buttons;
        });

        c.addEventListener("mouseup", (event) => {
            //update button states
            this._buttons = event.buttons;
        });
    }
    
    /** get the current (last updated) mouse x pos for this Engine instance */
    get x() {
        return this._x;
    }

    /** get the current (last updated) mouse y pos for this Engine instance */
    get y() {
        return this._y;
    }

    /** Get whether or not a given mouse button is currently tracked as down */
    isDown(button: MouseButton) {
        return this.buttons & button;
    }

    /** Currently down button flags */
    get buttons() {
        return this._buttons;
    }


    /**
     * Helper mainly used internally to convert mouse co-ordinates reusably
     * @param event the mouse event
     * @param canvas the canvas
     */
    convertMouseCoOrds(event: MouseEvent, canvas: HTMLCanvasElement) {
        let rect = canvas.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;
        return new Vector2(x, y);
    }
}