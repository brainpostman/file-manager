import { INodeObject, NodeObject } from '@/entities/node/model/NodeObject.class';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const FolderTreeStore = {
    initialize() {
        initiliaze();
    },
    select() {
        return select();
    },
    dispatch(nodeTree: Map<number, INodeObject>) {
        dispatch(nodeTree);
    },
    clear() {
        clear();
    },
};

function initiliaze() {
    if (!window.localStorage.getItem('folderTreeRoot')) {
        const treeMap = new Map<number, INodeObject>();
        treeMap.set(0, new NodeObject('folderTreeRoot', 'folder', null, ''));
        window.localStorage.setItem('folderTreeRoot', JSON.stringify(treeMap, replacer));
    }
}

function select(): Map<number, INodeObject> {
    return JSON.parse(window.localStorage.getItem('folderTreeRoot') ?? '', reviver);
}

function dispatch(nodeTree: Map<number, INodeObject>) {
    window.localStorage.setItem('folderTreeRoot', JSON.stringify(nodeTree, replacer));
}

function clear() {
    window.localStorage.removeItem('folderTreeRoot');
    const treeMap = new Map<number, INodeObject>();
    treeMap.set(0, new NodeObject('folderTreeRoot', 'folder', null, ''));
    window.localStorage.setItem('folderTreeRoot', JSON.stringify(treeMap, replacer));
}

function replacer(key: string, value: any) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        };
    } else if (value instanceof Set) {
        return {
            dataType: 'Set',
            value: Array.from(value.keys()),
        };
    } else {
        return value;
    }
}

function reviver(key: string, value: any) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
        if (value.dataType === 'Set') {
            return new Set(value.value);
        }
    }
    return value;
}
