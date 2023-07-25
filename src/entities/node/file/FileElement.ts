import { FileTab, setChosenTab } from '@/entities/file_viewer/FileTab/FileTab';
import { setChosenNode } from '..';
import { setChosenFolder } from '../folder/FolderElement';
import { INodeObject } from '../model/NodeObject.class';
import { NodeDescription } from '../node_description/NodeDescription';
import { FileContent, setChosenFileContent } from '@/entities/file_viewer/FileContent/FileContent';

let chosenFile: HTMLElement | null = null;

const tabList = document.getElementById('tabs');
const fileWindow = document.getElementById('file-window');

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

export function FileElement(fileNodeObj: INodeObject) {
    const file = document.createElement('article');
    file.className += 'node file';
    file.innerHTML = `<div class="node__heading" tabindex="-1">
                        <img src="/file.svg" class="node-icon" />
                        <h3 class="node__name">
                        </h3>
                    </div>`;
    file.dataset.objId = String(fileNodeObj.id);
    const nodeName = file.querySelector('.node__name');
    if (nodeName) {
        nodeName.textContent = fileNodeObj.name;
    }
    const nodeHeading = file.querySelector<HTMLDivElement>('.node__heading');
    if (nodeHeading) {
        NodeDescription(nodeHeading, fileNodeObj.descr);
        nodeHeading.tabIndex = -1;
        nodeHeading.onfocus = () => {
            setChosenFile(file);
            setChosenNode(file);
        };
        nodeHeading.ondblclick = () => {
            if (!tabList || !fileWindow) return;
            const optionalTab = tabList.querySelector<HTMLElement>(
                `.tab[data-obj-id="${fileNodeObj.id}"]`
            );
            const optionalContent = fileWindow.querySelector<HTMLDivElement>(
                `.file__content[data-obj-id="${fileNodeObj.id}"]`
            );
            if (optionalTab && optionalContent) {
                setChosenTab(optionalTab);
                setChosenFileContent(optionalContent);
            } else {
                const fileTab = FileTab(fileNodeObj);
                const fileContent = FileContent(fileNodeObj.id);
                tabList.prepend(fileTab);
                fileWindow.prepend(fileContent);
                setChosenTab(fileTab);
                setChosenFileContent(fileContent);
            }
        };
    }
    return file;
}
