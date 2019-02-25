import * as assert from "assert";
import { app } from "egg-mock/bootstrap";

describe("test/app/controller/book.test.ts", () => {
  // 代理 test
  it("should POST /book/proxy", async () => {
    const result = await app
      .httpRequest()
      .post("/book/proxy")
      .send({ url: "/hs/v3/channel/418" })
      .set("Accept", "application/json");
    assert(result.body.banner.length === 2);
  });
});
