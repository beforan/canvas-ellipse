import SystemManager from "../src/engine/Engine";
import Frame from "../src/engine/Frame";

import { expect } from "chai";
import * as sinon from "sinon";

describe("Engine", () => {
    describe("constructor", () => {
        
        //Passing placeholder for now
        it("should be true", () => {
            // const c = {} as HTMLCanvasElement;
            // c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            // const f = new Frame(c);
            // const s = new SystemManager(f);
            expect(true).to.be.true;
        });

        //Other systems may be testable in `tick()` or constructor
        //But so far nothing is
    });
});