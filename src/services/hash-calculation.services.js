import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { finished } from 'node:stream/promises';
import { normalizeString } from '../helpers/index.js';
import { CWD, INVALID_INPUT, OPERATION_FAILED } from '../constants/index.js';

const { log: print } = console;

export const calculateHash = async (appState, filePath) => {
    if (!filePath) throw new Error(INVALID_INPUT);

    const normalizedFilePath = normalizeString(filePath);
    const currentDirPath = appState.get(CWD);
    const resFilePath = resolve(currentDirPath, normalizedFilePath);

    const readStream = createReadStream(resFilePath);
    const hash = createHash('sha256');

    try {
        readStream.on('data', (chunk) => {
            hash.update(chunk);
        });

        await finished(readStream);

        const result = hash.digest('hex');

        print(result);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};
