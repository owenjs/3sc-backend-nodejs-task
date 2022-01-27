import path from "path";
import { spawn } from "child_process";

export const exec = (...args: string[]) =>
  new Promise<string[]>(resolve => {
    const cli = spawn("node", [path.resolve(__dirname, "../"), ...args]);
    const chunks: Uint8Array[] = [];

    cli.stdout.on("data", (data: Uint8Array) => {
      chunks.push(data);
    });

    cli.stderr.on("data", (data: Uint8Array) => {
      chunks.push(data);
    });

    cli.stdout.on("end", () => {
      let output = Buffer.concat(chunks).toString();

      // Trim and then split the output by linebreak
      resolve(output.trim().split(/\r?\n/));
    });
  });
