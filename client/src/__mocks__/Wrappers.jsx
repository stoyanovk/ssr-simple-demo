import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { MainContext } from '@/components/MainContext/MainContext';

export const Wrappers = ({ ssrData = {}, children, mocks }) => {
    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            <BrowserRouter>
                <MainContext ssrData={ssrData}>{children}</MainContext>
            </BrowserRouter>
        </MockedProvider>
    );
};
