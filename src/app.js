import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { EOL } from 'node:os';
import { commandsMapper } from './services/commands-mapper.js';
import { parseProcessArgs } from './services/process-args.js';
import { printCurrentDirPath, printMessage } from './helpers/index.js';
import {
    CMD_EXIT,
    INVALID_INPUT,
    DEFAULT_USERNAME,
    GREETINGS_MSG,
    GOODBYE_MSG,
    CWD,
} from './constants/index.js';

const { log: print } = console;

const username = parseProcessArgs().username || DEFAULT_USERNAME;

export const init = (appState) => {
    printMessage(GREETINGS_MSG, username);
    printCurrentDirPath(appState.get(CWD));

    const readLine = readline.createInterface({ input, output });

    readLine.prompt();

    readLine.on('line', async (input) => {
        const [command, ...args] = input.trim().split(' ');
        const params = args.join(' ').trim();

        if (!command) {
            return readLine.prompt();
        }

        if (command === CMD_EXIT) {
            return readLine.close();
        }

        try {
            commandsMapper().hasOwnProperty(command) &&
                (await commandsMapper()[command](appState, params));
        } catch ({ message, originalMessage }) {
            const errorMessage = originalMessage
                ? `${message}${EOL}(${originalMessage})`
                : message;
            print(errorMessage);
        }

        !commandsMapper().hasOwnProperty(command) && print(INVALID_INPUT);

        printCurrentDirPath(appState.get(CWD));

        readLine.prompt();
    });

    readLine.on('close', () => {
        printMessage(`${EOL}${GOODBYE_MSG}`, username);
    });
};
