import Ellipse from "./Ellipse";
import IEllipseParams from "./params/IEllipseParams";
import IEllipseOptions from "./params/IEllipseOptions";

/** Exported entrypoint method to attach an Ellipse instance to a Canvas element */
export function attach(selector: string, params: IEllipseParams, options?: IEllipseOptions) {
    const canvas = document.querySelector(selector) as HTMLCanvasElement;
    return new Ellipse(canvas, params, options);
}