import { renderChildNodes } from '@/features/renderChildNodes';
import { INodeObject } from '../../model/NodeObject.class';
import { sortFolderChildren } from './sortFolderChildren';
import { basePath } from '@/app/main';

export function handleElementAddition(
    parentFolder: HTMLElement,
    parentId: number,
    newNode: INodeObject,
    nodeCreationCallback: (node: INodeObject) => HTMLElement
) {
    if (parentId !== 0) {
        const nodeExpander = parentFolder.querySelector<HTMLDivElement>('.node__expander');
        const arrow = parentFolder.querySelector<HTMLImageElement>('.arrow');
        const folderImg = parentFolder.querySelector<HTMLImageElement>('.node-icon');
        if (folderImg && arrow) {
            parentFolder.dataset.expandable = '1';
            nodeExpander?.classList.add('node__expander_expanded');
            folderImg.src = `${basePath}/folder-opened.svg`;
            arrow.style.visibility = 'visible';
            arrow.classList.add('arrow_open');
            renderChildNodes(+parentId);
        }
    } else {
        const listItem = document.createElement('li');
        const parentChildrenList = parentFolder?.querySelector<HTMLUListElement>('.node__children');
        const node = nodeCreationCallback(newNode);
        if (parentChildrenList) {
            listItem.insertAdjacentElement('afterbegin', node);
            parentChildrenList.insertAdjacentElement('beforeend', listItem);
            sortFolderChildren(parentChildrenList);
        }
    }
}
