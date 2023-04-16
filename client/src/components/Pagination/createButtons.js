export const BUTTON_TYPES = {
    NUMBER: 'NUMBER',
    DOTS: 'DOTS',
    PREV: 'PREV',
    NEXT: 'NEXT',
};

const createButton = (type, value, disabled) => ({
    type,
    value,
    disabled,
});

export const getButtons = (currentPage, perPage, total = 100) => {
    const buttons = [];
    const pages = total / perPage;
    const neighbor = 1;

    if (total < perPage) return [];

    if (currentPage !== 1) {
        buttons.push(createButton(BUTTON_TYPES.PREV, currentPage - 1));
    }

    if (currentPage - neighbor > 2) {
        buttons.push(createButton(BUTTON_TYPES.DOTS));
    }

    if (currentPage - neighbor > 0) {
        buttons.push(createButton(BUTTON_TYPES.NUMBER, currentPage - neighbor));
    }

    buttons.push(createButton(BUTTON_TYPES.NUMBER, currentPage, true));

    if (currentPage < pages) {
        buttons.push(createButton(BUTTON_TYPES.NUMBER, currentPage + neighbor));
    }

    if (currentPage + neighbor < pages) {
        buttons.push(createButton(BUTTON_TYPES.DOTS));
    }

    if (currentPage < pages) {
        buttons.push(createButton(BUTTON_TYPES.NEXT, currentPage + 1));
    }
    return buttons;
};
