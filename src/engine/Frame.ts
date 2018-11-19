/** Represents the HTML Canvas frame area that Ellipse draws to */
export default class Frame {
    /** Frame Width (Canvas) */
    get width(): number {
        return this.canvas.width;
    }
    set width(width: number) {
        this.canvas.width = width;
    }

    /** Frame Height (Canvas) */
    get height(): number {
        return this.canvas.height;
    }
    set height(height: number) {
        this.canvas.height = height;
    }

    /** Clear the canvas */
    clear() {
        let w = this.width,
            h = this.height;
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }

    /** The actual HTML Canvas element */
    canvas: HTMLCanvasElement;

    /** The Canvas 2D drawing context */
    context: CanvasRenderingContext2D;

    /**
     * Instantiates a Frame class to work with a Canvas
     * @param {HTMLCanvasElement} canvas - The canvas element to work with
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.width = 800; //TODO configurable?
        this.height = 600; //TODO configurable?

        this.context = this.canvas.getContext("2d");
    }
}