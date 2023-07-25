import FileDatabase from '@/app/store/file_db';
import FileMap from '@/app/store/file_map';
import { getChosenFile } from '@/entities/node/file/FileElement';

function downloadFile() {
    let file = getChosenFile();
    if (!file) return;
    const fileId = +(file.dataset.objId as string);
    const fileStore = FileDatabase.getFileStore('readonly');
    const fileMap = FileMap.select();
    const fileNodeObj = fileMap.get(fileId)!;
    FileDatabase.getFile(fileId, fileStore, (file) => {
        console.log('success');
        getCallback(file.file, fileNodeObj.name);
    });
}

const getCallback = (file: File, fileName: string) => {
    let a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(file);
    console.log(url);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
};

const downloadFileBtn = document.getElementById('download-file');

if (downloadFileBtn) {
    downloadFileBtn.onclick = () => {
        downloadFile();
    };
}
