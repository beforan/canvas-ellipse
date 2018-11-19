import Component from "../../src/engine/enum/Component";
import LabelComponent from "../../src/engine/components/LabelComponent";

import { expect } from "chai";

describe("LabelComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Label'", () => {
            const c = new LabelComponent("");
            expect(c.name).to.equal(Component.Label);
        });

        it("should set text", () => {
            const t = "Hello there";
            const c = new LabelComponent(t);
            expect(c.text).to.equal(t);
        });

        it("should set default font if none passed", () => {
            const c = new LabelComponent("");
            expect(c.font).to.equal("16px Arial"); //TODO ought to get these defaults from somewhere else
        });

        it("should set font", () => {
            const f = "24px Comic Sans MS";
            const c = new LabelComponent("", f);
            expect(c.font).to.equal(f);
        });
    });
});