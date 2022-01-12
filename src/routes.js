import Counter from './components/Counter/Counter'
import Post from './components/Post/Post'
import NotFound from './components/NotFound/NotFound'

export const routes = [
  {
    path: '/',
    component: Counter,
    exact: true,
    getServerSideData() {}
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
