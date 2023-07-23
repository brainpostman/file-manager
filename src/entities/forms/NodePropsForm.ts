export function NodePropsForm(submitCallback: (e: SubmitEvent) => void) {
    const form = document.createElement('form');
    form.id = 'node-props';
    form.innerHTML = `<label for="name">
                        <span>Название:</span>
                        <input id="node-name" type="text" />
                    </label>
                    <label for="descr">
                        <span>Описание:</span>
                        <input id="node-descr" type="text" />
                    </label>
                    <button type="submit" form="node-props">ОК</button>`;
    form.onsubmit = (e: SubmitEvent) => {
        submitCallback(e);
    };
    return form;
}
