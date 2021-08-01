import React from 'react'
import { NavLink as Link, Switch, Route } from 'react-router-dom'
import './style.scss'

// import child components
import Counter from '../Counter/Counter'
import Post from '../Post/Post'

// export entry application component
export default class App extends React.Component {
  constructor() {
    console.log('App.constructor()')
    super()
  }

  // render view
  render() {
    console.log('App.render()')

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
              to="/post"
              exact={true}
            >
              Posts
            </Link>
          </div>

          <Switch>
            <Route
              path="/"
              exact={true}
              render={() => <Counter name="Monica Geller" />}
            />

            <Route path="/post" exact={true} component={Post} />
          </Switch>
        </div>
      </div>
    )
  }
}
