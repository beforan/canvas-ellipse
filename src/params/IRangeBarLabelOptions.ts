import RangeBarLabelAlignment from "../enum/RangeBarLabelAlignment";

/** Indicates the options that can be provided for a RangeBarLabel entity */
export default interface IRangeBarLabelOptions {
    text?: string,
    font?: string, 
    colour?: string, 
    alignment?: RangeBarLabelAlignment
}


