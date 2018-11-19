import LineCollider from "../../src/engine/systems/LineCollider";
import Entity from "../../src/engine/Entity";
import PositionComponent from "../../src/engine/components/PositionComponent";
import LineColliderComponent from "../../src/engine/components/LineColliderComponent";

import { expect } from "chai";
import * as sinon from "sinon";
import * as Vector2 from "victor";

describe("LineCollider", () => {
    describe("canProcess", () => {
        it("should return false if conditions are not met", () => {
            const e = new Entity();
            expect(LineCollider.canProcess(e)).to.equal(false);
        });

        it("should return true if conditions are met", () => {
            const e = new Entity();
            e.addComponent(new LineColliderComponent(1, 1, 1, 1));
            expect(LineCollider.canProcess(e)).to.equal(true);
        });
    });

    describe("findIntersection", () => {

        it("should give known correct outputs", () => {
            let a1 = new Vector2(10, 20),
                a2 = new Vector2(20, 0),
                b1 = new Vector2(20, 10),
                b2 = new Vector2(0, 20);
            let hit = LineCollider.findIntersection(a1, a2, b1, b2);
            expect(hit.x).to.equal(20);
            expect(hit.y).to.equal(20);
        });

        it("should give known correct outputs", () => {
            let a1 = new Vector2(10, 20),
                a2 = new Vector2(20, 10),
                b1 = new Vector2(20, 10),
                b2 = new Vector2(10, 30);
            let hit = LineCollider.findIntersection(a1, a2, b1, b2);
            expect(hit.x).to.equal(26);
            expect(hit.y).to.equal(28);
        });

        it("should give the same outputs regardless of processing order", () => {
            let a1 = new Vector2(10, 20),
                a2 = new Vector2(20, 0),
                b1 = new Vector2(20, 10),
                b2 = new Vector2(0, 20);
            let hit1 = LineCollider.findIntersection(a1, a2, b1, b2);
            let hit2 = LineCollider.findIntersection(b1, b2, a1, a2);
            expect(hit1.x).to.equal(20);
            expect(hit1.y).to.equal(20);
            expect(hit2.x).to.equal(20);
            expect(hit2.y).to.equal(20);
        });

        it("should give the same outputs regardless of processing order", () => {
            let a1 = new Vector2(10, 20),
                a2 = new Vector2(20, 10),
                b1 = new Vector2(20, 10),
                b2 = new Vector2(10, 30);
            let hit1 = LineCollider.findIntersection(a1, a2, b1, b2);
            let hit2 = LineCollider.findIntersection(b1, b2, a1, a2);
            expect(hit1.x).to.equal(26);
            expect(hit1.y).to.equal(28);
            expect(hit2.x).to.equal(26);
            expect(hit2.y).to.equal(28);
        });
    });

    describe("checkCollision", () => {
        before(() => {
            //because this is static, we'll set it up as a spy once here for the cases that need it
            sinon.spy(LineCollider, "canProcess");
        });
        afterEach(() => {
            //reset the "global" spy after each case
            LineCollider.canProcess["reset"]();
        });

        it("should return without checking if canProcess() is false", () => {
            const e = new Entity();
            const entities = new Array<Entity>();

            //set up a spy so we can confirm the method goes no further than canProcess()
            entities.forEach = sinon.spy();

            let c = new LineCollider();

            c.checkCollision(e, entities);

            expect(entities.forEach["called"]).to.equal(false);
        });

        it("should skip checking if the second entity is the same as the first", () => {
            const e = new Entity();
            e.addComponent(new LineColliderComponent(1, 1, 1, 1))
            const entities = new Array<Entity>();
            entities.push(e);

            let c = new LineCollider();

            //setup spies
            entities.forEach = sinon.spy();

            c.checkCollision(e, entities);

            //forEach should be called this time, as the prime entity passes canProcess()
            expect(entities.forEach["calledOnce"]).to.equal(true);
            //should only be called for the prime entity, not the one in the array
            expect(LineCollider.canProcess["calledOnce"]).to.equal(true);
        });

        it("should skip checking if the second entity fails canProcess()", () => {
            const e = new Entity();
            e.addComponent(new LineColliderComponent(1, 1, 1, 1))
            const entities = new Array<Entity>();
            entities.push(new Entity());

            const c = new LineCollider();

            c.checkCollision(e, entities);

            //first call (for the prime entity) should pass
            expect(LineCollider.canProcess["returnValues"][0]).to.equal(true);

            //second call (for the array entity) should fail
            expect(LineCollider.canProcess["returnValues"][1]).to.equal(false);
        });

        it("shouldn't call a LineCollider callback if no hit occurs", () => {
            const callback = sinon.spy();

            const line1 = new Entity();
            line1.addComponent(new LineColliderComponent(1, 1, 2, 2, callback));

            const line2 = new Entity();
            line2.addComponent(new LineColliderComponent(5, 5, 3, 3, callback));

            const entities = [line2];

            const c = new LineCollider();

            c.checkCollision(line1, entities);

            expect(callback.called).to.equal(false);
        });

        it("should call the prime entity's callback in a successful test", () => {
            const callback = sinon.spy();

            const line1 = new Entity();
            line1.addComponent(new LineColliderComponent(1, 1, 3, 1, callback)); //horz

            const line2 = new Entity();
            line2.addComponent(new LineColliderComponent(2, 0, 2, 2)); //vert and crossing line1

            const entities = [line2];

            const c = new LineCollider();

            c.checkCollision(line1, entities);

            expect(callback.called).to.equal(true);
        });

        it("should ONLY call the prime entity's callback in a successful test", () => {
            const callback1 = sinon.spy();
            const callback2 = sinon.spy();

            const line1 = new Entity();
            line1.addComponent(new LineColliderComponent(1, 1, 3, 1, callback1)); //horz

            const line2 = new Entity();
            line2.addComponent(new LineColliderComponent(2, 0, 2, 2, callback2)); //vert and crossing line1

            const entities = [line2];

            const c = new LineCollider();

            c.checkCollision(line1, entities);

            expect(callback1.called).to.equal(true);
            expect(callback2.called).to.equal(false);
        });

        it("should give the same result for colliding the two same entities in the opposite order", () => {
            const callback = sinon.spy((prime, other, hit) => {
                return { x: hit.x, y: hit.y};
            });

            const line1 = new Entity();
            line1.addComponent(new LineColliderComponent(0, 180, 800, 180, callback)); //horz

            const line2 = new Entity();
            line2.addComponent(new LineColliderComponent(50, 50, 50, 550, callback)); //vert and crossing line1

            const entities = [line1, line2];

            const c = new LineCollider();

            c.checkCollision(line1, entities);
            c.checkCollision(line2, entities);

            expect(callback.calledTwice).to.equal(true);

            const result1 = callback.getCall(0).returnValue;
            const result2 = callback.getCall(1).returnValue;
            expect(result1.x).to.equal(result2.x);
            expect(result1.y).to.equal(result2.y);
        });
    });
});