import { INodeObject, NodeObject } from '@/entities/node/model/NodeObject.class';

let nodeObjId = 0;

export function getNodeObjId() {
    return nodeObjId++;
}

function setNodeObjId(num: string) {
    nodeObjId = +num;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const FolderTreeStore = {
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

export default FolderTreeStore;

function initiliaze() {
    if (!window.localStorage.getItem('nodeObjId')) {
        window.localStorage.setItem('nodeObjId', '0');
        setNodeObjId('0');
    } else {
        setNodeObjId(window.localStorage.getItem('nodeObjId')!);
    }
    if (!window.localStorage.getItem('folderTreeRoot')) {
        const treeMap = new Map<number, INodeObject>();
        const rootNode = new NodeObject('folderTreeRoot', 'folder', null, '');
        treeMap.set(rootNode.id, rootNode);
        window.localStorage.setItem('folderTreeRoot', JSON.stringify(treeMap, replacer));
    }
}

function select(): Map<number, INodeObject> {
    return JSON.parse(window.localStorage.getItem('folderTreeRoot') ?? '', reviver);
}

function dispatch(nodeTree: Map<number, INodeObject>) {
    window.localStorage.setItem('folderTreeRoot', JSON.stringify(nodeTree, replacer));
    window.localStorage.setItem('nodeObjId', nodeObjId + '');
}

function clear() {
    const treeMap = new Map<number, INodeObject>();
    const rootNode = new NodeObject('folderTreeRoot', 'folder', null, '');
    treeMap.set(rootNode.id, rootNode);
    window.localStorage.setItem('folderTreeRoot', JSON.stringify(treeMap, replacer));
    window.localStorage.setItem('nodeObjId', '0');
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
