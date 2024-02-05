import { EOL } from 'node:os';

const { log: print } = console;

export const printCurrentDirPath = (cwd) => {
    print(`${EOL}You are currently in ${cwd}`);
};

export const printMessage = (message, username) => {
    print(message, username);
};
