import { cpus, EOL, homedir, userInfo, arch } from 'node:os';
import { OS_ARGS, INVALID_INPUT } from '../constants/index.js';

const { log: print, table: printTable } = console;

const printCpusInfo = () => {
    const cpusInfo = cpus();

    const tableData = cpusInfo.map((value) => {
        return { Model: value.model, 'Clock rate (GHz)': value.speed / 1000 };
    });

    print(`Overall amount of CPUs: ${tableData.length}`);
    printTable(tableData);
};

const getSystemEol = (lineEnd) => JSON.stringify(lineEnd);

export const printOsInfo = (args) => {
    const param = args.slice(2);

    switch (param) {
        case OS_ARGS.EOL:
            print(getSystemEol(EOL));
            break;
        case OS_ARGS.CPUS:
            printCpusInfo();
            break;
        case OS_ARGS.HOME_DIR:
            print(homedir());
            break;
        case OS_ARGS.USERNAME:
            print(userInfo().username);
            break;
        case OS_ARGS.ARCH:
            print(arch());
            break;
        default:
            throw new Error(INVALID_INPUT);
    }
};
