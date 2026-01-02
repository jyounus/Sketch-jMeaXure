import { initialize, PlaygroundContext, context, sketch } from "./context";
import { linkColorsToSwatches } from "./swatches";

export var onInit = initialize;
export function run(ctx: PlaygroundContext) {
    // // select locked jMeaXure markers in current page
    // selectLayers(
    //     layer => layer.name.startsWith('#jmeaxure') && layer.locked,
    //     context.page
    // );
    linkColorsToSwatches(lib => lib.name == 'zent')
}
