import FileDatabase from '@/app/store/file_db';

let chosenFileContent: HTMLDivElement | null = null;

export function getChosenFileContent() {
    return chosenFileContent;
}

export function setChosenFileContent(el: HTMLDivElement | null) {
    if (chosenFileContent) {
        chosenFileContent.classList.remove('file__content_active');
    }
    el?.classList.add('file__content_active');
    chosenFileContent = el;
}

export function FileContent(fileId: number) {
    const fileContent = document.createElement('div');
    const pre = document.createElement('pre');
    fileContent.append(pre);
    fileContent.className += 'file__content';
    fileContent.dataset.objId = String(fileId);
    const store = FileDatabase.getFileStore('readonly');
    FileDatabase.getFile(fileId, store, (file) => {
        let reader = new FileReader();

        reader.readAsText(file.file);

        reader.onload = function () {
            pre.textContent = reader.result as string;
        };

        reader.onerror = function () {
            pre.textContent = 'Ошибка загрузки файла';
            console.log(reader.error);
        };
    });
    return fileContent;
}
