import TextBaseLine from "../enum/TextBaseline"

/** Indicates the options that can be provided for ApiGraphics.print() */
export default interface ITextOptions {
    width?: number,
    colour?: string,
    font?: string,
    baseline?: TextBaseLine,
    alignment?: string
}