import FileMap from '@/app/store/file_map';
import FolderTreeStore from '@/app/store/folder_map';
import { NodePropsForm } from '@/entities/forms/NodePropsForm/NodePropsForm';
import { INodePropsFormElements } from '@/entities/forms/NodePropsForm/model/NodePropsFormElements.interface';
import { normalizeStringInput } from '@/entities/forms/utils/normalizeStringInput';
import { validateNodePropsForm } from '@/entities/forms/utils/validateNodePropsForm';
import { getChosenNode } from '@/entities/node';
import { INodeObject } from '@/entities/node/model/NodeObject.class';
import { NodeDescription } from '@/entities/node/node_description/NodeDescription';
import { Modal } from '@/shared/Modal/Modal';

const tabList = document.getElementById('tabs');

function updateFileProps(
    fileElement: HTMLElement,
    fileNodeObj: INodeObject,
    fileMap: Map<number, INodeObject>,
    folderStore: Map<number, INodeObject>,
    newName: string,
    newDescr: string
) {
    const heading = fileElement.querySelector<HTMLHeadingElement>('.node__name');
    if (heading) {
        heading.textContent = newName;
        NodeDescription(heading, newDescr);
    }
    if (tabList) {
        const optionalTab = tabList
            .querySelector(`.tab[data-obj-id="${fileNodeObj.id}"]`)
            ?.querySelector('.tab__filename');
        if (optionalTab) optionalTab.textContent = newName;
    }
    fileNodeObj.name = newName;
    fileNodeObj.descr = newDescr;
    fileMap.set(fileNodeObj.id, fileNodeObj);
    FileMap.dispatch(fileMap);
    const parentNode = folderStore.get(fileNodeObj.parentId!);
    if (parentNode) {
        parentNode.childFiles?.set(fileNodeObj.id, newName);
        folderStore.set(parentNode?.id, parentNode);
        FolderTreeStore.dispatch(folderStore);
    }
}

function updateFolderProps(
    folderElement: HTMLElement,
    folderNodeObj: INodeObject,
    folderStore: Map<number, INodeObject>,
    newName: string,
    newDescr: string
) {
    const heading = folderElement.querySelector<HTMLHeadingElement>('.node__name');
    if (heading) {
        heading.textContent = newName;
        NodeDescription(heading, newDescr);
    }
    folderNodeObj.name = newName;
    folderNodeObj.descr = newDescr;
    folderStore.set(folderNodeObj.id, folderNodeObj);
    const parentNode = folderStore.get(folderNodeObj.parentId!);
    if (parentNode) {
        parentNode.childFiles?.set(folderNodeObj.id, newName);
        folderStore.set(parentNode?.id, parentNode);
        FolderTreeStore.dispatch(folderStore);
    }
}

const updateNodeBtn = document.getElementById('update-node');

const form = NodePropsForm();
const elements = form.elements as INodePropsFormElements;
const modal = Modal(form, () => {
    form.reset();
});

if (updateNodeBtn) {
    updateNodeBtn.onclick = () => {
        const node = getChosenNode();
        if (!node) return;
        const nodeId = +(node.dataset.objId as string);
        if (nodeId === 0) return;
        const folderStore = FolderTreeStore.select();
        const fileMap = FileMap.select();
        let nodeObj!: INodeObject;
        if (folderStore.has(nodeId)) {
            nodeObj = folderStore.get(nodeId)!;
            elements.nodename.value = nodeObj.name;
            elements.nodedescr.value = nodeObj.descr;
        } else if (fileMap.has(nodeId)) {
            nodeObj = fileMap.get(nodeId)!;
            elements.nodename.value = nodeObj.name;
            elements.nodedescr.value = nodeObj.descr;
        }
        form.onsubmit = (e: SubmitEvent) => {
            e.preventDefault();
            elements.nodename.value = normalizeStringInput(elements.nodename.value);
            elements.nodedescr.value = normalizeStringInput(elements.nodedescr.value);
            const validForm = validateNodePropsForm(form);
            if (!validForm) return;
            switch (nodeObj.type) {
                case 'file': {
                    updateFileProps(
                        node,
                        nodeObj,
                        fileMap,
                        folderStore,
                        elements.nodename.value,
                        elements.nodedescr.value
                    );
                    break;
                }
                default: {
                    updateFolderProps(
                        node,
                        nodeObj,
                        folderStore,
                        elements.nodename.value,
                        elements.nodedescr.value
                    );
                    break;
                }
            }
            form.reset();
            modal.remove();
        };
        document.body.insertAdjacentElement('beforeend', modal);
    };
}
