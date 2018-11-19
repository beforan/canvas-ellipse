import Component from "../../src/engine/enum/Component";
import ParentComponent from "../../src/engine/components/ParentComponent";
import Entity from "../../src/engine/Entity";

import { expect } from "chai";

describe("ParentComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Parent'", () => {
            const c = new ParentComponent({} as Entity);
            expect(c.name).to.equal(Component.Parent);
        });
        
        it("should set id", () => {
            const entity = {};
            const c = new ParentComponent(entity as Entity);
            expect(c.entity).to.equal(entity);
        });
    });
});