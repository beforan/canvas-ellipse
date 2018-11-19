import Frame from "../Frame";

/** An abstracted class exposing aspects of the Engine's Frame for app use */
export default class ApiFrame {
    /** The Engine's actual Frame */
    private frame: Frame;
    
    /**
     * Create an instance of an API Frame
     * @param {Frame} frame the Engine's actual Frame
     */
    constructor(frame: Frame) {
        this.frame = frame;
    }
    
    /** get the current frame width for this Engine instance */
    get Width() {
        return this.frame.width;
    }

    /** get the current frame height for this Engine instance */
    get Height() {
        return this.frame.height;
    }
}