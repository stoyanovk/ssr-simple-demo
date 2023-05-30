import React from 'react';
import { getButtons } from './createButtons';
import { buttons } from './view';
import s from './style.css'

export const Pagination: React.FC<{
    perPage: number;
    currentPage: number;
    total: number;
    nextPageUrl: (page: string) => string;
}> = ({ perPage, currentPage, total, nextPageUrl }) => {
    const pages = getButtons(currentPage, perPage, total);
    return (
        <div data-test="pagination" className={s.dFlex}>
            {pages.map(({ type, value, disabled }, i) => {
                const Button = buttons[type];
                return (
                    <Button
                        disable={disabled}
                        to={nextPageUrl(value)}
                        value={value}
                        key={i}
                    />
                );
            })}
        </div>
    );
};
