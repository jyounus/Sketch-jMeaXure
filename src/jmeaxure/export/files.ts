// Copyright 2020 Jebbs. All rights reserved.
// Use of this source code is governed by the MIT
// license that can be found in the LICENSE file.

import { SMExportFormat } from "../interfaces";
import { sketch } from "../../sketch";
import { context } from "../common/context";
import { toJSString } from "../helpers/helper";

export function exportImage(layer: Layer, format: SMExportFormat,savePath:string, path: string, name: string) {
    let document = context.sketchObject.document;

    // Fix for Sketch 2025.1: Use the new export API instead of MSExportRequest

    let fileName = [
        name,
        format.scale ? `@${format.scale}x` : "",
        ".",
        format.format
    ].join("");

    // Create directory if it doesn't exist
    NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(
        path, true, nil, nil
    );

    // Use the new sketch.export API for file export
    // Export into the target folder (Sketch may choose the final filename)
    let outputDir = savePath + '/' + path;
    sketch.export(layer, {
        output: outputDir,
        formats: format.format,
        scales: format.scale.toString(),
    });

    // Sketch 2025.3 fix: The image scales are now correctly exported.
    
    // Attempt to find the actual file created by Sketch in the output folder.
    // Prefer exact match with the @scale suffix; if not found, prefer any file that
    // starts with `name` and ends with the extension; otherwise fallback to constructed name.
    let fs: any = NSFileManager.defaultManager();
    let actualFileName = fileName;
    let files: any[] = [];
    try {
        files = fs.contentsOfDirectoryAtPath_error(outputDir, null) || [];
    } catch (err) {
        files = [];
    }

    // Normalize strings to JS strings for comparison
    let exact = fileName;
    let baseSuffix = "." + format.format;

    if (files && files.length) {
        // First try exact match
        for (let i = 0; i < files.length; i++) {
            let f = String(files[i]);
            if (f === exact) {
                actualFileName = f;
                break;
            }
        }
        // If no exact match, try to find a file that starts with name and ends with extension
        if (actualFileName === fileName) {
            for (let i = 0; i < files.length; i++) {
                let f = String(files[i]);
                if (f.indexOf(name) === 0 && f.endsWith(baseSuffix)) {
                    actualFileName = f;
                    break;
                }
            }
        }
        // As a last resort, prefer any file that contains the name and ends with extension
        if (actualFileName === fileName) {
            for (let i = 0; i < files.length; i++) {
                let f = String(files[i]);
                if (f.indexOf(name) !== -1 && f.endsWith(baseSuffix)) {
                    actualFileName = f;
                    break;
                }
            }
        }
    }

    return encodeURI(path + "/" + actualFileName);
}

export function exportImageToBuffer(layer: Layer, format: SMExportFormat): Buffer {
    return sketch.export(layer, {
        output: null,
        formats: format.format,
        scales: format.scale.toString(),
    }) as Buffer;
}

export function writeFile(options) {

    options = Object.assign({
        content: "Type something!",
        path: toJSString(NSTemporaryDirectory()),
        fileName: "temp.txt"
    }, options)
    let content = NSString.stringWithString(options.content),
        savePathName = [];

    NSFileManager
        .defaultManager()
        .createDirectoryAtPath_withIntermediateDirectories_attributes_error(options.path, true, nil, nil);

    savePathName.push(
        options.path,
        "/",
        options.fileName
    );
    let savePath = savePathName.join("");

    content.writeToFile_atomically_encoding_error(savePath, false, 4, null);
}

export function buildTemplate(content: string, data: object) {
    return content.replace("'{{data}}'", JSON.stringify(data));
}