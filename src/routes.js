import loadable from '@loadable/component'
import { getPost, getPosts } from './api/posts'
const loadableCounter = loadable(() =>
  import(/* webpackChunkName: "Counter" */ './components/Counter/Counter')
)
const loadablePost = loadable(() =>
  import(/* webpackChunkName: "Post" */ './components/Post/Post')
)
const loadablePosts = loadable(() =>
  import(/* webpackChunkName: "Posts" */ './components/Posts/Posts')
)
const loadableNotFound = loadable(() =>
  import(/* webpackChunkName: "NotFound" */ './components/NotFound/NotFound')
)

export const routes = [
  {
    path: '/',
    component: loadableCounter,
    exact: true,
    getServerSideData() {}
  },
  {
    path: '/posts',
    component: loadablePosts,
    exact: true,
    getServerSideData(req) {
      return getPosts({ page: req.query.page }).then(posts => {
        return { posts }
      })
    }
  },
  {
    path: '/posts/:id',
    component: loadablePost,
    exact: true,
    getServerSideData(req) {
      return getPost(req.params.id).then(post => {
        return { post }
      })
    }
  },
  {
    path: '*',
    component: loadableNotFound,
    getServerSideData() {}
  }
]
