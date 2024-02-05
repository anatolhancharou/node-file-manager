import { resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { parseInputArgs } from '../helpers/index.js';
import { CWD, INVALID_INPUT } from '../constants/index.js';
import { OperationFailedError } from '../entities/operation-failed-error.js';

export const brotliFile = async (appState, args, flag) => {
    const parsedArgs = parseInputArgs(args);

    if (parsedArgs.length !== 2) throw new Error(INVALID_INPUT);

    const [filePath, destinationPath] = parsedArgs;

    const currentDirPath = appState.get(CWD);
    const resFilePath = resolve(currentDirPath, filePath);
    const resDestinationPath = resolve(currentDirPath, destinationPath);

    const readStream = createReadStream(resFilePath);
    const writeStream = createWriteStream(resDestinationPath);

    try {
        await pipeline(
            readStream,
            flag ? createBrotliCompress() : createBrotliDecompress(),
            writeStream
        );
    } catch ({ message }) {
        throw new OperationFailedError(message);
    }
};
