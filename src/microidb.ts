
const DB_NAME = 'microiDB';
const STORE_NAME = 'microObjStore';
const VOID = () => { };

let db: IDBDatabase = null;
let isIdle = true;
let tasks: { fn: (key: string, value: boolean | any, callback: (res: any) => void) => void, key: string, value: any, onComplete: (res: any) => void }[] = [];



//// PUBLIC API
/////////////////////////////

/**
 * Checks if we can use microIDB in this system.
 * @returns microIDB is supported in this browser?
 */
function checkSupport(): boolean {

    if (window && !window.indexedDB) {
        return false;
    }

    const agent = navigator.userAgent.toLowerCase();
    const regex = new RegExp(/.+(ipod|iphone|ipad|macintosh).+version\/.+safari.+/);
    let isSupported = true;


    // Some Safari versions with indexedDB support has important bugs: https://caniuse.com/?search=indexedDB
    if (regex.test(agent) && agent.indexOf('edgios') == -1) {
        if (getBrowserVersion(agent, 'version/', 2) < 10 || agent.indexOf('version/14.1') > -1) {
            isSupported = false;
        }
    }

    return isSupported;
}



/**
 * Removes all stored data.
 * @param onComplete Optional callback. Receives *true* if all is ok, or *false* 
 * if the operation could not be completed.
 */
function clear(onComplete: (ok: boolean) => void = VOID) {
    let task = { fn: execClear, key: null, value: null, onComplete: onComplete };
    tasks.push(task);
    if (isIdle) {
        checkTask();
    }
}



/**
 * Checks for key existence.
 * @param key The key to check.
 * @param onComplete This callback receives true if the key is present in the database.
 */
function exists(key: string, onComplete: (exists: boolean) => void) {
    let task = { fn: execExists, key: key, value: null, onComplete: onComplete };
    tasks.push(task);
    if (isIdle) {
        checkTask();
    }
}



/**
 * Retrieves data from browser storage.
 * @param key Identifies the data.
 * @param onComplete This callback receives the retrieved data.
 */
function get(key: string, onComplete: (result: any) => void) {
    let task = { fn: execGet, key: key, value: null, onComplete: onComplete };
    tasks.push(task);
    if (isIdle) {
        checkTask();
    }
}



/**
 * Removes a data.
 * @param key Identifies the data.
 * @param onComplete Optional callback. Receives *true* if all is ok, or *false* 
 * if the operation could not be completed.
 */
function remove(key: string, onComplete: (ok: boolean) => void = VOID) {
    let task = { fn: execRemove, key: key, value: null, onComplete: onComplete };
    tasks.push(task);
    if (isIdle) {
        checkTask();
    }
}



/**
 * Stores data in the browser storage.
 * @param key Identifies the data.
 * @param value Data to be saved (object, number, array, ...).
 * @param onComplete Optional callback. Receives *true* if all is ok, or *false* 
 * if the operation could not be completed.
 */
function set(key: string, value: any, onComplete: (ok: boolean) => void = VOID) {
    let task = { fn: execSet, key: key, value: value, onComplete: onComplete };
    tasks.push(task);
    if (isIdle) {
        checkTask();
    }
}





//// PRIVATE FUNCTIONS
///////////////////////////////

async function checkTask() {
    let task = tasks.shift();
    let ok = true;

    if (!task) {
        isIdle = true;
        return;
    }

    isIdle = false;

    if (!db) {
        ok = await open();
        if (!ok) {
            task.onComplete(false);
            console.error('Error opening database');
            return;
        }
    }

    if (db.objectStoreNames.length == 0) {
        ok = await createStore();
        if (!ok) {
            task.onComplete(false);
            console.error('Error opening objectStore');
            return;
        }
    }

    task.fn(task.key, task.value, task.onComplete);
} // end checkTask()



function createStore(): Promise<boolean> {

    let version;
    version = db.version;
    db.close();

    const req = window.indexedDB.open(DB_NAME, version + 1);

    return new Promise((r) => {

        req.onupgradeneeded = () => {
            db = req.result;
            try {
                db.createObjectStore(STORE_NAME);
            } catch (e) {
                r(false);
            }

        };

        req.onsuccess = () => {
            r(true);
        }

    });
} // end createStore()



async function execClear(key: string, value: any, onComplete: (res: boolean) => any = VOID) {

    const tr = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).clear();

    tr.onerror = () => {
        onComplete(false);
        checkTask();
    }

    tr.onsuccess = () => {
        onComplete(true);
        checkTask();
    }
} // end execClear()



async function execExists(key: string, value: any, onComplete: (res: boolean) => any = VOID) {

    const tr = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).count(key);

    tr.onerror = () => {
        onComplete(false);
        checkTask();
    }

    tr.onsuccess = () => {
        onComplete(tr.result > 0);
        checkTask();
    }
} // end execExist()



async function execGet(key: string, value: any, onComplete: (res: any) => void = VOID) {

    const tr = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key);

    tr.onsuccess = () => {
        onComplete(tr.result);
        checkTask();
    };

    tr.onerror = () => {
        onComplete(false);
        checkTask();
    };
} // end execGet()



async function execRemove(key: string, value: any, onComplete: (res: any) => void = VOID) {

    const tr = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(key);

    tr.onsuccess = () => {
        onComplete(true);
        checkTask();
    };

    tr.onerror = () => {
        onComplete(false);
        checkTask();
    };
} // end execRemove()



async function execSet(key: string, value: any, onComplete: (res: boolean) => any = VOID) {

    const tr = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(value, key);

    tr.onerror = () => {
        onComplete(false);
        checkTask();
    }

    tr.onsuccess = () => {
        onComplete(true);
        checkTask();
    }
} // end execSet()



function getBrowserVersion(agent: string, mark: string, length: number): number {
    agent = agent.toLowerCase();
    let posX = agent.indexOf(mark) + mark.length;
    if (posX < mark.length) {
        return 0;
    }
    return parseInt(agent.substring(posX, posX + length));
}



function open(): Promise<boolean> {

    let req = indexedDB.open(DB_NAME);

    return new Promise((resolve) => {

        req.onerror = () => {
            return resolve(false);
        }

        req.onsuccess = async () => {
            db = req.result;
            resolve(true);
        }

        req.onblocked = () => {
            resolve(false);
        }

    });
} // end open()



export { checkSupport, clear, exists, get, remove, set }
