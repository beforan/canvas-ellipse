import Component from "../../src/engine/components/Component";

import { expect } from "chai";

describe("Component", () => {
    describe("constructor", () => {
        it("should set name", () => {
            const name = "component";
            const c = new Component(name);
            expect(c.name).to.equal(name);
        });
    });
});