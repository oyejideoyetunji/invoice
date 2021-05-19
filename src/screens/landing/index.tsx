import React, { FC, useState } from 'react'
import LandingPageTopBar from '../../components/landingPageTopBar'
import LoginForm from '../../components/loginForm'
import { ModalWrapper } from '../../components/modalWrapper'
import { loginService, SignUpService } from '../../services/request'
import { setStoreData, StoreKey } from '../../store/user'
import { RouteComponentProps } from 'react-router'
import SignUpForm from '../../components/signUpForm'
import { LoginData, SignUpData } from '../../lib/types'

const Landing: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [showSignUp, setShowSignUp] = useState<boolean>(false)

    return (
        <>
            <LandingPageTopBar
                onShowSignUpModal={onShowSignUpModal}
                onShowLoginModal={onShowLoginModal}
            />
            {showLogin && (
                <ModalWrapper onClose={onCloseLoginModal}>
                    <LoginForm onLoginSubmit={onLoginSubmit} />
                </ModalWrapper>
            )}
            {showSignUp && (
                <ModalWrapper onClose={onCloseSignUpModal}>
                    <SignUpForm onSignUpSubmit={onSignUpSubmit} />
                </ModalWrapper>
            )}
        </>
    )

    function onCloseLoginModal() {
        setShowLogin(false)
    }
    function onShowLoginModal() {
        setShowLogin(true)
    }

    function onCloseSignUpModal() {
        setShowSignUp(false)
    }
    function onShowSignUpModal() {
        setShowSignUp(true)
    }

    async function onLoginSubmit(data: LoginData) {
        const authData = await loginService(data)
        setStoreData(StoreKey.USER, authData?.user_data)
        setStoreData(StoreKey.TOKEN, authData?.token)

        props.history.go(0)
    }

    async function onSignUpSubmit(data: SignUpData) {
        const authData = await SignUpService(data)
        setStoreData(StoreKey.USER, authData?.user_data)
        setStoreData(StoreKey.TOKEN, authData?.token)

        props.history.go(0)
    }
}

export default Landing
