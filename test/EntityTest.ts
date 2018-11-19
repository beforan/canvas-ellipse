import Entity from "../src/engine/Entity";
import Component from "../src/engine/components/Component";

import { expect } from "chai";

describe("Entity", () => {
    
    describe("constructor", () => {
        it("should generate an id", () => {
            const e = new Entity();
            
            expect(e.id.length).to.be.greaterThan(0);
        });
        it("should increment Entity.count", () => {
            const c = Entity.count;
            const e = new Entity();

            expect(Entity.count).to.equal(c + 1);
        });
        it("should generate an id with count at the end", () => {
            const c = Entity.count;
            const l = c.toString().length;
            const e = new Entity();

            expect(e.id.substr(e.id.length - l)).to.equal(c.toString());
        });
    });

    describe("isReserved", () => {
        it("should return true if a reserved word is passed to it", () => {
            const e = new Entity();
            
            Entity.reserved.forEach((word) => {
                expect(Entity.isReserved(word)).to.equal(true);
            });
        });
        it("should return false if a non-reserved word is passed to it", () => {
            const e = new Entity();

            expect(Entity.isReserved("component")).to.equal(false);
        });
    });

    describe("addComponent", () => {
        it("should check for reserved words and throw an error", () => {
            const e = new Entity();
            
            Entity.reserved.forEach((word) => {
                expect(() => e.addComponent(new Component(word))).to.throw(Error, "reserved");
            });
        });

        it("should add a component with a valid name", () => {
            const c = new Component("component");
            const e = new Entity();
            
            e.addComponent(c);
            
            expect(e[c.name]).to.equal(c);
        });
    });

    describe("removeComponent", () => {
        it("should check for reserved words and throw an error when a Component is passed", () => {
            const e = new Entity();
            
            Entity.reserved.forEach((word) => {
                expect(() => e.removeComponent(new Component(word))).to.throw(Error, "reserved");
            });
        });

        it("should check for reserved words and throw an error when a string is passed", () => {
            const e = new Entity();
            
            Entity.reserved.forEach((word) => {
                expect(() => e.removeComponent(word)).to.throw(Error, "reserved");
            });
        });

        it("should remove a component when a Component is passed", () => {
            const e = new Entity();
            const c = new Component("component");
            
            e.addComponent(c);

            e.removeComponent(c);

            expect(e[c.name]).to.be.undefined;
        });

        it("should remove a component when a string is passed", () => {
            const e = new Entity();
            const c = new Component("component");
            
            e.addComponent(c);

            e.removeComponent(c.name);

            expect(e[c.name]).to.be.undefined;
        });
    });
});