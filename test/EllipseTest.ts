import Ellipse from "../src/Ellipse";
import IEllipseParams from "../src/params/IEllipseParams";

import { expect } from "chai";
import * as sinon from "sinon";

describe("Ellipse", () => {
    describe("constructor", () => {
        it("should throw a TypeError if canvas is null", () => {
            expect(() => new Ellipse(null, null)).to.throw(TypeError, "null");
        });
    
        it("should throw a TypeError if canvas isn't a canvas", () => {
            const canvas = {} as HTMLCanvasElement;
            expect(() => new Ellipse(canvas, null)).to.throw(TypeError, "canvas");
        });
    
        it("should throw an Error if params is null", () => {
            const canvas = {} as HTMLCanvasElement;
            canvas.getContext = sinon.stub().returns({} as CanvasRenderingContext2D)
            canvas.addEventListener = sinon.stub()
            expect(() => new Ellipse(canvas, null)).to.throw(Error, "expected 'params'");
        });

        it("should throw an Error if params.question is null", () => {
            const canvas = {} as HTMLCanvasElement;
            canvas.getContext = sinon.stub().returns({} as CanvasRenderingContext2D)
            canvas.addEventListener = sinon.stub()
            expect(() => new Ellipse(canvas, {} as IEllipseParams)).to.throw(Error, "'question'");
        });
    });
});