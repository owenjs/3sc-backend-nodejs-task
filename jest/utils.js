const path = require("path");
const { spawn } = require("child_process");

exports.exec = (args = []) =>
  new Promise((resolve, reject) => {
    const cli = spawn("node", [path.resolve(__dirname, "../"), ...args]);
    const chunks = [];

    cli.stdout.on("data", data => {
      chunks.push(data);
    });

    cli.stderr.on("data", data => {
      reject(data);
    });

    cli.stdout.on("end", () => {
      let output = Buffer.concat(chunks).toString();

      // Trim and then split the output by linebreak
      output = output.trim().split(/\r?\n/);

      resolve(output);
    });
  });
