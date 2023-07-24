import { FolderTreeStore } from '@/app/store/folder_tree';
import { NodePropsForm } from '@/entities/forms/NodePropsForm';
import { INodePropsFormElements } from '@/entities/forms/model/NodePropsFormElements.interface';
import { Folder, getChosenFolder, setChosenFolder } from '@/entities/node/folder/Folder';
import { NodeObject } from '@/entities/node/model/NodeObject.class';
import { sortFolderChildren } from '@/entities/node/folder/utils/sortFolderChildren';
import { Modal } from '@/shared/Modal/Modal';

const root = document.getElementById('structure-root');

document.addEventListener('click', (event) => {
    const el = event.target as Element;
    if (el.id === 'structure-root') setChosenFolder(root!);
});

function createFolder(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const elements = form.elements as INodePropsFormElements;
    let parentFolder = getChosenFolder();
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
    const listItem = document.createElement('li');
    const folder = Folder(nodeObj);
    const parentChildrenList = parentFolder?.querySelector<HTMLUListElement>('.node__children');
    if (parentChildrenList) {
        listItem.insertAdjacentElement('afterbegin', folder);
        parentChildrenList.insertAdjacentElement('beforeend', listItem);
        sortFolderChildren(parentChildrenList);
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
