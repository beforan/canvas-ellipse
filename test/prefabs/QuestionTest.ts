import Component from "../../src/engine/enum/Component";
import Question from "../../src/prefabs/Question";
import LabelComponent from "../../src/engine/components/LabelComponent";
import AppearanceComponent from "../../src/engine/components/AppearanceComponent";
import IQuestionOptions from "../../src/params/IQuestionOptions";
import Entity from "../../src/engine/Entity";
import Engine from "../../src/engine/Engine";

import { expect } from "chai";
import * as sinon from "sinon";

//intialisation

describe("Question", () => {
    describe("constructor", () => {
        it("should set question text ", () => {
            const t = "question text"
            const q = new Question(t);
            expect(q[Component.Label].text).to.equal(t);
        }) 

        //default values
        it("should set default font if none passed", () => {
            const q = new Question("question text");
            expect(q[Component.Label].font).to.equal("16px Arial"); 
        });

        it("should set default colour if none passed", () => {
            const q = new Question("question text");
            expect(q[Component.Appearance].colour).to.equal("black"); 
        });
        
        //optional parameters
        it("should optional values if passed", () => {
            const  options = { colour:"blue", font: "24px Comic Sans MS"} as IQuestionOptions;
            const q = new Question("question text",options);

            expect(q[Component.Appearance].colour).to.equal("blue");
            expect(q.colour).to.equal("blue"); 
            expect(q[Component.Label].font).to.equal("24px Comic Sans MS");
            expect(q.font).to.equal("24px Comic Sans MS"); 
        });
       
        //properties
        it("should set question text to new value", () => {
            const t = "updated question"
            const q = new Question("question text",null);
            q.question = t;        
            expect(q[Component.Label].text).to.equal(t);
            expect(q.question).to.equal(t); 
        });
  
        it("should set font to new value", () => {
            const f = "24px Comic Sans MS"
            const q = new Question("question text",null);
            q.font = f;        
            expect(q[Component.Label].font).to.equal(f);
            expect(q.font).to.equal(f); 
        });

        it("should set colour to new value", () => {
            const c = "Red"
            const q = new Question("question text",null);
            q.colour = c;        
            expect(q[Component.Appearance].colour).to.equal(c);
            expect(q.colour).to.equal(c); 
        });

        it("should calculate position based on specified margins", () => {
            const margin = 10;
            const canvas = {} as HTMLCanvasElement;
            canvas.addEventListener = sinon.stub()
            canvas.getContext = sinon.stub().returns({} as CanvasRenderingContext2D);
            const e = new Engine(canvas);
            const q = new Question("question text", { left: margin, top: margin } as IQuestionOptions );
            expect(q[Component.Position].x).to.equal((e.Frame.Width * margin) / 100);
            expect(q[Component.Position].y).to.equal((e.Frame.Height * margin) / 100);
        })
    })
})