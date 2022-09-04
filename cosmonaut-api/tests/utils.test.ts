import path from "path";
import { unlinkSync } from "fs";
import {
    srcStrip,
    saveCodeFiles,
    lodeCodeFiles,
    sleep,
    b64ToStr,
} from "@d3lab/utils";
import { APIError } from "@d3lab/types";

describe("util functions test", () => {
    test("src stripper test", () => {
        const tcs = [
            "/home/ljs/ext/sdb/github.com/D3LAB-DAO/cosmonaut/cosmonaut-api/cargo-projects/cosm/github-111/lesson1/ch5/src",
            "/abc/src/dcf/src/asdasd/src/src/adsasda/cosmonaut-api/cargo-prijects/cosm/random/lesson3/ch2/src",
            "/src",
            "/a/src",
        ];

        const ans = [
            "/home/ljs/ext/sdb/github.com/D3LAB-DAO/cosmonaut/cosmonaut-api/cargo-projects/cosm/github-111/lesson1/ch5",
            "/abc/src/dcf/src/asdasd/src/src/adsasda/cosmonaut-api/cargo-prijects/cosm/random/lesson3/ch2",
            "/src",
            "/a",
        ];

        for (let i = 0; i < tcs.length; i++) {
            expect(srcStrip(tcs[i])).toBe(ans[i]);
        }
    });

    test("save & load rust codes", async () => {
        const tcs = [
            "Zm4gbWFpbigpIHsKICAgIHByaW50bG4hKCJ7fSIsICJzYW1wbGUiKTsKfQ==",
        ];
        const ans = [`fn main() {\n    println!("{}", "sample");\n}`];
        const projPath = path.join(process.cwd(), "tests");
        const filePath = path.join(process.cwd(), "tests", "main.rs");

        await saveCodeFiles({ "main.rs": tcs[0] }, projPath);
        await sleep(200);
        const res = await lodeCodeFiles(projPath);
        if (res !== undefined) {
            expect(b64ToStr(res["main.rs"])).toBe(ans[0]);
        }

        unlinkSync(filePath);
    });
});

test("Generate API Error", () => {
    const tcs = [
        new APIError(0, "tc api error", true, "stack trace"),
        new APIError(0, "tc api error", false),
    ];
    const ans = [
        { name: "Error", code: 0, msg: "tc api error", isOp: true },
        { name: "Error", code: 0, msg: "tc api error", isOp: false },
    ];
    for (let i = 0; i < tcs.length; i++) {
        expect(tcs[i] instanceof Error).toBeTruthy();
        expect(tcs[i].name).toBe(ans[i].name);
        expect(tcs[i].statusCode).toBe(ans[i].code);
        expect(tcs[i].message).toBe(ans[i].msg);
        expect(tcs[i].isOperational).toBe(ans[i].isOp);
    }
});
