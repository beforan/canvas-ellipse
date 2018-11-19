import PathRenderer from "../../src/engine/systems/PathRenderer";
import Entity from "../../src/engine/Entity";
import PathComponent from "../../src/engine/components/PathComponent";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";
import WidthComponent from "../../src/engine/components/WidthComponent";
import { expect } from "chai";
import * as sinon from "sinon";
import Engine from "../../src/engine/Engine";
import * as Vector2 from "victor";

describe("PathRenderer", () => {
    describe("constructor", () => {
        it("should set engine", () => {
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);
            const r = new PathRenderer(f);
            expect(r.engine).to.equal(f);
        });
    });

    describe("canProcess", () => {
        it("should return false if conditions are not met", () => {
            const e = new Entity();
            expect(PathRenderer.canProcess(e)).to.equal(false);
        });

        it("should return true if conditions are met", () => {
            const e = new Entity();
            e.addComponent(new PathComponent(new Vector2(1, 1)));
            e.addComponent(new AppearanceComponent());
            e.addComponent(new WidthComponent(0));
            expect(PathRenderer.canProcess(e)).to.equal(true);
        });
    });

    describe("draw", () => {
        it("should return without drawing if canProcess() is false", () => {
            const e = new Entity();
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new PathRenderer(f);

            //spy on Graphics.line()
            r.engine.Graphics.line = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.line["calledOnce"]).to.equal(false);
        });

        it("shouldn't draw when PathComponent only contains one point", () => {
            const e = new Entity();
            e.addComponent(new PathComponent(new Vector2(1, 1)));
            e.addComponent(new AppearanceComponent());
            e.addComponent(new WidthComponent(5));

            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new PathRenderer(f);

            //spy on Graphics.line()
            r.engine.Graphics.line = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.line["called"]).to.equal(false);
        });

        it("should draw when PathComponent has multiple points", () => {
            const e = new Entity();
            e.addComponent(new PathComponent(new Vector2(1, 1), new Vector2(2, 2)));
            e.addComponent(new AppearanceComponent());
            e.addComponent(new WidthComponent(5));

            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new PathRenderer(f);

            //spy on Graphics.line()
            r.engine.Graphics.line = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.line["called"]).to.equal(true);
        });
    });
});