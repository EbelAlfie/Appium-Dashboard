import { execSync, spawn } from "child_process";

const adbCommand = spawn('adb', ['-a', 'nodaemon', 'server', 'start']);

adbCommand.stdout.on('data', (data: Buffer) => {
  console.log(data.toString());
});

adbCommand.stderr.on('data', (data: Buffer) => {
  console.error(`error ${data}`);
});

adbCommand.on('close', (code: number) => {
  console.log("ended");
});
setTimeout(() => {
  execSync('adb kill-server');
}, 5000);