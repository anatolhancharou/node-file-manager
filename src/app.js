import { parseProcessArgs } from './services/cli-args.services.js';
import { printCurrentDirPath, printMessage } from './helpers/index.js';
import { DEFAULT_USERNAME, GREETINGS_MSG, CWD } from './constants/index.js';

const username = parseProcessArgs().username || DEFAULT_USERNAME;

export const init = (appState) => {
    printMessage(GREETINGS_MSG, username);
    printCurrentDirPath(appState.get(CWD));
};
