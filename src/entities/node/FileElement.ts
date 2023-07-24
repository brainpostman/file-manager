import { INodeObject } from './model/NodeObject.class';

export function FileElement(nodeObj: INodeObject) {
    const file = document.createElement('article');
    file.className += 'node file';
    file.innerHTML = `<div class="node__heading" tabindex="-1">
                        <img src="/file.svg" class="node-icon" />
                        <h3 class="node__name">
                        </h3>
                    </div>`;
    file.title = nodeObj.descr;
    const nodeName = file.querySelector('.node__name');
    if (nodeName) {
        nodeName.textContent = nodeObj.name;
    }
    return file;
}
