import { setChosenNode } from '..';
import { setChosenFolder } from '../folder/FolderElement';
import { INodeObject } from '../model/NodeObject.class';
import { NodeDescription } from '../node_description/NodeDescription';

let chosenFile: HTMLElement | null = null;

export const getChosenFile = () => {
    return chosenFile;
};

export const setChosenFile = (el: HTMLElement | null) => {
    if (!el) {
        chosenFile = null;
        return;
    }
    const parent = el.closest<HTMLElement>('.folder');
    if (parent) setChosenFolder(parent);
    chosenFile = el;
    console.log('chosen file', el);
    console.log('chosen parent', parent);
};

export function FileElement(nodeObj: INodeObject) {
    const file = document.createElement('article');
    file.className += 'node file';
    file.innerHTML = `<div class="node__heading" tabindex="-1">
                        <img src="/file.svg" class="node-icon" />
                        <h3 class="node__name">
                        </h3>
                    </div>`;
    file.title = nodeObj.descr;
    file.dataset.objId = String(nodeObj.id);
    const nodeName = file.querySelector('.node__name');
    if (nodeName) {
        nodeName.textContent = nodeObj.name;
    }
    const nodeHeading = file.querySelector<HTMLDivElement>('.node__heading');
    if (nodeHeading) {
        NodeDescription(nodeHeading, nodeObj.descr);
        nodeHeading.tabIndex = -1;
        nodeHeading.onfocus = () => {
            setChosenFile(file);
            setChosenNode(file);
        };
    }
    return file;
}
