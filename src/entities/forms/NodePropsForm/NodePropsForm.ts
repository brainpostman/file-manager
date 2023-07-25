import { INodePropsFormElements } from './model/NodePropsFormElements.interface';
import { validateNodeName } from '../utils/validateNodeName';

export function NodePropsForm() {
    const form = document.createElement('form');
    form.className = 'form';
    form.id = 'node-props';
    form.innerHTML = `<label for="nodename">
                        <span>Название:</span>
                        <input id="nodename" name="nodename" type="text"/>
                    </label>
                    <label for="nodedescr">
                        <span>Описание:</span>
                        <input id="nodedescr" name="nodedescr" type="text" />
                    </label>
                    <button type="submit" form="node-props">ОК</button>`;
    const elements = form.elements as INodePropsFormElements;
    elements.nodename.oninput = () => {
        const validName = validateNodeName(elements.nodename.value);
        if (validName) {
            elements.nodename.setCustomValidity('');
        }
    };
    form.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
    return form;
}
