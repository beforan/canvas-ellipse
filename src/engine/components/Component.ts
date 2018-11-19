/** Base class for Components */
export default class Component {
    /** The name of the component as it will be registered on entities */
    private _name: string;

    /** The name of the component as it will be registered on entities */
    get name(): string { return this._name }
    
    /**
     * Creates a Component with the specified name
     * @param {string} name - The name the Component should use on entities
     */
    constructor(name: string) { this._name = name }
}