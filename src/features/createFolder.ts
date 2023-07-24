import { FolderTreeStore } from '@/app/store/folder_tree';
import { NodePropsForm } from '@/entities/forms/NodePropsForm';
import { INodePropsFormElements } from '@/entities/forms/model/NodePropsFormElements.interface';
import {
    FolderElement,
    getChosenFolder,
    setChosenFolder,
} from '@/entities/node/folder/FolderElement';
import { NodeObject } from '@/entities/node/model/NodeObject.class';
import { sortFolderChildren } from '@/entities/node/folder/utils/sortFolderChildren';
import { Modal } from '@/shared/Modal/Modal';
import { renderChildNodes } from './renderChildNodes';
import { validateNodePropsForm } from '@/entities/forms/utils/ValidateNodePropsForm';
import { ensureUniqueName } from '@/entities/forms/utils/EnsureUniqueName';
import { NormalizeStringInput } from '@/entities/forms/utils/NormalizeStringInput';

const root = document.getElementById('structure-root');

document.addEventListener('click', (event) => {
    const el = event.target as Element;
    if (el.id === 'structure-root') setChosenFolder(root!);
});

function createFolder(nodeName: string, nodeDescr: string) {
    let parentFolder = getChosenFolder() as HTMLElement;
    const parentId = parentFolder?.dataset.objId ?? 0;
    const store = FolderTreeStore.select();
    const parent = store.get(+parentId);
    if (parent && parent.childFiles && parent.childFolders) {
        const namesArr = Array.from(parent.childFiles.values()).concat(
            Array.from(parent.childFolders.values())
        );
        nodeName = ensureUniqueName(parent, namesArr, nodeName, 'folder');
    }
    const nodeObj = new NodeObject(nodeName, 'folder', +parentId, nodeDescr);
    parent?.childFolders?.set(nodeObj.id, nodeObj.name);
    store.set(nodeObj.id, nodeObj);
    FolderTreeStore.dispatch(store);
    if (parentId !== 0) {
        const nodeExpander = parentFolder.querySelector<HTMLDivElement>('.node__expander');
        const arrow = parentFolder.querySelector<HTMLImageElement>('.arrow');
        const folderImg = parentFolder.querySelector<HTMLImageElement>('.node-icon');
        if (folderImg && arrow) {
            parentFolder.dataset.expandable = '1';
            nodeExpander?.classList.add('node__expander_expanded');
            folderImg.src = '/folder-opened.svg';
            arrow.style.visibility = 'visible';
            arrow.classList.add('arrow_open');
            renderChildNodes(+parentId);
        }
    } else {
        const listItem = document.createElement('li');
        const parentChildrenList = parentFolder?.querySelector<HTMLUListElement>('.node__children');
        const folder = FolderElement(nodeObj);
        if (parentChildrenList) {
            listItem.insertAdjacentElement('afterbegin', folder);
            parentChildrenList.insertAdjacentElement('beforeend', listItem);
            sortFolderChildren(parentChildrenList);
        }
    }
}

const showCreationForm = document.getElementById('create-folder');

if (showCreationForm) {
    showCreationForm.onclick = () => {
        const form = NodePropsForm();
        const modal = Modal(form);
        form.onsubmit = (e: SubmitEvent) => {
            e.preventDefault();
            const elements = form.elements as INodePropsFormElements;
            elements.nodename.value = NormalizeStringInput(elements.nodename.value);
            elements.nodedescr.value = NormalizeStringInput(elements.nodedescr.value);
            const validForm = validateNodePropsForm(form);
            if (validForm) {
                createFolder(elements.nodename.value, elements.nodedescr.value);
                modal.remove();
            } else {
                elements.nodename.setCustomValidity('Некорректное название');
                return;
            }
        };
        document.body.insertAdjacentElement('beforeend', modal);
    };
}
