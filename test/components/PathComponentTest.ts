import Component from "../../src/engine/enum/Component";
import * as Vector2 from "victor"
import PathComponent from "../../src/engine/components/PathComponent";

import { expect } from "chai";

describe("PathComponent", () => {
    describe("constructor", () => {
        it("should set name to 'Path'", () => {
            const c = new PathComponent(new Vector2(1, 1));
            expect(c.name).to.equal(Component.Path);
        });

        it("should set start point", () => {
            const v = new Vector2(1, 1)
            const c = new PathComponent(v);
            expect(c.points.length).to.equal(1);
            expect(c.points[0]).to.equal(v);
        });

        it("should set additional points in the correct order", () => {
            const v1 = new Vector2(2, 2);
            const v2 = new Vector2(3, 3);
            const c = new PathComponent(new Vector2(1, 1), v1, v2);
            expect(c.points.length).to.equal(3);
            expect(c.points[1]).to.equal(v1);
            expect(c.points[2]).to.equal(v2);
        });
    });
});