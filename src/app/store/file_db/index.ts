/* eslint-disable @typescript-eslint/no-explicit-any */
let db!: IDBDatabase;

function openDb() {
    const request = indexedDB.open('file_db', 1);
    request.onerror = (err) => console.error(`IndexedDB error: ${request.error}`, err);
    request.onsuccess = () => (db = request.result);
    request.onupgradeneeded = () => {
        const db = request.result;
        const fileStore = db.createObjectStore('fileStore', { keyPath: 'id' });
    };
    return db;
}
