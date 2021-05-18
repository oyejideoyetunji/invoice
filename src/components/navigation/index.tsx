import React, { FC, useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Invoices from '../../screens/invoices'
import Landing from '../../screens/landing'
import LayoutTopBar from '../layoutTopBar'
import { AuthContext } from '../authContextWrapper/index'
import { Routes } from './routes'

const Navigation: FC = () => {
    const { user_data, token } = useContext(AuthContext)

    if (!user_data || token) {
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
            <LayoutTopBar />
            <Switch>
                <Route exact path={Routes.Invoices} component={Invoices} />
                <Redirect from={Routes.Home} to={Routes.Invoices} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation
