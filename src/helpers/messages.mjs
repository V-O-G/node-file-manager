import { cwd } from 'process';

export class userMessage {
    constructor(args) {
        const nameFromArgs = getUserName(args); 
        this.userName = nameFromArgs || 'our dear user';
    }

    logOnEvent(event) {
        switch(event) {
            case messageEnum.enter:
                console.log(`Welcome to the File Manager, ${this.userName}!`);
                break;
            case messageEnum.exit:
                console.log(`Thank you for using File Manager, ${this.userName}, goodbye!`);
        }
    }
}

export function logOperationMessage(event) {
    console.log(`${ operationMessages[event]() }`);
};

export const messageEnum = {
    enter: 'enter',
    exit: 'exit',
    success: 'success',
    invalid: 'invalid',
    error: 'error',
};

function getUserName(args) {
    try {
        return args.slice(2)
            .find((el) => el.startsWith('--username='))
            .split('--username=')[1];
    } catch {
        return null;
    };
}

const operationMessages = {
    [messageEnum.success]: () => `You are currently in ${ cwd() }\n`,
    [messageEnum.invalid]: () => '\nInvalid input',
    [messageEnum.error]: () => '\nOperation failed',
};