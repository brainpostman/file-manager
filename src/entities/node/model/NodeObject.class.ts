export type NodeType = 'folder' | 'file';

export interface INodeObject {
    name: string;
    type: NodeType;
    parent: INodeObject | null;
    descr: string;
    children: INodeObject[] | null;
}

export class NodeObject implements INodeObject {
    name: string;
    type: NodeType;
    parent: INodeObject | null;
    descr: string;
    children: INodeObject[] | null;
    constructor(name: string, type: NodeType, parent: INodeObject | null, descr: string) {
        this.name = name;
        this.type = type;
        this.parent = parent;
        this.descr = descr;
        switch (type) {
            case 'folder':
                this.children = new Array<INodeObject>();
                break;
            default:
                this.children = null;
                break;
        }
    }
}
