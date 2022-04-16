import { checkSupport } from "./support";
/**
 * Removes all stored data.
 * @param onComplete Optional callback. Receives *true* if all is ok, or *false*
 * if the operation could not be completed.
 */
declare function clear(onComplete?: (ok: boolean) => void): void;
/**
 * Stores data in the browser storage.
 * @param key Identifies the data.
 * @param value Data to be saved (object, number, array, ...).
 * @param onComplete Optional callback. Receives *true* if all is ok, or *false*
 * if the operation could not be completed.
 */
declare function set(key: string, value: any, onComplete?: (ok: boolean) => void): void;
/**
 * Removes a data.
 * @param key Identifies the data.
 * @param onComplete Optional callback. Receives *true* if all is ok, or *false*
 * if the operation could not be completed.
 */
declare function remove(key: string, onComplete?: (ok: boolean) => void): void;
/**
 * Retrieves data from browser storage.
 * @param key Identifies the data.
 * @param onComplete This callback receives the retrieved data.
 */
declare function get(key: string, onComplete: (result: any) => void): void;
export { checkSupport, clear, get, remove, set };
