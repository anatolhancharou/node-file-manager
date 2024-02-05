import { COMMANDS } from '../constants/index.js';

export const commandsMapper = () => ({
    [COMMANDS.UP]: (appState, args) => {},
    [COMMANDS.CD]: (appState, args) => {},
    [COMMANDS.LS]: (appState, args) => {},
    [COMMANDS.CAT]: (appState, args) => {},
    [COMMANDS.ADD]: (appState, args) => {},
    [COMMANDS.RN]: (appState, args) => {},
    [COMMANDS.CP]: (appState, args) => {},
    [COMMANDS.MV]: (appState, args) => {},
    [COMMANDS.RM]: (appState, args) => {},
    [COMMANDS.OS]: (_, args) => {},
    [COMMANDS.HASH]: (appState, args) => {},
    [COMMANDS.COMPRESS]: (appState, args) => {},
    [COMMANDS.DECOMPRESS]: (appState, args) => {},
});
