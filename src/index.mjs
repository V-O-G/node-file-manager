import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';

import { userMessage, logOperationMessage, messageEnum } from './helpers/messages.mjs';
import { commander } from './helpers/commander.mjs';
import { getCommand } from './helpers/common.mjs';

let userMessages;
const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

init();

function init() {
    userMessages = new userMessage(process.argv);
    // chdir(homedir()); TODO: uncomment
    userMessages.logOnEvent(messageEnum.enter);
    logOperationMessage(messageEnum.success);
    subscribeToReadLine();
}

function subscribeToReadLine() {
    readLine.on('line', (input) => {
        if (input.includes('.exit')) process.exit();
        runCommander(getCommand(input));
    })
    .on("SIGINT", () => {
        exit();
    });
}

function runCommander(command) {
    if (!commander[command.type]) {
        logOperationMessage(messageEnum.invalid);
        logOperationMessage(messageEnum.success);
    } else {
        commander[command.type](command.parameters);
    }
}

function exit() {
    userMessages.logOnEvent(messageEnum.exit);
    process.exit();
}