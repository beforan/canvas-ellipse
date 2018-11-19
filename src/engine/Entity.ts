import Component from "./components/Component";

/** Basic entity for everything managed by the Ellipse Engine */
export default class Entity {
    /** Count of Entity instances */
    private static _count = 0;

    /** Count of Entity instances */
    static get count(): number { return Entity._count }

    /** Add property/method names here so they can't be overridden/removed as if they're components */
    private static _reserved: Array<string> = [
        "id",
        "count",
        "addComponent",
        "removeComponent",
        "print",
        "reserved"
    ];

    /** List of reserved words that cannot be component names */
    static get reserved(): Array<string> { return Entity._reserved; }

    /** Unique identifier for this entity */
    private _id: string;

    /** Unique identifier for this entity */
    get id(): string { return this._id }

    /** Creates an entity with a psuedo random unique Id and no components */
    constructor() {
        this._id = (+new Date()).toString(16) +
            (Math.random() * 1E10 | 0).toString(16) +
            Entity._count;

        Entity._count++;

        return this;
    }

    /**
     * Add a component to this entity
     * @param {Component} component - The component object to add
     */
    addComponent(component: Component) {
        if (Entity.isReserved(component.name))
            throw new Error("The specified component name is a reserved word and cannot be registered.");
        this[component.name] = component;
    }

    /**
     * Removes a component
     * @param {string | Component} component - The component object to remove, or its name
     */
    removeComponent(component: string | Component) {
        let name: string;
        if (component instanceof Component) name = component.name;
        else name = component as string;

        if(Entity.isReserved(name))
            throw new Error("The specified component name is a reserved word.");

        delete this[name];
    }

    /**
     * Check if a word is reserved.
     * @param {string} word - The word to check
     */
    static isReserved(word: string): boolean {
        return Entity._reserved.indexOf(word) >= 0;
    }

    /** Dumps the object as JSON to the console */
    print() {
        console.log(JSON.stringify(this, null, 2));
    }


}