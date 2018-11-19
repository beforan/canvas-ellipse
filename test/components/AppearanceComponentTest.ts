import Component from "../../src/engine/enum/Component";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";

import { expect } from "chai";

describe("AppearanceComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Appearance'", () => {
            const c = new AppearanceComponent();
            expect(c.name).to.equal(Component.Appearance);
        });

        it("should set value to black by default", () => {
            const c = new AppearanceComponent();
            expect(c.colour).to.equal("black");
        });

        it("should set value", () => {
            const col = "#0f0";
            const c = new AppearanceComponent(col);
            expect(c.colour).to.equal(col);
        });
    });
});