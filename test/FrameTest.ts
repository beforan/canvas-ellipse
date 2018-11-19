import Frame from "../src/engine/Frame";

import { expect } from "chai";
import * as sinon from "sinon";

describe("Frame", () => {
    describe("constructor", () => {
        it("should set width to 800", () => {
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            const f = new Frame(c);
    
            expect(f.width).to.equal(800);
        });
    
        it("should set height to 600", () => {
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            const f = new Frame(c);
    
            expect(f.height).to.equal(600);
        });
    
        it("should set context", () => {
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            const f = new Frame(c);
    
            expect(f.context).to.not.be.undefined;
            expect(f.context).to.not.be.null;
        });
    });
});