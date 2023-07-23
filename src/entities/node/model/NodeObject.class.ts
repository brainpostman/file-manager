export type NodeType = 'folder' | 'file';

export interface INodeObject {
    id: number;
    name: string;
    type: NodeType;
    parent: INodeObject | null;
    descr: string;
    children: Set<number> | null;
}

export class NodeObject implements INodeObject {
    static objId = 0;
    id: number;
    name: string;
    type: NodeType;
    parent: INodeObject | null;
    descr: string;
    children: Set<number> | null;
    constructor(name: string, type: NodeType, parent: INodeObject | null, descr: string) {
        this.id = NodeObject.objId++;
        this.name = name;
        this.type = type;
        this.parent = parent;
        this.descr = descr;
        switch (type) {
            case 'folder':
                this.children = new Set<number>();
                break;
            default:
                this.children = null;
                break;
        }
    }
}
