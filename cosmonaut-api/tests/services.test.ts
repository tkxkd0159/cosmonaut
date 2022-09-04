import { Request } from "express";
import { getUid } from "@d3lab/services";
import {checkTarget} from "@d3lab/services/cosm"
import { APIError } from "@d3lab/types";

describe("index.ts", () => {
    let mockReq: Partial<Request>;

    beforeEach(() => {
        mockReq = {
            body: undefined,
            // @ts-ignore
            session: {
                passport: {
                    user: {
                        issuer: "google",
                        id: "12345",
                    },
                },
            },
        };
    });

    test("get uid", () => {
        const res = getUid(mockReq as Request);
        expect(res).toBe("google-12345");

        if (mockReq.session !== undefined) {
            mockReq.session.passport = undefined;
            expect(() => {
                getUid(mockReq as Request);
            }).toThrowError(APIError);
        }
    });
});

describe("cosm.ts", () => {

    test("check lesson & chapter input", () => {
        expect(() => {
            checkTarget(1, 1)
        }).not.toThrow()
        expect(() => {
            checkTarget(1, NaN)
        }).toThrow()
    })
}
)