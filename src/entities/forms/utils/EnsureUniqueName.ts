import { INodeObject, NodeType } from '@/entities/node/model/NodeObject.class';

export function ensureUniqueName(
    parentNode: INodeObject,
    namesArr: string[],
    name: string,
    nodeType: NodeType
) {
    if (namesArr.includes(name)) {
        switch (nodeType) {
            case 'file': {
                const regex = /^(.*?)(\.[^.]*)?$/;
                const matches = name.match(regex);
                if (matches) {
                    const newName = matches[1] + ' (копия)' + matches[2] ?? '';
                    return ensureUniqueName(parentNode, namesArr, newName, nodeType);
                }
                break;
            }
            default: {
                const newName = name + ' (копия)';
                return ensureUniqueName(parentNode, namesArr, newName, nodeType);
            }
        }
    }
    return name;
}
