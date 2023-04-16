import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';

// import App components
import App from './components/App/App';

const client = new ApolloClient({
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uri: GRAPH_URL,
});

const ClientApp = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    );
};

loadableReady(() => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById('root'));
});
