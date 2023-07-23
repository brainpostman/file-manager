export function File(name: string, descr: string) {
    const file = document.createElement('article');
    file.className += 'node file';
    file.innerHTML = `<div class="node__heading" tabindex="-1">
                        <img src="/file.svg" class="node-icon" />
                        <h3 class="node__name">
                        </h3>
                    </div>`;
    file.title = descr;
    const nodeName = file.querySelector('.node__name');
    if (!nodeName) return;
    nodeName.textContent = name;
    return file;
}
