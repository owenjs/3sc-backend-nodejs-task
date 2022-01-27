#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

type TempConvertor = (temp: number) => number;

// multiply by 9/5 and add 32
const toFahrenheit: TempConvertor = f => f * (9 / 5) + 32;

// subtract 32 and multiply by 5/9
const toCelsius: TempConvertor = c => (c - 32) * (5 / 9);

const round = (num: number, dp: number = 2): number => {
  return +(Math.round(Number(num + "e+" + dp)) + "e-" + dp);
};

program
  .version("0.0.1")
  .description("Temperature converter CLI Tool - by Owen Evans")
  .argument("<temperature>", "temperature to convert, converts to fahrenheit by default")
  .option("-c, --celsius", "convert temperature to celsius")
  .option("-f, --fahrenheit", "convert temperature to fahrenheit")
  .option(
    "-dp, --decimalPlace <dp>",
    "number of decimal place the returned temperature will be rounded to, default is 2dp"
  )
  .action((temperature: string, options: { fahrenheit: boolean; celsius: boolean; decimalPlace: string }) => {
    let temp = parseFloat(temperature);
    let dp = options.decimalPlace ? parseInt(options.decimalPlace) : 2;

    if (Number.isNaN(temp)) {
      console.error(new Error("<temperature> needs to be a number"));
      return;
    }

    if (Number.isNaN(dp)) {
      console.error(new Error("-dp <dp> needs to be a number"));
      return;
    }

    temp = options.celsius ? toCelsius(temp) : toFahrenheit(temp);

    temp = round(temp, dp);

    console.log(temp);
  });

program.parse(process.argv);
