import { INodeObject } from '@/entities/node/model/NodeObject.class';
import { setChosenFileContent } from '../FileContent/FileContent';

let chosenTab: HTMLElement | null = null;

const tabList = document.getElementById('tabs');
const fileWindow = document.getElementById('file-window');

export function getChosenTab() {
    return chosenTab;
}

export function setChosenTab(el: HTMLElement | null) {
    if (chosenTab) {
        chosenTab.classList.remove('tab_active');
    }
    el?.classList.add('tab_active');
    chosenTab = el;
}

export function FileTab(nodeObj: INodeObject) {
    const fileTab = document.createElement('article');
    fileTab.className += 'tab';
    const close = document.createElement('img');
    close.className = 'file__close';
    close.src = '/close.svg';
    close.alt = 'X';
    fileTab.textContent = nodeObj.name;
    fileTab.append(close);
    fileTab.dataset.objId = String(nodeObj.id);
    fileTab.onclick = () => {
        console.log('click', fileTab);
        const fileContent = document.querySelector<HTMLDivElement>(
            `.file__content[data-obj-id="${nodeObj.id}"]`
        );
        setChosenTab(fileTab);
        setChosenFileContent(fileContent);
    };
    close.onclick = (e) => {
        e.stopPropagation();
        const fileContent = document.querySelector<HTMLDivElement>(
            `.file__content[data-obj-id="${nodeObj.id}"]`
        );
        fileTab.remove();
        fileContent?.remove();
        if (!tabList || !fileWindow) return;
        const nextTab = tabList.querySelector<HTMLElement>('.tab');
        setChosenTab(nextTab);
        nextTab?.dispatchEvent(new Event('click'));
    };
    return fileTab;
}
