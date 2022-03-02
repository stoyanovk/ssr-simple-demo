import React from 'react'
import { NavLink as Link, Switch, Route } from 'react-router-dom'
import { MainContext } from '@/components/MainContext/MainContext'
import { routes } from '@/routes'

import './style.scss'

const App = ({ ssrData }) => {
  return (
    <MainContext ssrData={ssrData}>
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
    </MainContext>
  )
}
export default App
