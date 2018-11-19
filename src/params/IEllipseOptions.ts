import IQuestionOptions from "./IQuestionOptions";
import IRangeBarOptions from "./IRangeBarOptions";
import IRangeBarLabelOptions from "./IRangeBarLabelOptions";
import IPenLineOptions from "./IPenLineOptions";
import IRangeBarMarkerOptions from "./IRangeBarMarkerOptions";

/** Indicates the optional settings for initialising an Ellipse instance */
export default interface IEllipseOptions {
    question?: IQuestionOptions;
    pen?: IPenLineOptions;
    rangeMarkers?: IRangeBarMarkerOptions;
    rangeBar?: IRangeBarOptions;
    rangeBarLabel?: IRangeBarLabelOptions;
}