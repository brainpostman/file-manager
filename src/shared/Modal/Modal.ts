export function Modal(element: Element) {
    const modal = document.createElement('div');
    const modal__overlay = document.createElement('div');
    const modal__container = document.createElement('div');
    modal.className = 'modal';
    modal__overlay.className = 'modal__overlay';
    modal__container.className = 'modal__container';
    modal.insertAdjacentElement('afterbegin', modal__container);
    modal.insertAdjacentElement('afterbegin', modal__overlay);
    modal__container.insertAdjacentElement('afterbegin', element);
    modal__overlay.onclick = () => {
        modal.remove();
    };
    return modal;
}
