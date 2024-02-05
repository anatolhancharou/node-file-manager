import { basename, resolve } from 'node:path';
import { writeFile, rename, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { isExists, normalizeString, parseInputArgs } from '../helpers/index.js';
import { CWD, INVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';

const { log: print } = console;

export const readFile = async (appState, filePath) => {
    if (!filePath) throw new Error(INVALID_INPUT);

    const currentDirPath = appState.get(CWD);
    const normalizedFilePath = normalizeString(filePath);
    const resFilePath = resolve(currentDirPath, normalizedFilePath);

    const readStream = createReadStream(resFilePath);

    return new Promise((res, rej) => {
        readStream.on('data', (chunk) => {
            print(chunk.toString());
        });

        readStream.on('end', res);

        readStream.on('error', () => {
            rej(new Error(OPERATION_FAILED));
        });
    });
};

export const createNewFile = async (appState, fileName) => {
    if (!fileName) throw new Error(INVALID_INPUT);

    const currentDirPath = appState.get(CWD);
    const normalizedFileName = normalizeString(fileName);
    const resFilePath = resolve(currentDirPath, normalizedFileName);

    try {
        await writeFile(resFilePath, '', { flag: 'wx' });
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const renameFile = async (appState, args) => {
    const parsedArgs = parseInputArgs(args);

    if (parsedArgs.length !== 2) throw new Error(INVALID_INPUT);

    const [currentFilePath, newFileName] = parsedArgs;
    const currentDirPath = appState.get(CWD);

    const resCurrentFilePath = resolve(currentDirPath, currentFilePath);
    const resNewFilePath = resolve(currentDirPath, newFileName);

    try {
        if (await isExists(resNewFilePath)) throw new Error(OPERATION_FAILED);
        await rename(resCurrentFilePath, resNewFilePath);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const transferFile = async (appState, args, isMove) => {
    const parsedArgs = parseInputArgs(args);

    if (parsedArgs.length !== 2) throw new Error(INVALID_INPUT);

    const [filePath, newDirPath] = parsedArgs;

    const currentDirPath = appState.get(CWD);
    const currentFileName = basename(filePath);

    const resCurrentFilePath = resolve(currentDirPath, filePath);
    const resNewFilePath = resolve(currentDirPath, newDirPath, currentFileName);

    const readStream = createReadStream(resCurrentFilePath);
    const writeStream = createWriteStream(resNewFilePath);

    try {
        if (await isExists(resNewFilePath)) throw new Error(OPERATION_FAILED);
        await pipeline(readStream, writeStream);
        isMove && (await rm(resCurrentFilePath));
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};

export const removeFile = async (appState, filePath) => {
    if (!filePath) throw new Error(INVALID_INPUT);

    const currentDirPath = appState.get(CWD);
    const normalizedFilePath = normalizeString(filePath);
    const resFilePath = resolve(currentDirPath, normalizedFilePath);

    try {
        await rm(resFilePath);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};
