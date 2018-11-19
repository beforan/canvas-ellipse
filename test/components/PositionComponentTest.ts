import Component from "../../src/engine/enum/Component";
import PositionComponent from "../../src/engine/components/PositionComponent";

import { expect } from "chai";

describe("PositionComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Position'", () => {
            const c = new PositionComponent();
            expect(c.name).to.equal(Component.Position);
        });

        it("should default x and y to 0", () => {
            const c = new PositionComponent();
            expect(c.x).to.equal(0);
            expect(c.y).to.equal(0);
        });

        it("should set x and y", () => {
            const x = 1;
            const y = 1;
            const c = new PositionComponent(x, y);
            expect(c.x).to.equal(x);
            expect(c.y).to.equal(y);
        });
    });
});