import {
    changeDir,
    goToUpperDir,
    listDirContents,
} from './navigation.services.js';
import { printOsInfo } from './os-info.services.js';
import { calculateHash } from './hash-calculation.services.js';
import { brotliFile } from './compress-file.services.js';
import { COMMANDS } from '../constants/index.js';

export const commandsMapper = () => ({
    [COMMANDS.UP]: (appState, args) => goToUpperDir(appState, args),
    [COMMANDS.CD]: (appState, args) => changeDir(appState, args),
    [COMMANDS.LS]: (appState, args) => listDirContents(appState, args),
    [COMMANDS.CAT]: (appState, args) => {},
    [COMMANDS.ADD]: (appState, args) => {},
    [COMMANDS.RN]: (appState, args) => {},
    [COMMANDS.CP]: (appState, args) => {},
    [COMMANDS.MV]: (appState, args) => {},
    [COMMANDS.RM]: (appState, args) => {},
    [COMMANDS.OS]: (_, args) => printOsInfo(args),
    [COMMANDS.HASH]: (appState, args) => calculateHash(appState, args),
    [COMMANDS.COMPRESS]: (appState, args) => brotliFile(appState, args, true),
    [COMMANDS.DECOMPRESS]: (appState, args) => brotliFile(appState, args),
});
