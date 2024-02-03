import { logOperationMessage, messageEnum } from './messages.mjs';

export function tryAction (callback) {
    try { callback(); }
    catch(error) {
        logOperationMessage(messageEnum.error);
    }
}

export async function tryAsyncAction (callback) {
    try { await callback(); }
    catch(error) {
        logOperationMessage(messageEnum.error);
    }
}

export function getCommand(input) {
    const inputParts = input.trim().split(' ');
    const type = inputParts[0];
    const commandParametersString = inputParts.slice(1).join(' ');
    let parameters = null;
    
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