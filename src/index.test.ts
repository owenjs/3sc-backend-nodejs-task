import { exec } from "/@jest-utils";

describe("hello cli", () => {
  it("should print 'Hello!' on first line", async () => {
    const output = await exec();

    expect(output[0]).toBe("Hello!");
  });

  it("should print 'Hello Again!' on second line", async () => {
    const output = await exec();

    expect(output[1]).toBe("Hello Again!");
  });
});
