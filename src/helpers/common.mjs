import { Writable } from 'stream';

import { logOperationMessage, messageEnum } from './messages.mjs';

export function tryAction (callback) {
    try { callback(); }
    catch(error) {
        logOperationMessage(messageEnum.error);
    } finally {
        logOperationMessage(messageEnum.success);
    }
}

export async function tryAsyncAction (callback) {
    try { await callback(); }
    catch(error) {
        logOperationMessage(messageEnum.error);
    } finally {
        logOperationMessage(messageEnum.success);
    }
}

export function getCommand(input) {
    const inputParts = input.trim().split(' ');
    const type = inputParts[0];
    const commandParametersString = inputParts.slice(1).join(' ');
    let parameters = [];
    
    if (commandParametersString.length) {
        if(commandParametersString.includes("'") || commandParametersString.includes('"')) {
            parameters = commandParametersString.replace(/"/g, "'")
                .split("'")
                .filter(el => !['', ' '].includes(el));
        } else {
            parameters = commandParametersString.split(' ');
        }
    }
    return { type, parameters };
}

export function createWritable() {
    return new Writable({
        decodeStrings: false,
        write(chunck, _, callback) {
            process.stdout.write(`${ chunck }\n`);
            callback();
        }
    });
}