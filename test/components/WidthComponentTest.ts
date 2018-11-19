import Component from "../../src/engine/enum/Component";
import WidthComponent from "../../src/engine/components/WidthComponent";

import { expect } from "chai";

describe("WidthComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Width'", () => {
            const c = new WidthComponent(1);
            expect(c.name).to.equal(Component.Width);
        });

        it("should default to 1", () => {
            const value = 1;
            const c = new WidthComponent();
            expect(c.value).to.equal(value);
        });
        
        it("should set value", () => {
            const value = 2;
            const c = new WidthComponent(value);
            expect(c.value).to.equal(value);
        });
    });
});