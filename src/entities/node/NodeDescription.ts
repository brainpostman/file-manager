export function NodeDescription(node: HTMLElement, descr: string) {
    const description = document.querySelector<HTMLDivElement>('.description');
    if (!description) return;

    node.onmouseover = (e) => {
        description.style.top = `${e.clientY + 12}px`;
        description.style.left = `${e.clientX + 12}px`;
        description.style.display = 'initial';
        description.textContent = descr;
        description.style.opacity = '1';
    };

    node.onmouseleave = (e) => {
        description.style.opacity = '0';
        description.style.display = 'none';
        description.textContent = '';
    };
}
