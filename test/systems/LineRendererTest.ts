import LineRenderer from "../../src/engine/systems/LineRenderer";
import Entity from "../../src/engine/Entity";
import PositionComponent from "../../src/engine/components/PositionComponent";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";
import DirectionComponent from "../../src/engine/components/DirectionComponent";
import WidthComponent from "../../src/engine/components/WidthComponent";

import { expect } from "chai";
import * as sinon from "sinon";
import Engine from "../../src/engine/Engine";

describe("LineRenderer", () => {
    describe("constructor", () => {
        it("should set engine", () => {
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);
            const r = new LineRenderer(f);
            expect(r.engine).to.equal(f);
        });
    });

    describe("canProcess", () => {
        it("should return false if conditions are not met", () => {
            const e = new Entity();
            expect(LineRenderer.canProcess(e)).to.equal(false);
        });

        it("should return true if conditions are met", () => {
            const e = new Entity();
            e.addComponent(new PositionComponent());
            e.addComponent(new AppearanceComponent());
            e.addComponent(new WidthComponent(0));
            e.addComponent(new DirectionComponent());
            expect(LineRenderer.canProcess(e)).to.equal(true);
        });
    });

    describe("draw", () => {
        it("should return without drawing if canProcess() is false", () => {
            const e = new Entity();
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new LineRenderer(f);

            //spy on Graphics.line()
            r.engine.Graphics.line = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.line["calledOnce"]).to.equal(false);
        });

        it("should draw when `canProcess()` is true and has a WidthComponent", () => {
            const e = new Entity();
            e.addComponent(new PositionComponent());
            e.addComponent(new AppearanceComponent());
            e.addComponent(new DirectionComponent());
            e.addComponent(new WidthComponent(5));

            const c = {} as HTMLCanvasElement;
            c.addEventListener = sinon.stub()
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            const f = new Engine(c);

            const r = new LineRenderer(f);

            //spy on Graphics.line()
            r.engine.Graphics.line = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.line["calledOnce"]).to.equal(true);
        });
    });
});