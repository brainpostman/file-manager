import { getNodeObjId } from '@/app/store/folder_map';

export type NodeType = 'folder' | 'file';

export interface INodeObject {
    id: number;
    name: string;
    type: NodeType;
    parentId: number | null;
    descr: string;
    childFolders: Map<number, string> | null;
    childFiles: Map<number, string> | null;
}

export class NodeObject implements INodeObject {
    id: number;
    name: string;
    type: NodeType;
    parentId: number | null;
    descr: string;
    childFolders: Map<number, string> | null;
    childFiles: Map<number, string> | null;
    constructor(name: string, type: NodeType, parentId: number | null, descr: string) {
        this.id = getNodeObjId();
        this.name = name;
        this.type = type;
        this.parentId = parentId;
        this.descr = descr;
        switch (type) {
            case 'folder':
                this.childFolders = new Map<number, string>();
                this.childFiles = new Map<number, string>();
                break;
            default:
                this.childFolders = null;
                this.childFiles = null;
                break;
        }
    }
}
