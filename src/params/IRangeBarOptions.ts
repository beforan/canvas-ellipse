import IRangeBarLabelOptions from "./IRangeBarLabelOptions";

/** Indicates the options that can be provided for the RangeBar entity */
export default interface IRangeBarOptions {
    top?: number;
    width?: number;
    colour?: string;
    minLabel?: IRangeBarLabelOptions;
    midLabel?: IRangeBarLabelOptions;
    maxLabel?: IRangeBarLabelOptions;
}
