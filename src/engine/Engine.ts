import ApiFrame from "./api/ApiFrame"
import ApiGraphics from "./api/ApiGraphics"
import Component from "./enum/Component";
import MouseButton from "./enum/MouseButton";
import Frame from "./Frame";
import Entity from "./Entity";
import LineCollider from "./systems/LineCollider";
import TextRenderer from "./systems/TextRenderer";
import LineRenderer from "./systems/LineRenderer";
import ParentComponent from "./components/ParentComponent";
import PathRenderer from "./systems/PathRenderer";
import ApiMouse from "./api/ApiMouse";

/** An instance of the core Engine used by ellipse, with static instance management features */
export default class Engine {
    //public API properties
    Frame: ApiFrame;
    Graphics: ApiGraphics;
    Mouse: ApiMouse;

    /**
     * Initialise a new instance of the engine, and it's associated systems.
     */
    constructor(canvas: HTMLCanvasElement) {
        if (!canvas.getContext) throw new TypeError("Expected a canvas element.");

        //internals
        this.frame = new Frame(canvas);

        //API properties
        this.Frame = new ApiFrame(this.frame);
        this.Graphics = new ApiGraphics(this.frame);
        this.Mouse = new ApiMouse(this.frame.canvas);

        //Systems
        this.lineCollider = new LineCollider();
        this.textRenderer = new TextRenderer(this);
        this.lineRenderer = new LineRenderer(this);
        this.pathRenderer = new PathRenderer(this);

        this.registerCallbacks();
        Engine._lastInitialised = this;
    }

    //Instance management
    private static _lastInitialised: Engine;
    private static instanceLookup: { [id: string]: Engine } = {};

    /** Get the most recently initialised Engine instance */
    static get lastInitialised() {
        return Engine._lastInitialised;
    }

    private frame: Frame;
    private entities = new Array<Entity>();

    //Update systems
    private lineCollider: LineCollider;

    //Drawing systems
    private textRenderer: TextRenderer;
    private lineRenderer: LineRenderer;
    private pathRenderer: PathRenderer;

    /** Add an entity to this instance of the Engine */
    addEntity(...e: Entity[]) {
        this.entities.push(...e);
        e.forEach(e => {
            Engine.instanceLookup[e.id] = this;
        });
    }

    /** Get the engine instance for the specified entity id */
    public static instanceFor(id: string) {
        return this.instanceLookup[id];
    }

    /**
     * trigger a tick of the systems. In a game this would run every frame. In Ellipse it is run on demand by input events.
     */
    tick() {
        //Update
        this.entities.forEach(e => this.lineCollider.checkCollision(e, this.entities))

        //Draw
        this.frame.clear();
        let drawOrder = {} //store arrays of children to draw after their parents, or record that an entity has been drawn
        let draw = (e) => {
            //do I have a parent?
            if (e[Component.Parent] != null) {
                let parentId = (e[Component.Parent] as ParentComponent).entity.id;
                //check if my parent has been drawn already
                if (drawOrder[parentId] != true) {
                    //add to the list to draw later
                    drawOrder[parentId] = drawOrder[parentId] || [];
                    drawOrder[parentId].push(e);
                    return; //we're done here - we'll get drawn later
                }
                //else, we need to draw ourselves as normal
            }
            //else, we draw ourselves as normal

            //Pass ourselves to every renderer going - they will quickly shortcircuit if they can't draw us
            this.lineRenderer.draw(e);
            this.textRenderer.draw(e);
            this.pathRenderer.draw(e);

            //see if we have any deferred children to draw
            let kids = drawOrder[e.id] instanceof Array ? drawOrder[e.id].slice() : [];
            drawOrder[e.id] = true; //mark ourselves as drawn so our kids are free to draw!
            kids.forEach(draw) //draw the kids
        }
        this.entities.forEach(draw);
    }

    //callbacks
    mouseMoved(x: number, y: number) { }
    mousePressed(x: number, y: number, button: MouseButton) { }
    mouseReleased(x: number, y: number, button: MouseButton) { }
    private registerCallbacks() {
        let c = this.frame.canvas;
        let mouseMap = { 0: 1, 1: 4, 2: 2, 3: 8, 4: 16 }; //convert button to our enum format (the event.buttons flag) to be consistent
        
        c.addEventListener("mousemove", (event) => {
            let mousePos = this.Mouse.convertMouseCoOrds(event, c);
            this.mouseMoved(mousePos.x, mousePos.y);
        });

        c.addEventListener("mousedown", (event) => {
            let mousePos = this.Mouse.convertMouseCoOrds(event, c);
            this.mousePressed(mousePos.x, mousePos.y, mouseMap[event.button]);
        });

        c.addEventListener("mouseup", (event) => {
            let mousePos = this.Mouse.convertMouseCoOrds(event, c);
            this.mouseReleased(mousePos.x, mousePos.y, mouseMap[event.button]);
        });
    }
}