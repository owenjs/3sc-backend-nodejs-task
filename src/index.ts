#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
  .version("0.0.1")
  .description("Temperature converter CLI Tool - by Owen Evans")
  .argument("<temperature>", "temperature to convert")
  .parse(process.argv);

const options = program.opts();

program.outputHelp();
