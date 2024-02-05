import { homedir } from 'node:os';
import { CWD } from './constants/index.js';

export const appState = new Map([[CWD, homedir()]]);
