import React, { FC, useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Invoices from '../../screens/invoices'
import Landing from '../../screens/landing'
import Login from '../../screens/login'
import SignUp from '../../screens/signUp'
import LayoutTopBar from '../layoutTopBar'
import { AuthContext } from '../authContextWrapper/index'
import { Routes } from './routes'

const Navigation: FC = () => {
    const { user_data, token } = useContext(AuthContext)

    if (!user_data || token) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={Routes.Login} component={Login} />
                    <Route exact path={Routes.SignUp} component={SignUp} />
                    <Route exact path={Routes.Landing} component={Landing} />
                    <Redirect to={Routes.Landing} />
                </Switch>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
            <LayoutTopBar />
            <Switch>
                <Route exact path={Routes.Invoices} component={Invoices} />
                <Redirect to={Routes.Invoices} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation
