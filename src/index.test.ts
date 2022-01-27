import { exec } from "/@jest-utils";

describe("Temperature converter", () => {
  it("should return '104' when given temperature is '40' and no options are set", async () => {
    const output = await exec("40");

    expect(output[0]).toBe("104");
  });

  it("should return '104' when given temperature is '40' and -f option is set", async () => {
    const output = await exec("40", "-f");

    expect(output[0]).toBe("104");
  });

  it("should return '4.44' when given temperature is '40' and -c option is set", async () => {
    const output = await exec("40", "-c");

    expect(output[0]).toBe("4.44");
  });

  it("should return '104.63' when given temperature is '40.35' and -f option is set", async () => {
    const output = await exec("40.35", "-f");

    expect(output[0]).toBe("104.63");
  });

  it("should return '4.64' when given temperature is '40.35' and -c option is set", async () => {
    const output = await exec("40.35", "-c");

    expect(output[0]).toBe("4.64");
  });

  it("should return error message when given temperature isn't a number", async () => {
    const output = await exec("NaN");

    expect(output[0]).toMatch(/^Error/);
  });
});
