import { NodeDescription } from '../../NodeDescription';
import { INodeObject } from '../../model/NodeObject.class';

let chosenFolder = document.getElementById('structure-root');

export const getChosenFolder = () => {
    return chosenFolder;
};

export const setChosenFolder = (el: HTMLElement) => {
    chosenFolder = el;
};

const mutationCb = (records: MutationRecord[]) => {
    if (records[0].type !== 'childList') return;
    const children = records[0].target as HTMLUListElement;
    const folder = children.closest<HTMLElement>('.folder');
    const arrow = folder?.querySelector<HTMLImageElement>('.arrow');
    if (!arrow || !children || !folder) return;
    if (children.childElementCount > 0) {
        arrow.style.visibility = 'visible';
        folder.dataset.expandable = '1';
    } else {
        arrow.style.visibility = 'hidden';
        folder.dataset.expandable = '0';
    }
};

const mutObs = new MutationObserver(mutationCb);

export function Folder(nodeObj: INodeObject): HTMLElement {
    const folder = document.createElement('article');
    folder.className += 'node folder';
    folder.innerHTML = `<div class="node__heading">
                            <img src="/folder-arrow.svg" class="arrow" />
                            <img src="/folder.svg" class="node-icon" />
                            <h3 class="node__name">
                            </h3>
                        </div>
                        <div class="node__expander">
                            <ul class="node__children">
                            </ul>
                        </div>`;
    folder.dataset.objId = String(nodeObj.id);
    folder.dataset.expandable = '0';
    const nodeName = folder.querySelector<HTMLHeadingElement>('.node__name');
    if (nodeName) {
        nodeName.textContent = nodeObj.name;
    }

    const nodeHeading = folder.querySelector<HTMLDivElement>('.node__heading');
    if (nodeHeading) {
        NodeDescription(nodeHeading, nodeObj.descr);
        nodeHeading.tabIndex = -1;
        nodeHeading.onfocus = () => {
            setChosenFolder(folder);
            console.log(getChosenFolder());
        };
        const nodeExpander = folder.querySelector<HTMLDivElement>('.node__expander');
        const arrow = folder.querySelector<HTMLImageElement>('.arrow');
        const folderImg = folder.querySelector<HTMLImageElement>('.node-icon');
        nodeHeading.onclick = () => {
            if (folder.dataset.expandable !== '1') return;
            if (!folderImg) return;
            if (nodeExpander?.classList.contains('node__expander_expanded')) {
                nodeExpander.classList.remove('node__expander_expanded');
                folderImg.src = '/folder.svg';
                arrow?.classList.remove('arrow_open');
            } else {
                nodeExpander?.classList.add('node__expander_expanded');
                folderImg.src = '/folder-opened.svg';
                arrow?.classList.add('arrow_open');
            }
        };
    }

    const children = folder.querySelector<HTMLUListElement>('.node__children');
    if (children) {
        mutObs.observe(children, { childList: true, subtree: false });
    }

    return folder;
}
