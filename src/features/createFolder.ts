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

const root = document.getElementById('structure-root');

document.addEventListener('click', (event) => {
    const el = event.target as Element;
    if (el.id === 'structure-root') setChosenFolder(root!);
});

function createFolder(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const elements = form.elements as INodePropsFormElements;
    let parentFolder = getChosenFolder() as HTMLElement;
    const parentId = parentFolder?.dataset.objId ?? 0;
    const store = FolderTreeStore.select();
    const parent = store.get(+parentId);
    const nodeObj = new NodeObject(
        elements['node-name'].value,
        'folder',
        +parentId,
        elements['node-descr'].value
    );
    parent?.childFolders?.add(nodeObj.id);
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
        const form = NodePropsForm(createFolder);
        const modal = Modal(form);
        form.addEventListener('submit', () => {
            modal.remove();
        });
        document.body.insertAdjacentElement('beforeend', modal);
    };
}
