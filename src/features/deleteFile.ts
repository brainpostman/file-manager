import FileDatabase from '@/app/store/file_db';
import FileMap from '@/app/store/file_map';
import FolderTreeStore from '@/app/store/folder_map';
import { getChosenFile, setChosenFile } from '@/entities/node/file/FileElement';

function deleteFile() {
    let file = getChosenFile();
    if (!file) return;
    const fileId = +(file.dataset.objId as string);
    const listItem = file?.parentElement;
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
    listItem?.remove();
}

const deleteFileBtn = document.getElementById('delete-file');

if (deleteFileBtn) {
    deleteFileBtn.onclick = () => {
        deleteFile();
    };
}
