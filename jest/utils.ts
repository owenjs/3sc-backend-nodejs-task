const path = require("path");
const { spawn } = require("child_process");

exports.exec = (args: string[] = []) =>
  new Promise<string[]>((resolve, reject) => {
    const cli = spawn("node", [path.resolve(__dirname, "../"), ...args]);
    const chunks: Uint8Array[] = [];

    cli.stdout.on("data", (data: Uint8Array) => {
      chunks.push(data);
    });

    cli.stderr.on("data", (data: Uint8Array) => {
      reject(data);
    });

    cli.stdout.on("end", () => {
      let output = Buffer.concat(chunks).toString();

      // Trim and then split the output by linebreak
      resolve(output.trim().split(/\r?\n/));
    });
  });
