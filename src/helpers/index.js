import { access } from 'node:fs/promises';
import { EOL } from 'node:os';

const { log: print } = console;

export const normalizeString = (name) => {
    return name.startsWith('"') && name.endsWith('"')
        ? name.slice(1, -1)
        : name;
};

export const parseInputArgs = (args) => {
    return args.match(/(?:[^\s"]+|"[^"]*")+/g).map(normalizeString);
};

export const sortItemsByName = (items) => {
    const arr = [...items];
    return arr.sort((a, b) => a.Name.localeCompare(b.Name));
};

export const getTableRowData = (name, type) => {
    return { Name: name, Type: type };
};

export const isExists = async (path) => {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
};

export const printCurrentDirPath = (cwd) => {
    print(`${EOL}You are currently in ${cwd}`);
};

export const printMessage = (message, username) => {
    print(message, username);
};
