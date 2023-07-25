import { INodeObject } from '../../model/NodeObject.class';

export function deleteFolderBranch(
    node: INodeObject,
    folderStore: Map<number, INodeObject>,
    fileStore: Map<number, INodeObject>
) {
    if (node.childFiles) {
        node.childFiles?.forEach((_name, id) => {
            fileStore.delete(id);
            //TODO: delete actual files;
        });
    }
    if (!node.childFolders) return;
    node.childFolders?.forEach((_name, id) => {
        const childFolder = folderStore.get(id)!;
        deleteFolderBranch(childFolder, fileStore, folderStore);
        folderStore.delete(id);
    });
}
