import { IFileStorageObject } from '@/entities/node/file/model/FileStorageObject.class';

/* eslint-disable @typescript-eslint/no-explicit-any */
let db!: IDBDatabase;

const FileDatabase = {
    openDb() {
        openDb();
    },
    deleteDatabase() {
        deleteDatabase();
    },
    getFileStore(mode: IDBTransactionMode) {
        return getFileStore(mode);
    },
    clearFileStore() {
        clearFileStore();
    },
    addFile(fileObj: IFileStorageObject, store: IDBObjectStore) {
        addFile(fileObj, store);
    },
    getFile(
        id: number,
        store: IDBObjectStore,
        successCallback: (file: IFileStorageObject) => void
    ) {
        getFile(id, store, successCallback);
    },
    deleteFile(id: number, store: IDBObjectStore) {
        deleteFile(id, store);
    },
};

export default FileDatabase;

function openDb() {
    console.log('openDb ...');
    let req = indexedDB.open('filedb', 1);
    req.onsuccess = (_e: any) => {
        db = req.result;
        console.log('openDb success');
    };
    req.onerror = (_e: any) => {
        console.error('openDb:', req.error);
    };

    req.onupgradeneeded = (_e) => {
        console.log('openDb.onupgradeneeded');
        req.result.createObjectStore('files', {
            keyPath: 'id',
        });
    };
}

function getFileStore(mode: IDBTransactionMode) {
    let tx = db.transaction('files', mode);
    tx.oncomplete = () => {
        console.log('getFileStore complete');
    };
    tx.onerror = (_e: any) => {
        console.error(`getFileStore ${mode}:`, tx.error);
    };
    return tx.objectStore('files');
}

function clearFileStore() {
    let store = getFileStore('readwrite');
    let req = store.clear();
    req.onsuccess = (_e) => {
        console.log('clearFileStore success');
    };
    req.onerror = (_e: any) => {
        console.error('clearFileStore:', req.error);
    };
}

function deleteDatabase() {
    let req = indexedDB.deleteDatabase('filedb');
    req.onsuccess = () => {
        console.log('deleteDatabase success');
    };
    req.onerror = (_e: any) => {
        console.log('deleteDatabase:', req.error);
    };
}

function addFile(fileObj: IFileStorageObject, store: IDBObjectStore) {
    let req = store.add(fileObj);
    req.onsuccess = (_e) => {
        console.log('addFile success');
    };
    req.onerror = (_e: any) => {
        console.error('addFile:', req.error);
    };
}

function getFile(
    id: number,
    store: IDBObjectStore,
    successCallback: (file: IFileStorageObject) => void
) {
    let req = store.get(id);
    req.onsuccess = (_e: any) => {
        let value = req.result as IFileStorageObject;
        if (value) successCallback(value);
        console.log('getFile success');
    };
    req.onerror = (_e: any) => {
        console.error('getFile:', req.error);
    };
}

function deleteFile(id: number, store: IDBObjectStore) {
    let req = store.delete(id);
    req.onsuccess = (_e: any) => {
        console.log('deleteFile success');
    };
    req.onerror = (_e: any) => {
        console.error('deleteFile:', req.error);
    };
}
