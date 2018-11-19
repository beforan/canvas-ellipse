import Component from "../../src/engine/enum/Component";
import * as Vector2 from "victor"
import PenLine from "../../src/prefabs/PenLine"
import PathComponent from "../../src/engine/components/PathComponent";

import { expect } from "chai";
import LineColliderComponent from "../../src/engine/components/LineColliderComponent";

describe("PenLine", () => {
    describe("constructor", () => {
        it("should set start point", () => {
            const v = new Vector2(1, 1)
            const e = new PenLine(v);
            const c = e[Component.Path];
            expect(c.points.length).to.equal(1);
            expect(c.points[0]).to.equal(v);
        });

        it("should add a WidthComponent", () => {
            const e = new PenLine(new Vector2(1, 1));
            expect(e[Component.Width]).to.not.be.undefined;
            expect(e[Component.Width]).to.not.be.null;
        });

        it("should add an AppearanceComponent", () => {
            const e = new PenLine(new Vector2(1, 1));
            expect(e[Component.Appearance]).to.not.be.undefined;
            expect(e[Component.Appearance]).to.not.be.null;
        });

        it("should not add a LineColliderComponent for one point", () => {
            const e = new PenLine(new Vector2(1, 1));
            expect(e[Component.LineCollider]).to.be.undefined;
        });
    });

    describe("addPoint", () => {
        it("should append the point to the PathComponent", () => {
            const v = new Vector2(2, 2);
            const e = new PenLine(new Vector2(1, 1));
            e.addPoint(v);
            expect(e[Component.Path].points[1]).to.equal(v);
        });

        it("should add a line collider for the new point and the point before it", () => {
            const v = new Vector2(1, 1);
            const e = new PenLine(v);
            e.addPoint(new Vector2(2, 2));
            const l = e[Component.LineCollider] as LineColliderComponent;
            expect(l.position.toString()).to.equal(v.toString());
            expect(l.direction.toString()).to.equal((new Vector2(1, 1).toString()));
        });
    });
});