import FolderTreeStore from '@/app/store/folder_map';
import { NodePropsForm } from '@/entities/forms/NodePropsForm/NodePropsForm';
import { INodePropsFormElements } from '@/entities/forms/NodePropsForm/model/NodePropsFormElements.interface';
import {
    FolderElement,
    getChosenFolder,
    setChosenFolder,
} from '@/entities/node/folder/FolderElement';
import { NodeObject } from '@/entities/node/model/NodeObject.class';
import { sortFolderChildren } from '@/entities/node/folder/utils/sortFolderChildren';
import { Modal } from '@/shared/Modal/Modal';
import { renderChildNodes } from './renderChildNodes';
import { ensureUniqueName } from '@/entities/forms/utils/ensureUniqueName';
import { normalizeStringInput } from '@/entities/forms/utils/normalizeStringInput';
import { validateNodePropsForm } from '@/entities/forms/utils/validateNodePropsForm';
import { handleElementAddition } from '@/entities/node/folder/utils/handleElementAddition';

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
    handleElementAddition(parentFolder, +parentId, nodeObj, FolderElement);
}

const createFolderBtn = document.getElementById('create-folder');

const form = NodePropsForm();
const elements = form.elements as INodePropsFormElements;
const modal = Modal(form, () => {
    form.reset();
});

if (createFolderBtn) {
    createFolderBtn.onclick = () => {
        form.onsubmit = (e: SubmitEvent) => {
            e.preventDefault();
            elements.nodename.value = normalizeStringInput(elements.nodename.value);
            elements.nodedescr.value = normalizeStringInput(elements.nodedescr.value);
            const validForm = validateNodePropsForm(form);
            if (!validForm) return;
            createFolder(elements.nodename.value, elements.nodedescr.value);
            form.reset();
            modal.remove();
        };
        document.body.insertAdjacentElement('beforeend', modal);
    };
}
