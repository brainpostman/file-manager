import FileDatabase from '@/app/store/file_db';
import FileMap from '@/app/store/file_map';
import FolderTreeStore from '@/app/store/folder_map';
import { getChosenFile, setChosenFile } from '@/entities/node/file/FileElement';

function deleteFile() {
    let file = getChosenFile();
    if (!file) return;
    const fileId = +(file.dataset.objId as string);
    const listItem = file?.parentElement;
    listItem?.remove();
    const folderStore = FolderTreeStore.select();
    const fileMap = FileMap.select();
    const fileStore = FileDatabase.getFileStore('readwrite');
    FileDatabase.deleteFile(fileId, fileStore);
    const fileNodeObj = fileMap.get(fileId)!;
    const parentId = fileNodeObj.parentId;
    const parent = folderStore.get(parentId!);
    parent?.childFiles?.delete(fileId);
    fileMap.delete(fileId);
    FileMap.dispatch(fileMap);
    FolderTreeStore.dispatch(folderStore);
    setChosenFile(null);
}

const clickDeleteFileBtn = document.getElementById('delete-file');

if (clickDeleteFileBtn) {
    clickDeleteFileBtn.onclick = () => {
        deleteFile();
    };
}
