export interface IFileStorageObject {
    id: number;
    file: File;
}

export class FileStorageObject implements IFileStorageObject {
    id: number;
    file: File;
    constructor(id: number, file: File) {
        this.id = id;
        this.file = file;
    }
}
