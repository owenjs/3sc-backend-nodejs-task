import { exec } from "/@jest-utils";

describe("Temperature converter", () => {
  describe("convert temperature to fahrenheit - default", () => {
    it("should convert correctly to fahrenheit when temperature is an integer and no options are set", async () => {
      const output = await exec("40");

      expect(output[0]).toBe("104");
    });

    it("should convert correctly to fahrenheit when temperature is an integer and -f option is set", async () => {
      const output = await exec("40", "-f");

      expect(output[0]).toBe("104");
    });

    it("should convert correctly to fahrenheit when temperature is a float and -f option is set", async () => {
      const output = await exec("40.35", "-f");

      expect(output[0]).toBe("104.63");
    });

    it("should return the minimal number of decimal places even when the -dp option is set to 3", async () => {
      const output = await exec("40.35", "-f", "-dp", "3");

      expect(output[0]).toBe("104.63");
    });
  });

  describe("convert temperature to celsius", () => {
    it("should convert correctly to celsius when temperature is an integer and -c option is set", async () => {
      const output = await exec("40", "-c");

      expect(output[0]).toBe("4.44");
    });

    it("should convert correctly to celsius when temperature is a float and -c option is set", async () => {
      const output = await exec("40.35", "-c");

      expect(output[0]).toBe("4.64");
    });

    it("should convert correctly to celsius and round result to 3 decimal places when the -dp option is set to 3 and -c option is set", async () => {
      const output = await exec("40.35", "-c", "-dp", "3");

      expect(output[0]).toBe("4.639");
    });
  });

  describe("errors", () => {
    const errorRegex = /^[Ee]rror/;

    it("should return an error message when no temperature is given", async () => {
      const output = await exec();

      expect(output[0]).toMatch(errorRegex);
    });

    it("should return an error message when given temperature isn't a number", async () => {
      const output = await exec("NaN");

      expect(output[0]).toMatch(errorRegex);
    });

    it("should return an error when no decimal place is given when the -dp option is present", async () => {
      const output = await exec("40", "-dp");

      expect(output[0]).toMatch(/^[Ee]rror/);
    });

    it("should return an error when the given decimal place option isn't a number", async () => {
      const output = await exec("40", "-dp", "NaN");

      expect(output[0]).toMatch(/^[Ee]rror/);
    });
  });
});
