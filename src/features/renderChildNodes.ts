import { FileMap } from '@/app/store/file_map';
import { FolderTreeStore } from '@/app/store/folder_tree';
import { FileElement } from '@/entities/node/FileElement';
import { FolderElement } from '@/entities/node/folder/FolderElement';
import { sortFolderChildren } from '@/entities/node/folder/utils/sortFolderChildren';

let root = document.getElementById('structure-root') as HTMLElement;

export function renderChildNodes(folderObjId: number) {
    const folderElement =
        folderObjId === 0
            ? root
            : root?.querySelector<HTMLElement>(`.folder[data-obj-id="${folderObjId!}"]`);
    const folderStore = FolderTreeStore.select();
    const fileMap = FileMap.select();
    const folderObj = folderStore.get(folderObjId)!;
    const list = folderElement?.querySelector<HTMLUListElement>('.node__children');
    if (list) list.innerHTML = '';
    folderObj.childFolders?.forEach((id) => {
        const element = FolderElement(folderStore.get(id)!);
        const li = document.createElement('li');
        li.append(element);
        list?.insertAdjacentElement('beforeend', li);
    });
    folderObj.childFiles?.forEach((id) => {
        const element = FileElement(fileMap.get(id)!);
        const li = document.createElement('li');
        li.append(element);
        list?.insertAdjacentElement('beforeend', li);
    });
    sortFolderChildren(list!);
}
