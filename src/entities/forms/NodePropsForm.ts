import { INodePropsFormElements } from './model/NodePropsFormElements.interface';
import { validateNodeName } from './utils/validateNodeName';

export function NodePropsForm() {
    const form = document.createElement('form');
    form.id = 'node-props';
    form.innerHTML = `<label for="name">
                        <span>Название:</span>
                        <input id="nodename" type="text"/>
                    </label>
                    <label for="descr">
                        <span>Описание:</span>
                        <input id="nodedescr" type="text" />
                    </label>
                    <button type="submit" form="node-props">ОК</button>`;
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
    const elements = form.elements as INodePropsFormElements;
    elements.nodename.oninput = () => {
        const validName = validateNodeName(elements.nodename.value);
        if (validName) {
            elements.nodename.setCustomValidity('');
        }
    };
    return form;
}
