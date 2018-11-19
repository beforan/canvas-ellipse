import Component from "../../src/engine/enum/Component";
import DirectionComponent from "../../src/engine/components/DirectionComponent";

import { expect } from "chai";

describe("DirectionComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Direction'", () => {
            const c = new DirectionComponent();
            expect(c.name).to.equal(Component.Direction);
        });

        it("should default x and y to 0", () => {
            const c = new DirectionComponent();
            expect(c.x).to.equal(0);
            expect(c.y).to.equal(0);
        });
    });
});