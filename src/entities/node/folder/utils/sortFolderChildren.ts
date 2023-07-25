export function sortFolderChildren(childList: HTMLUListElement) {
    const childArr = Array.from(childList.children);
    childArr
        .sort((a, b) => {
            const textA = a.querySelector('.node__name')?.textContent ?? '';
            const textB = b.querySelector('.node__name')?.textContent ?? '';
            return textA.toLocaleLowerCase().localeCompare(textB.toLocaleLowerCase());
        })
        .sort((a, b) => {
            const wrapperA = a.querySelector('article');
            const wrapperB = b.querySelector('article');
            if (wrapperA?.classList.contains('folder') && wrapperB?.classList.contains('file'))
                return -1;
            if (wrapperA?.classList.contains('file') && wrapperB?.classList.contains('folder'))
                return 1;
            return 0;
        })
        .forEach((el) => {
            childList.append(el);
        });
}
