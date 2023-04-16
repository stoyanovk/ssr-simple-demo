import React from 'react';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { MainContext } from '@/components/MainContext/MainContext';
import { routes } from '@/routes';

import s from './style.css';

const App = ({ ssrData = {} }) => {
    return (
        <MainContext ssrData={ssrData}>
            <div className={s.app}>
                <div>
                    <div className={s.navigation}>
                        <Link
                            className={s.link}
                            activeClassName={s.linkActive}
                            to="/"
                            exact={true}
                        >
                            Counter
                        </Link>

                        <Link
                            className={s.link}
                            activeClassName={s.linkActive}
                            to="/posts"
                            exact={true}
                        >
                            Posts
                        </Link>
                    </div>

                    <Switch>
                        {routes.map((route) => (
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
    );
};
export default App;
