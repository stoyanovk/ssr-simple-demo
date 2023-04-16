import React from 'react';
import { Link } from 'react-router-dom';
import { BUTTON_TYPES } from './createButtons';
import s from './style.css';

const getClassName = (disable) => `${s.page} ${disable ? s.disabled : ''}`;

const PrevButton = ({ to, disable }) => {
    return (
        <Link className={getClassName(disable)} to={to}>
            {'< prev'}
        </Link>
    );
};
const NextButton = ({ to, disable }) => {
    return (
        <Link to={to} className={getClassName(disable)}>
            {'next >'}
        </Link>
    );
};

const Dots = () => {
    return <div className={s.page}>...</div>;
};

const NumberButton = ({ to, value, disable }) => {
    return (
        <Link to={to} className={getClassName(disable)}>
            {value}
        </Link>
    );
};

export const buttons = {
    [BUTTON_TYPES.NUMBER]: NumberButton,
    [BUTTON_TYPES.DOTS]: Dots,
    [BUTTON_TYPES.PREV]: PrevButton,
    [BUTTON_TYPES.NEXT]: NextButton,
};
