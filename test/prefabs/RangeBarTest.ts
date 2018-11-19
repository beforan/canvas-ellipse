import Component from "../../src/engine/enum/Component";
import RangeBar from "../../src/prefabs/RangeBar";
import Entity from "../../src/engine/Entity";
import DirectionComponent from "../../src/engine/components/DirectionComponent";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";
import WidthComponent from "../../src/engine/components/WidthComponent";
import IRangeBarOptions from "../../src/params/IRangeBarOptions";
import PositionComponent from "../../src/engine/components/PositionComponent";
import Frame from "../../src/engine/Frame";
import LineRenderer from "../../src/engine/systems/LineRenderer";
import RangeBarLabel from "../../src/prefabs/RangeBarLabel";
import RangeBarLabelPosition from "../../src/enum/RangeBarLabelPosition";
import RangeBarLabelAlignment from "../../src/enum/RangeBarLabelAlignment";
import Engine from "../../src/engine/Engine";

import { expect } from "chai";
import * as sinon from "sinon";

describe("RangeBar", () => {

    //intialisation
    describe("constructor", () => {

        //default values
        it("should set default values if none passed", () => {
            const bar = new RangeBar(10, 10, 10, 10);
            expect(bar[Component.Appearance].colour).to.equal("black");
            expect(bar[Component.Width].value).to.equal(RangeBar.widthDefault);
        });

        //optional values
        it("should set optional values if passed", () => {
            const options = { top: 30, colour: "red", width: 5, minLabel: {}, midLabel: {}, maxLabel: {} } as IRangeBarOptions;
            const bar = new RangeBar(RangeBar.marginDefault, RangeBar.marginDefault, 10, 10, options);
            expect(bar[Component.Appearance].colour).to.equal("red");
            expect(bar[Component.Width].value).to.equal(5);
            expect(bar.labels.length).to.equal(3);
        });

        //properties
        it("should set colour to new value", () => {
            const c = "Red"
            const bar = new RangeBar(RangeBar.marginDefault, RangeBar.marginDefault, 10, 10);
            bar.colour = c;
            expect(bar[Component.Appearance].colour).to.equal(c);
            expect(bar.colour).to.equal(c);
        });

        it("should set width to new value", () => {
            const w = 5
            const bar = new RangeBar(RangeBar.marginDefault, RangeBar.marginDefault, 10, 10);
            bar.width = w;
            expect(bar[Component.Width].value).to.equal(w);
            expect(bar.width).to.equal(w);
        });

        it("should calculate position and length based on specified margins", () => {
            const margin = 10;
            const canvas = {} as HTMLCanvasElement;
            canvas.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            canvas.addEventListener = sinon.stub()
            const e = new Engine(canvas);
            const bar = new RangeBar(margin, margin, 10, 10, { top: margin } as IRangeBarOptions);
            expect(bar[Component.Position].x).to.equal((e.Frame.Width * margin) / 100);
            expect(bar[Component.Position].y).to.equal((e.Frame.Height * margin) / 100);
            expect(bar[Component.Direction].vector.magnitude()).to.equal((() => {
                let x2 = e.Frame.Width - (e.Frame.Width / 100) * margin;
                let p = bar[Component.Position];
                return Math.sqrt(Math.pow(x2 - p.x, 2) + Math.pow(p.y - p.y, 2));
            })());
        });
    })
})