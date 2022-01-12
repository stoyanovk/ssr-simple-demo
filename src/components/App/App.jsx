import React from 'react'
import { NavLink as Link, Switch, Route } from 'react-router-dom'
import { routes } from '../../routes'
import './style.scss'

// import child components
import Counter from '../Counter/Counter'
import Post from '../Post/Post'

// export entry application component
export default class App extends React.Component {
  // render view
  render() {
    return (
      <div className="ui-app">
        <div>
          <div className="ui-app__navigation">
            <Link
              className="ui-app__navigation__link"
              activeClassName="ui-app__navigation__link--active"
              to="/"
              exact={true}
            >
              Counter
            </Link>

            <Link
              className="ui-app__navigation__link"
              activeClassName="ui-app__navigation__link--active"
              to="/posts"
              exact={true}
            >
              Posts
            </Link>
          </div>

          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </div>
    )
  }
}
