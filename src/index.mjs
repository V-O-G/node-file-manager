import { createInterface } from 'readline';

import { userMessage, logOperationMessage, messageEnum } from './helpers/messages.mjs';
import { commander } from './helpers/commander.mjs';
import { getCommand } from './helpers/common.mjs';
import { changeWorkingDirectory } from './operations/navigation.mjs';

let userMessages;
const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

init();

function init() {
    userMessages = new userMessage(process.argv);
    changeWorkingDirectory();
    userMessages.logOnEvent(messageEnum.enter);
    logOperationMessage(messageEnum.success);
    subscribeToReadLine();
}

function subscribeToReadLine() {
    readLine.on('line', (input) => {
        runCommander(getCommand(input));
        logOperationMessage(messageEnum.success);
    })
    .on("SIGINT", () => {
        exit();
    });
}

function runCommander(command) {
    if (!commander[command.type]) {
        logOperationMessage(messageEnum.invalid);
    } else {
        commander[command.type](command.parameters);
    }
}

function exit() {
    userMessages.logOnEvent(messageEnum.exit);
    process.exit();
}