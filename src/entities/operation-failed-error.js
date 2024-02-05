import { OPERATION_FAILED } from '../constants/index.js';

export class OperationFailedError extends Error {
    constructor(originalMessage) {
        super(OPERATION_FAILED);
        this.originalMessage = originalMessage;
        this.name = 'OperationFailedError';
    }
}
