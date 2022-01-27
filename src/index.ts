#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

type TempConvertor = (temp: number) => number;

/**
 * Convert to Fahrenheit
 *  - multiply by 9/5 and add 32
 *
 * @param temp temperature to convert
 * @return number converted temperature
 */
const toFahrenheit: TempConvertor = temp => temp * (9 / 5) + 32;

/**
 * Convert to Celsius
 *  - subtract 32 and multiply by 5/9
 *
 * @param temp temperature to convert
 * @return number converted temperature
 */
const toCelsius: TempConvertor = temp => (temp - 32) * (5 / 9);

/**
 * Round number to x decimal places
 *
 * @param num number to round
 * @param dp number of decimal place to round, default = 2
 * @return number rounded number
 */
const round = (num: number, dp: number = 2): number => {
  return +(Math.round(Number(num + "e+" + dp)) + "e-" + dp);
};

/**
 * Will fire when the cli tool is invoked
 *
 * @param temperature the temperature to convert
 * @param options object of the possible options for the program
 */
const main = (temperature: string, options: { fahrenheit: boolean; celsius: boolean; decimalPlace: string }) => {
  let temp = parseFloat(temperature);
  let dp = options.decimalPlace ? parseFloat(options.decimalPlace) : 2;

  if (Number.isNaN(temp)) {
    console.error(new Error("<temperature> needs to be a number"));
    return;
  }

  if (Number.isNaN(dp) || !Number.isInteger(dp)) {
    console.error(new Error("-dp <dp> needs to be an integer"));
    return;
  }

  temp = options.celsius ? toCelsius(temp) : toFahrenheit(temp);

  temp = round(temp, dp);

  console.log(temp);
};

program
  .version("1.0.0")
  .description("Temperature converter CLI Tool - by Owen Evans")
  .argument("<temperature>", "temperature to convert, converts to fahrenheit by default")
  .option("-c, --celsius", "convert temperature to celsius")
  .option("-f, --fahrenheit", "convert temperature to fahrenheit")
  .option(
    "-dp, --decimalPlace <dp>",
    "number of decimal places the returned temperature will be rounded to, default is 2dp"
  )
  .action(main);

program.parse(process.argv);
