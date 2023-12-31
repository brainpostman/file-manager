import { INodeObject } from '@/entities/node/model/NodeObject.class';

/* eslint-disable @typescript-eslint/no-explicit-any */
const FileMap = {
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

export default FileMap;

function initiliaze() {
    if (!window.localStorage.getItem('fileMap')) {
        const fileMap = new Map<number, INodeObject>();
        window.localStorage.setItem('fileMap', JSON.stringify(fileMap, replacer));
    }
}

function select(): Map<number, INodeObject> {
    return JSON.parse(window.localStorage.getItem('fileMap') ?? '', reviver);
}

function dispatch(nodeTree: Map<number, INodeObject>) {
    window.localStorage.setItem('fileMap', JSON.stringify(nodeTree, replacer));
}

function clear() {
    window.localStorage.removeItem('fileMap');
    const fileMap = new Map<number, INodeObject>();
    window.localStorage.setItem('fileMap', JSON.stringify(fileMap, replacer));
}

function replacer(_key: string, value: any) {
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

function reviver(_key: string, value: any) {
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
