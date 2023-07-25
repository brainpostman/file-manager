import FileMap from '@/app/store/file_map';
import FolderTreeStore from '@/app/store/folder_tree';
import { ensureUniqueName } from '@/entities/forms/utils/ensureUniqueName';
import { getChosenFolder } from '@/entities/node/folder/FolderElement';
import { NodeObject } from '@/entities/node/model/NodeObject.class';
import { FileElement } from '@/entities/node/file/FileElement';
import { FileUploadForm } from '@/entities/forms/FileUploadForm/FileUploadForm';
import { normalizeStringInput } from '@/entities/forms/utils/normalizeStringInput';
import { Modal } from '@/shared/Modal/Modal';
import { handleNodeAddition } from '@/entities/node/folder/utils/handleNodeAddition';
import { IFileUploadFormElements } from '@/entities/forms/FileUploadForm/model/FileUploadFormElements.interface';
import { validateNodePropsForm } from '@/entities/forms/utils/validateNodePropsForm';

function uploadFile(nodeDescr: string, file: File) {
    let parentFolder = getChosenFolder() as HTMLElement;
    const parentId = parentFolder?.dataset.objId ?? 0;
    const folderStore = FolderTreeStore.select();
    const fileMap = FileMap.select();
    const parent = folderStore.get(+parentId);
    let nodeName = file.name;
    if (parent && parent.childFiles && parent.childFolders) {
        const namesArr = Array.from(parent.childFiles.values()).concat(
            Array.from(parent.childFolders.values())
        );
        nodeName = ensureUniqueName(parent, namesArr, nodeName, 'file');
    }
    const nodeObj = new NodeObject(nodeName, 'file', +parentId, nodeDescr);
    parent?.childFiles?.set(nodeObj.id, nodeObj.name);
    fileMap.set(nodeObj.id, nodeObj);
    FileMap.dispatch(fileMap);
    FolderTreeStore.dispatch(folderStore);
    handleNodeAddition(parentFolder, +parentId, nodeObj, FileElement);
}

const showUploadForm = document.getElementById('upload-file');
const reader = new FileReader();
const form = FileUploadForm();
const elements = form.elements as IFileUploadFormElements;

const modal = Modal(form, () => {
    elements.loadfile.files = null;
    elements.nodename.value = '';
    elements.nodedescr.value = '';
});

if (showUploadForm) {
    showUploadForm.onclick = () => {
        form.onsubmit = (e: SubmitEvent) => {
            e.preventDefault();
            elements.nodename.value = normalizeStringInput(elements.nodename.value);
            elements.nodedescr.value = normalizeStringInput(elements.nodedescr.value);
            const validForm = validateNodePropsForm(form);
            if (!elements.loadfile.files || !validForm) return;
            let file = elements.loadfile.files[0];
            reader.readAsText(file);
            const fileWindow = document.getElementById('file-window');
            const fileContent = document.createElement('div');
            fileContent.className = 'file__content';
            const filePre = document.createElement('pre');
            if (!fileWindow) return;
            fileContent.append(filePre);
            reader.onload = function () {
                const filetext = reader.result?.toString() as string;
                console.log(filetext);
                filePre.textContent = filetext;
                fileWindow.append(fileContent);
                modal.remove();
            };
            reader.onerror = function () {
                console.log(reader.error);
            };
        };
        document.body.insertAdjacentElement('beforeend', modal);
    };
}
