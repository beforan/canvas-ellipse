import TextRenderer from "../../src/engine/systems/TextRenderer";
import Entity from "../../src/engine/Entity";
import PositionComponent from "../../src/engine/components/PositionComponent";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";
import LabelComponent from "../../src/engine/components/LabelComponent";
import WidthComponent from "../../src/engine/components/WidthComponent";

import { expect } from "chai";
import * as sinon from "sinon";
import Engine from "../../src/engine/Engine";

describe("TextRenderer", () => {
    describe("constructor", () => {
        it("should set frame", () => {
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);
            const r = new TextRenderer(f);
            expect(r.engine).to.equal(f);
        });
    });

    describe("canProcess", () => {
        it("should return false if conditions are not met", () => {
            const e = new Entity();
            expect(TextRenderer.canProcess(e)).to.equal(false);
        });

        it("should return true if conditions are met", () => {
            const e = new Entity();
            e.addComponent(new PositionComponent());
            e.addComponent(new AppearanceComponent());
            e.addComponent(new LabelComponent(""));
            expect(TextRenderer.canProcess(e)).to.equal(true);
        });

    });

    describe("draw", () => {
        it("should return without drawing if canProcess() is false", () => {
            const e = new Entity();
            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new TextRenderer(f);

            //spy on Graphics.print()
            r.engine.Graphics.print = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.print["calledOnce"]).to.equal(false);
        });

        it("should draw when `canProcess()` is true and has a WidthComponent", () => {
            const e = new Entity();
            e.addComponent(new PositionComponent());
            e.addComponent(new AppearanceComponent());
            e.addComponent(new LabelComponent(""));
            e.addComponent(new WidthComponent(5));

            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new TextRenderer(f);

            //spy on Graphics.print()
            r.engine.Graphics.print = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.print["calledOnce"]).to.equal(true);
        });

       
        it("should draw when `canProcess()` is true and has no WidthComponent", () => {
            const e = new Entity();
            e.addComponent(new PositionComponent());
            e.addComponent(new AppearanceComponent());
            e.addComponent(new LabelComponent(""));

            const c = {} as HTMLCanvasElement;
            c.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            c.addEventListener = sinon.stub()
            const f = new Engine(c);

            const r = new TextRenderer(f);

            //spy on Graphics.print()
            r.engine.Graphics.print = sinon.spy();

            r.draw(e);

            expect(r.engine.Graphics.print["calledOnce"]).to.equal(true);
        });

    });
});