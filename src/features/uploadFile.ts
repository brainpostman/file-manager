import FileMap from '@/app/store/file_map';
import FolderTreeStore from '@/app/store/folder_map';
import { ensureUniqueName } from '@/entities/forms/utils/ensureUniqueName';
import { getChosenFolder } from '@/entities/node/folder/FolderElement';
import { NodeObject } from '@/entities/node/model/NodeObject.class';
import { FileElement } from '@/entities/node/file/FileElement';
import { FileUploadForm } from '@/entities/forms/FileUploadForm/FileUploadForm';
import { normalizeStringInput } from '@/entities/forms/utils/normalizeStringInput';
import { Modal } from '@/shared/Modal/Modal';
import { handleElementAddition } from '@/entities/node/folder/utils/handleElementAddition';
import { IFileUploadFormElements } from '@/entities/forms/FileUploadForm/model/FileUploadFormElements.interface';
import { validateNodePropsForm } from '@/entities/forms/utils/validateNodePropsForm';
import FileDatabase from '@/app/store/file_db';
import { FileStorageObject } from '@/entities/node/file/model/FileStorageObject.class';

function uploadFile(nodeName: string, nodeDescr: string, file: File) {
    let parentFolder = getChosenFolder() as HTMLElement;
    const parentId = parentFolder?.dataset.objId ?? 0;
    const folderStore = FolderTreeStore.select();
    const fileMap = FileMap.select();
    const parent = folderStore.get(+parentId);
    const fileStore = FileDatabase.getFileStore('readwrite');
    if (parent && parent.childFiles && parent.childFolders) {
        const namesArr = Array.from(parent.childFiles.values()).concat(
            Array.from(parent.childFolders.values())
        );
        nodeName = ensureUniqueName(parent, namesArr, nodeName, 'file');
    }
    const nodeObj = new NodeObject(nodeName, 'file', +parentId, nodeDescr);
    const fileStorageObj = new FileStorageObject(nodeObj.id, file);
    FileDatabase.addFile(fileStorageObj, fileStore);
    parent?.childFiles?.set(nodeObj.id, nodeObj.name);
    fileMap.set(nodeObj.id, nodeObj);
    FileMap.dispatch(fileMap);
    FolderTreeStore.dispatch(folderStore);
    handleElementAddition(parentFolder, +parentId, nodeObj, FileElement);
}

const showUploadForm = document.getElementById('upload-file');
const form = FileUploadForm();
const elements = form.elements as IFileUploadFormElements;

const modal = Modal(form, () => {
    form.reset();
});

if (showUploadForm) {
    showUploadForm.onclick = () => {
        form.onsubmit = (e: SubmitEvent) => {
            e.preventDefault();
            elements.nodename.value = normalizeStringInput(elements.nodename.value);
            elements.nodedescr.value = normalizeStringInput(elements.nodedescr.value);
            const validForm = validateNodePropsForm(form);
            if (!validForm) return;

            if (!elements.loadfile.files || !elements.loadfile.files[0]) {
                return;
            }
            let file = elements.loadfile.files[0];
            console.log(file);
            uploadFile(elements.nodename.value, elements.nodedescr.value, file);
            form.reset();
            modal.remove();
        };
        document.body.insertAdjacentElement('beforeend', modal);
    };
}
