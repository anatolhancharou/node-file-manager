import { readdir, lstat } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';
import { platform } from 'node:os';
import {
    getTableRowData,
    sortItemsByName,
    normalizeString,
} from '../helpers/index.js';
import { CWD, INVALID_INPUT } from '../constants/index.js';
import { OperationFailedError } from '../entities/operation-failed-error.js';

const { table: printTable } = console;
const isWin = platform() === 'win32';

export const changeDir = async (appState, dirPath) => {
    if (!dirPath) throw new Error(INVALID_INPUT);

    const normalizedDirPath = normalizeString(dirPath);

    const isWinRoot =
        isWin &&
        normalizedDirPath.includes(':') &&
        !isAbsolute(normalizedDirPath);

    const currentDirPath = appState.get(CWD);

    const resDirPath = resolve(
        isWinRoot ? '/' : currentDirPath,
        normalizedDirPath
    );

    try {
        const stat = await lstat(resDirPath);

        if (stat.isDirectory()) {
            appState.set(CWD, resDirPath);
        } else {
            throw new Error('Destination path is not a directory');
        }
    } catch ({ message }) {
        throw new OperationFailedError(message);
    }
};

export const goToUpperDir = async (appState, args) => {
    if (args) throw new Error(INVALID_INPUT);

    await changeDir(appState, '..');
};

export const listDirContents = async (appState, args) => {
    if (args.length) throw new Error(INVALID_INPUT);

    const currentDirPath = appState.get(CWD);

    const folders = [];
    const files = [];
    const links = [];
    const others = [];

    try {
        const currentDirContents = await readdir(currentDirPath, {
            withFileTypes: true,
        });

        for (const item of currentDirContents) {
            item.isDirectory() &&
                folders.push(getTableRowData(item.name, 'directory'));

            item.isFile() && files.push(getTableRowData(item.name, 'file'));

            item.isSymbolicLink() &&
                links.push(getTableRowData(item.name, 'symbolic-link'));

            !item.isDirectory() &&
                !item.isFile() &&
                !item.isSymbolicLink() &&
                others.push(getTableRowData(item.name, 'unknown'));
        }
    } catch ({ message }) {
        throw new OperationFailedError(message);
    }

    const sortedFolders = sortItemsByName(folders);
    const sortedFiles = sortItemsByName(files);
    const sortedLinks = sortItemsByName(links);
    const sortedOthers = sortItemsByName(others);

    const formattedContents = [
        ...sortedFolders,
        ...sortedFiles,
        ...sortedLinks,
        ...sortedOthers,
    ];

    printTable(formattedContents);
};
