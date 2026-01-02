// Copyright 2020 Jebbs. All rights reserved.
// Use of this source code is governed by the MIT
// license that can be found in the LICENSE file.

import { settingsPanel } from "./jmeaxure/panels/settingsPanel";
import { updateContext } from "./jmeaxure/common/context";
import { logger } from "./jmeaxure/common/logger";
import { markToolbar } from "./jmeaxure/panels/toolbar";
import { openURL } from "./jmeaxure/helpers/helper";
import { exportSpecification } from "./jmeaxure/export";
import { markNote } from "./jmeaxure/note";
import { markPropertiesAll } from "./jmeaxure/properties";
import { markOverlays } from "./jmeaxure/overlay";
import { exportable } from "./jmeaxure/exportable";
import { drawCoordinate } from "./jmeaxure/coordinate";
import { drawSizes } from "./jmeaxure/size";
import { drawSpacings } from "./jmeaxure/spacings";
import { toggleHidden, toggleLocked, clearAllMarks } from "./jmeaxure/manage";
import { sketch } from "./sketch";
import { EdgeVertical, Edge } from "./sketch/layer/alignment";
import { renameOldMarkers } from "./jmeaxure/helpers/renameOldMarkers";
import { runScript } from "./jmeaxure/runScript";

export function commandInit(context) { updateContext(context); return false; }
export function commandSettings(context?) { runAndCatch(settingsPanel, context); }
export function commandToolbar(context) { runAndCatch(markToolbar, context); }
export function commandOverlays(context?) { runAndCatch(markOverlays, context); }
export function commandExportable(context?) { exportable(context),context}
export function commandSizes(context?) { commandSizeTop(context); commandSizeRight(context); }
export function commandSizeTop(context?) { runAndCatch(drawSizes, context, EdgeVertical.top); }
export function commandSizeMiddle(context?) { runAndCatch(drawSizes, context, EdgeVertical.middle); }
export function commandSizeBottom(context?) { runAndCatch(drawSizes, context, EdgeVertical.bottom); }
export function commandSizeLeft(context?) { runAndCatch(drawSizes, context, Edge.left); }
export function commandSizeCenter(context?) { runAndCatch(drawSizes, context, Edge.center); }
export function commandSizeRight(context?) { runAndCatch(drawSizes, context, Edge.right); }
export function commandSpacings(context?) { runAndCatch(drawSpacings, context); }
export function commandSpacingVertical(context?) { runAndCatch(drawSpacings, context, "vertical"); }
export function commandSpacingHorizontal(context?) { runAndCatch(drawSpacings, context, "horizontal"); }
export function commandSpacingTop(context?) { runAndCatch(drawSpacings, context, "top"); }
export function commandSpacingBottom(context?) { runAndCatch(drawSpacings, context, "bottom"); }
export function commandSpacingLeft(context?) { runAndCatch(drawSpacings, context, "left"); }
export function commandSpacingRight(context?) { runAndCatch(drawSpacings, context, "right"); }
export function commandProperties(context?) { runAndCatch(markPropertiesAll, context); }
export function commandNote(context?) { runAndCatch(markNote, context); }
export function commandCoordinate(context?) { runAndCatch(drawCoordinate, context); }
export function commandHidden(context?) { runAndCatch(toggleHidden, context); }
export function commandLocked(context?) { runAndCatch(toggleLocked, context); }
export function commandClear(context?) { runAndCatch(clearAllMarks, context); }
export function commandExport(context?) { runAndCatch(exportSpecification, context); }
export function commandRenameOldMarkers(context?) { runAndCatch(renameOldMarkers, context); }
export function commandRunScript(context?) { runAndCatch(runScript, context); }
export function linkFeedback(context?) { runAndCatch(openURL, context, "https://github.com/jyounus/Sketch-jMeaXure/issues"); }
export function linkHome(context?) { runAndCatch(openURL, context, "https://github.com/jyounus/Sketch-jMeaXure"); }

function runAndCatch(fn: Function, context, ...args) {
    try {
        updateContext(context);
        let returns = fn(...args);
        if (returns instanceof Promise) {
            returns.catch(error => showError(error))
        }
    } catch (error) {
        showError(error);
    }
    function showError(error) {
        logger.error(error);
        sketch.UI.message(error);
    }
}
