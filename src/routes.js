import Counter from './components/Counter/Counter'
import Post from './components/Post/Post'
import Posts from './components/Posts/Posts'
import NotFound from './components/NotFound/NotFound'

export const routes = [
  {
    path: '/',
    component: Counter,
    exact: true,
    getServerSideData() {}
  },
  {
    path: '/posts',
    component: Posts,
    exact: true,
    getServerSideData: Posts.getServerSideData
  },
  {
    path: '/posts/:id',
    component: Post,
    getServerSideData: Post.getServerSideData
  },
  {
    path: '*',
    component: NotFound,
    getServerSideData() {}
  }
]
