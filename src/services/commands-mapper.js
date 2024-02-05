import {
    changeDir,
    goToUpperDir,
    listDirContents,
} from './navigation.js';
import {
    readFile,
    createNewFile,
    renameFile,
    transferFile,
    removeFile,
} from './basic-file-operations.js';
import { printOsInfo } from './os-info.js';
import { calculateHash } from './hash-calculation.js';
import { brotliFile } from './compress-file.js';
import { COMMANDS } from '../constants/index.js';

export const commandsMapper = () => ({
    [COMMANDS.UP]: (appState, args) => goToUpperDir(appState, args),
    [COMMANDS.CD]: (appState, args) => changeDir(appState, args),
    [COMMANDS.LS]: (appState, args) => listDirContents(appState, args),
    [COMMANDS.CAT]: (appState, args) => readFile(appState, args),
    [COMMANDS.ADD]: (appState, args) => createNewFile(appState, args),
    [COMMANDS.RN]: (appState, args) => renameFile(appState, args),
    [COMMANDS.CP]: (appState, args) => transferFile(appState, args),
    [COMMANDS.MV]: (appState, args) => transferFile(appState, args, true),
    [COMMANDS.RM]: (appState, args) => removeFile(appState, args),
    [COMMANDS.OS]: (_, args) => printOsInfo(args),
    [COMMANDS.HASH]: (appState, args) => calculateHash(appState, args),
    [COMMANDS.COMPRESS]: (appState, args) => brotliFile(appState, args, true),
    [COMMANDS.DECOMPRESS]: (appState, args) => brotliFile(appState, args),
});
