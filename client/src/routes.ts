import loadable from '@loadable/component';
const loadableCounter = loadable(
    () =>
        import(/* webpackChunkName: "Counter" */ './components/Counter/Counter')
);
const loadablePost = loadable(
    () => import(/* webpackChunkName: "Post" */ './components/Post/Post')
);
const loadablePosts = loadable(
    () => import(/* webpackChunkName: "Posts" */ './components/Posts/Posts')
);
const loadableNotFound = loadable(
    () =>
        import(
            /* webpackChunkName: "NotFound" */ './components/NotFound/NotFound'
        )
);

export const routes = [
    {
        path: '/',
        component: loadableCounter,
        exact: true,
    },
    {
        path: '/posts',
        component: loadablePosts,
        exact: true,
    },
    {
        path: '/posts/:id',
        component: loadablePost,
        exact: true,
    },
    {
        path: '*',
        component: loadableNotFound,
    },
];
