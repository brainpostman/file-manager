import FileDatabase from '@/app/store/file_db';
import { INodeObject } from '../../model/NodeObject.class';

export function deleteFolderBranch(
    node: INodeObject,
    folderStore: Map<number, INodeObject>,
    fileMap: Map<number, INodeObject>,
    fileStore: IDBObjectStore
) {
    if (node.childFiles) {
        node.childFiles?.forEach((_name, id) => {
            fileMap.delete(id);
            FileDatabase.deleteFile(id, fileStore);
        });
    }
    if (!node.childFolders) return;
    node.childFolders?.forEach((_name, id) => {
        const childFolder = folderStore.get(id)!;
        deleteFolderBranch(childFolder, fileMap, folderStore, fileStore);
        folderStore.delete(id);
    });
}
