export function NodeDescription(node: HTMLHeadingElement, descr: string) {
    const description = document.querySelector<HTMLDivElement>('.description');
    if (!description) return;

    node.onmouseover = (e) => {
        if (!descr) return;
        description.style.top = `${e.clientY + 12}px`;
        description.style.left = `${e.clientX + 12}px`;
        description.style.display = 'initial';
        description.textContent = descr;
        description.style.opacity = '1';
    };

    node.onmouseleave = (_e) => {
        if (!descr) return;
        description.style.opacity = '0';
        description.style.display = 'none';
        description.textContent = '';
    };
}
