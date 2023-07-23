import { NodeTreeStore } from '@/app/store/node_tree';
import { NodePropsForm } from '@/entities/forms/NodePropsForm';
import { INodePropsFormElements } from '@/entities/forms/model/NodePropsFormElements.interface';
import { Folder, getChosenFolder } from '@/entities/node/folder/utils/Folder';
import { NodeObject } from '@/entities/node/model/NodeObject.class';
import { sortFolderChildren } from '@/entities/node/folder/utils/sortFolderChildren';
import { Modal } from '@/shared/Modal/Modal';

export function createFolder(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const elements = form.elements as INodePropsFormElements;
    let parentFolder = getChosenFolder();
    const parentId = parentFolder?.dataset.objId ?? 0;
    const store = NodeTreeStore.select();
    const parent = store.get(+parentId);
    const nodeObj = new NodeObject(
        elements['node-name'].value,
        'folder',
        parent!,
        elements['node-descr'].value
    );
    parent?.children?.add(nodeObj.id);
    store.set(nodeObj.id, nodeObj);
    NodeTreeStore.dispatch(store);
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

const clearBd = document.getElementById('clear-bd');

if (clearBd) {
    clearBd.onclick = () => {
        window.localStorage.clear();
        location.reload();
    };
}
