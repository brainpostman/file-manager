import { INodePropsFormElements } from '../model/NodePropsFormElements.interface';
import { validateNodeName } from './validateNodeName';

export function validateNodePropsForm(form: HTMLFormElement) {
    const elements = form.elements as INodePropsFormElements;
    const validName = validateNodeName(elements.nodename.value);
    if (validName) {
        return true;
    } else {
        console.log('why no check validity');
        elements.nodename.setCustomValidity('Некорректное название');
        return false;
    }
}
