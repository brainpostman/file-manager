import FileDatabase from '@/app/store/file_db';
import FileMap from '@/app/store/file_map';
import FolderTreeStore from '@/app/store/folder_map';
import { getChosenFolder, setChosenFolder } from '@/entities/node/folder/FolderElement';
import { deleteFolderBranch } from '@/entities/node/folder/utils/deleteFolderBranch';

const root = document.getElementById('structure-root') as HTMLElement;

function deleteFolder() {
    let folder = getChosenFolder();
    if (!folder) return;
    const folderId = +(folder.dataset.objId ?? 0);
    if (folderId === 0) return;
    const listItem = folder?.parentElement;
    const folderStore = FolderTreeStore.select();
    const fileMap = FileMap.select();
    const folderNodeObj = folderStore.get(folderId)!;
    const fileStore = FileDatabase.getFileStore('readwrite');
    deleteFolderBranch(folderNodeObj, folderStore, fileMap, fileStore);
    const parentId = folderNodeObj.parentId;
    const parent = folderStore.get(parentId!);
    parent?.childFolders?.delete(folderId);
    folderStore.delete(folderId);
    FileMap.dispatch(fileMap);
    FolderTreeStore.dispatch(folderStore);
    const parentElement =
        parentId === 0
            ? root
            : root?.querySelector<HTMLElement>(`.folder[data-obj-id="${parentId!}"]`);
    setChosenFolder(parentElement ?? root);
    listItem?.remove();
}

const deleteFolderBtn = document.getElementById('delete-folder');

if (deleteFolderBtn) {
    deleteFolderBtn.onclick = () => {
        deleteFolder();
    };
}
