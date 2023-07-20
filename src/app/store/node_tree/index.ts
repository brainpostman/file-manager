import { INodeObject, NodeObject } from '../../../entities/node/model/NodeObject.class';

export const NodeTreeStore = {
    initialize() {
        initiliaze();
    },
    select() {
        return select();
    },
    dispatch(nodeObj: INodeObject) {
        dispatch(nodeObj);
    },
    clear() {
        clear();
    },
};

function initiliaze() {
    if (!window.localStorage.getItem('nodeTreeRoot')) {
        window.localStorage.setItem(
            'node-tree-root',
            JSON.stringify(new NodeObject('nodeTreeRoot', 'folder', null, ''))
        );
    }
}

function select() {
    return window.localStorage.getItem('nodeTreeRoot');
}

function dispatch(nodeObj: INodeObject) {
    window.localStorage.setItem('nodeTreeRoot', JSON.stringify(nodeObj));
}

function clear() {
    window.localStorage.setItem(
        'node-tree-root',
        JSON.stringify(new NodeObject('nodeTreeRoot', 'folder', null, ''))
    );
}
