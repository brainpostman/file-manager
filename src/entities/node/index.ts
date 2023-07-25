let chosenNode: HTMLElement | null = null;

export const getChosenNode = () => {
    return chosenNode;
};

export const setChosenNode = (el: HTMLElement | null) => {
    chosenNode = el;
    console.log('chosen node', el);
};
