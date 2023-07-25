import { validateNodeName } from '../utils/validateNodeName';
import { IFileUploadFormElements } from './model/FileUploadFormElements.interface';

export function FileUploadForm() {
    const form = document.createElement('form');
    form.className = 'form';
    form.id = 'file-upload';
    form.innerHTML = `<label class="file" for="loadfile">
                        <input id="loadfile" name="loadfile" type="file" required/>
                        <span class="file__btn">Выберите файл</span> 
                    </label>
                    <label for="nodename">
                        <span>Название:</span>
                        <input  id="nodename" name="nodename" type="text" />
                    </label>
                    <label for="nodedescr">
                        <span>Описание:</span>
                        <input id="nodedescr" name="nodedescr" type="text" />
                    </label>
                    <button type="submit" form="file-upload">ОК</button>`;
    const elements = form.elements as IFileUploadFormElements;
    elements.loadfile.onchange = (e) => {
        if (!elements.loadfile.files) {
            return;
        }
        const file = elements.loadfile.files[0];
        elements.nodename.value = file.name;
    };
    elements.loadfile.onclick = (e) => {
        elements.loadfile.value = '';
    };
    elements.nodename.oninput = () => {
        const validName = validateNodeName(elements.nodename.value);
        if (validName) {
            elements.nodename.setCustomValidity('');
        }
    };
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
    return form;
}
