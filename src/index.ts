#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

type TempConvertor = (temp: number) => number;

// multiply by 9/5 and add 32
const toFahrenheit: TempConvertor = f => f * (9 / 5) + 32;

// subtract 32 and multiply by 5/9
const toCelsius: TempConvertor = c => (c - 32) * (5 / 9);

const round = (num: number): number => {
  return +(Math.round(Number(num + "e+2")) + "e-2");
};

program
  .version("0.0.1")
  .description("Temperature converter CLI Tool - by Owen Evans")
  .argument("<temperature>", "temperature to convert")
  .option("-c, --celsius", "convert temperature to celsius")
  .option("-f, --fahrenheit", "convert temperature to fahrenheit")
  .action((temperature: string, options: { fahrenheit: boolean; celsius: boolean }) => {
    let temp = parseFloat(temperature);

    if (Number.isNaN(temp)) {
      console.error(new Error("<temperature> needs to be a number"));
      return;
    }

    temp = options.celsius ? toCelsius(temp) : toFahrenheit(temp);

    temp = round(temp);

    console.log(temp);
  });

program.parse(process.argv);
