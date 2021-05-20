import React, { FC, useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Invoices from '../../screens/invoices'
import Landing from '../../screens/landing'
import { AuthContext } from '../authContextWrapper/index'
import { Routes } from './routes'
import Layout from '../layout'
import Invoice from '../../screens/invoice'

const Navigation: FC = () => {
    const { user_data, token } = useContext(AuthContext)

    if (!user_data || !token) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={Routes.Landing} component={Landing} />
                    <Redirect from={Routes.Home} to={Routes.Landing} />
                </Switch>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
            <Route
                path={Routes.Home}
                render={(props) => (
                    <Layout {...props}>
                        <Switch>
                            <Route
                                exact
                                path={Routes.Invoices}
                                component={Invoices}
                            />
                            <Route
                                exact
                                path={Routes.Invoice}
                                component={Invoice}
                            />
                            <Redirect from={Routes.Home} to={Routes.Invoices} />
                        </Switch>
                    </Layout>
                )}
            />
        </BrowserRouter>
    )
}

export default Navigation
