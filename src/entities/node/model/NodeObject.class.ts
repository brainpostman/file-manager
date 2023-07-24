export type NodeType = 'folder' | 'file';

export interface INodeObject {
    id: number;
    name: string;
    type: NodeType;
    parentId: number | null;
    descr: string;
    childFolders: Set<number> | null;
    childFiles: Set<number> | null;
}

export class NodeObject implements INodeObject {
    static objId = 0;
    id: number;
    name: string;
    type: NodeType;
    parentId: number | null;
    descr: string;
    childFolders: Set<number> | null;
    childFiles: Set<number> | null;
    constructor(name: string, type: NodeType, parentId: number | null, descr: string) {
        this.id = NodeObject.objId++;
        this.name = name;
        this.type = type;
        this.parentId = parentId;
        this.descr = descr;
        switch (type) {
            case 'folder':
                this.childFolders = new Set<number>();
                this.childFiles = new Set<number>();
                break;
            default:
                this.childFolders = null;
                this.childFiles = null;
                break;
        }
    }
}
