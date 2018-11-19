import Component from "../../src/engine/enum/Component";
import RangeBar from "../../src/prefabs/RangeBar";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";
import PositionComponent from "../../src/engine/components/PositionComponent";
import LabelComponent from "../../src/engine/components/LabelComponent";
import RangeBarLabelPosition from "../../src/enum/RangeBarLabelPosition";
import RangeBarLabelAlignment from "../../src/enum/RangeBarLabelAlignment";
import IRangeBarLabelOptions from "../../src/params/IRangeBarLabelOptions";
import RangeBarLabel from "../../src/prefabs/RangeBarLabel";
import TextBaseLine from "../../src/engine/enum/TextBaseLine";

import { expect } from "chai";

describe("rangeBarLabelAssemblage", () => {

    //intialisation
    describe("constructor", () => {
        it("should set text and bar position and default alignment", () => {
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;

            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            expect(barLabel[Component.Label].text).to.equal(t);
            expect(barLabel.labelPosition).to.equal(p);
            expect(barLabel.alignment).to.equal(RangeBarLabelAlignment.Above);
            expect (barLabel.baseLine).to.equal(TextBaseLine.Bottom);

        });

        //optional parameters
        it("should set optional values if passed", () => {
            const p = RangeBarLabelPosition.Max;
            const options = {
                text: "My Label",
                colour: "red",
                font: "24px Comic Sans MS",
                alignment: RangeBarLabelAlignment.Below
            } as IRangeBarLabelOptions;

            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, options);

            expect(barLabel[Component.Appearance].colour).to.equal("red");
            expect(barLabel.font).to.equal("24px Comic Sans MS");
            expect(barLabel.alignment).to.equal(RangeBarLabelAlignment.Below);
        });

        //properties
        it("should set text to new value", () => {
            const c = "new label"
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            barLabel.text = c;
            expect(barLabel[Component.Label].text).to.equal(c);
            expect(barLabel.text).to.equal(c);
        });

        it("should set position to new value", () => {
            const c = RangeBarLabelPosition.Mid
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            barLabel.labelPosition = c;
            expect(barLabel.labelPosition).to.equal(c);
        });


        it("should set colour to new value", () => {
            const c = "blue"
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            barLabel.colour = c;
            expect(barLabel[Component.Appearance].colour).to.equal(c);
            expect(barLabel.colour).to.equal(c);
        });

        it("should set font to new value", () => {
            const f = "24px Comic Sans MS"
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            barLabel.font = f;
            expect(barLabel[Component.Label].font).to.equal(f);
            expect(barLabel.font).to.equal(f);
        });

        it("should set alignment to new value", () => {
            const c = RangeBarLabelAlignment.Below
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            barLabel.alignment = c;
            expect(barLabel.alignment).to.equal(c);
            expect(barLabel.baseLine).to.equal(TextBaseLine.Top);
        });

        it("should set x position to new value", () => {
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            const x = 20;
            barLabel.x = x;
            expect(barLabel.x).to.equal(x);
        });

        it("should set y position to new value", () => {
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            const y = 20;
            barLabel.y = y;
            expect(barLabel.y).to.equal(y);
        });

        it("should set baseline to new value", () => {
            const t = "My Label";
            const p = RangeBarLabelPosition.Max;
            const barLabel = new RangeBarLabel(new RangeBar(10, 10, 10, 10), p, { text: t } as IRangeBarLabelOptions);
            const a = TextBaseLine.Top;
            barLabel.baseLine = a;
            expect(barLabel.baseLine).to.equal(a);
        });
    })
})