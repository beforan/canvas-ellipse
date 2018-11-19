import MouseButton from "./engine/enum/MouseButton";
import Entity from "./engine/Entity";
import Question from "./prefabs/Question";
import IEllipseParams from "./params/IEllipseParams";
import IEllipseOptions from "./params/IEllipseOptions";
import RangeBar from "./prefabs/RangeBar";
import Engine from "./engine/Engine";
import RangeBarMarker from "./prefabs/RangeBarMarker";
import PenLine from "./prefabs/PenLine";
import TextBaseLine from "./engine/enum/TextBaseLine";
import * as Vector2 from "victor";
import IEllipseOutputs from "./IEllipseOutputs";
import Component from "./engine/enum/Component";
import IRangeBarMarkerOptions from "./params/IRangeBarMarkerOptions";

/** An instance of the Ellipse tool */
export default class Ellipse {
    // Our managed entities
    private penLine: PenLine;
    private rangeBar: RangeBar;
    private question: Question;

    //Outputs
    private _outputs = {} as IEllipseOutputs;
    get outputs(): IEllipseOutputs {
        return {
            barMin: this.rangeBar.barMin,
            barMax: this.rangeBar.barMax,
            rangeMin: this._outputs.rangeMin,
            rangeMax: this._outputs.rangeMax,
            completed: this._outputs.completed
        };
    }

    /**
     * Creates a new instance of the Ellipse tool, binding it to an HTML canvas
     * @param canvas - The canvas to bind to
     * @param params - Parameters required to initialise the tool
     * @param options - Options that can be passed to configure the tool
     */
    constructor(canvas: HTMLCanvasElement, params: IEllipseParams, options?: IEllipseOptions) {
        //1. Initialise an instance of the engine 
        let engine = new Engine(canvas);

        //2. Initialise entities that make up the ellipse tool instance
        this.validateParams(params);
        //Question
        this.question = new Question(params.question, options && options.question || null);
        engine.addEntity(this.question);

        //Range Bar
        this.rangeBar = new RangeBar(
            params.rangeBarLeft, params.rangeBarRight,
            params.rangeBarMin, params.rangeBarMax,
            options && options.rangeBar || null);
        engine.addEntity(this.rangeBar);
        engine.addEntity(...this.rangeBar.labels);

        this.penLine = new PenLine(new Vector2(0, 0), options && options.pen);
        engine.addEntity(this.penLine);


        //Default RangeBarMarker options 
        this.rangeBar.rangeMarkerOptions = {
            colour: this.rangeBar[Component.Appearance].colour,
            width: this.rangeBar.width,
            length: this.rangeBar.width * 1.5
        } as IRangeBarMarkerOptions;


        if(options && options.rangeMarkers){
            if(options.rangeMarkers.colour) {this.rangeBar.rangeMarkerOptions.colour = options.rangeMarkers.colour };
            if(options.rangeMarkers.width) {this.rangeBar.rangeMarkerOptions.width = +options.rangeMarkers.width };
            if(options.rangeMarkers.length) {this.rangeBar.rangeMarkerOptions.length = +options.rangeMarkers.length };
            if (options && options.rangeMarkers.markers)
            {
                this.setRange(options.rangeMarkers.markers[0], options.rangeMarkers.markers[1] || options.rangeMarkers.markers[0]);
            }
        }

        //set up our callbacks
        engine.mouseMoved = (x, y) => {
            //draw a path
            if (engine.Mouse.isDown(MouseButton.Primary)) {
                this.penLine.addPoint(new Vector2(x, y));
            }

            //input causes a tick, which updates and draws entities
            engine.tick();

            // additional drawing
            engine.Graphics.print(`mouse: (${x}, ${y})`, new Vector2(20, 10), {
                alignment: "left",
                baseline: TextBaseLine.Top
            });
        }

        engine.mousePressed = (x, y, button) => {
            if (button == MouseButton.Primary) {
                this.resetPenLine(x, y);
            }

            //input causes a tick, which updates and draws entities
            engine.tick();
        }

        engine.mouseReleased = (x, y, button) => {
            if (button == MouseButton.Primary) {
                //complete the ellipse
                if (this.penLine[Component.Path].points.length > 0) {
                    this.penLine.addPoint(this.penLine[Component.Path].points[0]);

                    //tick here to cause an update
                    //(check the collision of the closing line)
                    engine.tick();
                }

                let hits = this.penLine.hits

                //validate the PenLine hits
                if (hits.length != 1) { //1 hit is valid outside the line
                    //multiple hits have can't all be the same side
                    let allLeft = hits.every(hit => hit.x < this.rangeBar.x),
                        allRight = hits.every(hit => hit.x > this.rangeBar.x + this.rangeBar.length);
                    if (allLeft || allRight) {
                        this.resetPenLine(x, y);
                        return;
                    }
                }

                //update state if a complete ellipse drawn:
                //get min, max x hits
                let min = Math.min(...hits.map(hit => hit.x))
                let max = Math.max(...hits.map(hit => hit.x))

                //Convert and apply them
                this.setRange(
                    this.rangeBar.getValueForX(min),
                    this.rangeBar.getValueForX(max));

                //input causes a tick, which updates and draws entities
                engine.tick();

                //mark completed
                this._outputs.completed = true;

                //Dispatch a completed event from the attached canvas
                canvas.dispatchEvent(new CustomEvent("EllipseCompleted", { detail: this.outputs }));
            }
        }

        //3. Hand over to the Engine
        //initial tick
        engine.tick();
    }

    private setRange(min: number, max: number) {
        //"store" the values
        this._outputs.rangeMin = min
        this._outputs.rangeMax = max
        //Set Range Bar Markers
        this.rangeBar.setRangeMarkers(this._outputs.rangeMin, this._outputs.rangeMax);
    }

    private resetPenLine(x, y) {
        this._outputs.completed = false;
        this.penLine.reset(new Vector2(x, y));
    }

    /** Validates the required parameters */
    private validateParams(params) {
        if (params == null) throw new Error("expected 'params' object");

        if (params.question == null) throw new Error("all properties of 'params' are required. Missing 'question'");

        if (params.rangeBarLeft == null) throw new Error("all properties of 'params' are required. Missing 'range bar left'");

        if (params.rangeBarRight == null) throw new Error("all properties of 'params' are required. Missing 'range bar right'");
    }
}