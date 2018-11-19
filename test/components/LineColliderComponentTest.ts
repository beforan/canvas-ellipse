import Component from "../../src/engine/enum/Component";
import LineColliderComponent from "../../src/engine/components/LineColliderComponent";

import { expect } from "chai";

describe("LineColliderComponent", () => {
    describe("constructor", () => {
        it("should set name to 'LineCollider'", () => {
            const c = new LineColliderComponent(1, 1, 1, 1);
            expect(c.name).to.equal(Component.LineCollider);
        });
        
        it("should set position Vector to x1, y1", () => {
            const x1 = 1, y1 = 5;
            const c = new LineColliderComponent(x1, y1, 0, 0);
            expect(c.position.x).to.equal(x1);
            expect(c.position.y).to.equal(y1);
        });

        it("should set direction Vector based on x2, y2", () => {
            const x1 = 7, y1 = 15;
            const x2 = 1, y2 = 5;
            const c = new LineColliderComponent(x1, y1, x2, y2);
            expect(c.direction.x).to.equal(x2 - x1);
            expect(c.direction.y).to.equal(y2 - y1);
        });
    });
});