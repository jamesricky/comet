import { ESLint } from "eslint";
import { Project, SourceFile } from "ts-morph";

import { GeneratedFiles } from "./write-generated-files";

export async function lintSource(sourceCode: string): Promise<string> {
    const eslint = new ESLint({
        cwd: process.cwd(),
        fix: true,
        overrideConfig: {
            rules: {
                "import/no-extraneous-dependencies": "off", //don't report missing dpendency to @comet/cms-api
            },
        },
    });
    const lintResults = await eslint.lintText(sourceCode, {
        filePath: "test.ts",
    });
    for (const lintResult of lintResults) {
        // must not have parse or lint errors
        if (lintResult.errorCount != 0) {
            console.error(lintResult);
            throw new Error("Lint result has errors");
        }
    }
    if (lintResults.length != 1) throw new Error("There must be exactly one lintResult as we lint only one file");

    const ret = lintResults[0].output ? lintResults[0].output : lintResults[0].source;
    if (ret === undefined) throw new Error("Lint output must not be undefined");
    return ret;
}

export async function lintGeneratedFiles(files: GeneratedFiles): Promise<GeneratedFiles> {
    const ret: GeneratedFiles = {};
    for (const fileName in files) {
        ret[fileName] = await lintSource(files[fileName]);
    }
    return ret;
}

export function parseSource(source: string): SourceFile {
    const project = new Project({
        tsConfigFilePath: "./tsconfig.json",
        skipAddingFilesFromTsConfig: true,
    });
    return project.createSourceFile("test.ts", source);
}
