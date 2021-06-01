import React, { FC, useState } from 'react'
import LandingPageTopBar from '../../components/landingPageTopBar'
import LoginForm from '../../components/loginForm'
import { ModalWrapper } from '../../components/modalWrapper'
import { loginService, SignUpService } from '../../services/request'
import { setStoreData } from '../../store'
import { RouteComponentProps } from 'react-router'
import SignUpForm from '../../components/signUpForm'
import { LoginData, SignUpData, StoreKey } from '../../lib/types'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import Button from '../../components/button'
import Innovation from '../../assets/images/innovation.svg'
import { interpreteSignUpError } from '../../lib/utils/errorFormats'

const Landing: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [showSignUp, setShowSignUp] = useState<boolean>(false)
    const [loginLoading, setLoginLoading] = useState<boolean>(false)
    const [signUpLoading, setSignUpLoading] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<string>('')
    const [signUpError, setSignUpError] = useState<string>('')

    const Container = styled.section`
        background-color: ${Colour.whiteSmoke};
        height: 100vh;
        padding-top: 90px;
        box-sizing: border-box;
    `

    return (
        <>
            <div className="w-full fixed top-0 left-0">
                <LandingPageTopBar
                    onShowSignUpModal={onShowSignUpModal}
                    onShowLoginModal={onShowLoginModal}
                />
            </div>
            <Container className="w-full flex justify-center md:justify-between px-8 lg:px-20">
                <div className="col col-el-1 py-4 flex flex-col w-4/5 md:w-1/2 lg:w-1/3 mt-8">
                    <h1 className="text-4xl md:text-5xl font-bold leading-snug md:leading-normal">
                        Invoice Software that is simple and free
                    </h1>
                    <span className="py-4">
                        Explore a better way to do bussiness, it&#39;s simple
                        and free
                    </span>
                    <div className="py-4">
                        <Button
                            onClick={onShowSignUpModal}
                            primary
                            size="large"
                        >
                            Get started for free
                        </Button>
                    </div>
                </div>
                <div className="col col-el-2 hidden md:block md:w-1/2 lg:w-2/3 py-4">
                    <img src={Innovation} alt="Bussiness Innovation" />
                </div>
            </Container>
            {showLogin && (
                <ModalWrapper onClose={onCloseLoginModal}>
                    <LoginForm
                        error={loginError}
                        loading={loginLoading}
                        onCloseModal={onCloseLoginModal}
                        onLoginSubmit={onLoginSubmit}
                    />
                </ModalWrapper>
            )}
            {showSignUp && (
                <ModalWrapper onClose={onCloseSignUpModal}>
                    <SignUpForm
                        error={signUpError}
                        loading={signUpLoading}
                        onCloseModal={onCloseSignUpModal}
                        onSignUpSubmit={onSignUpSubmit}
                    />
                </ModalWrapper>
            )}
        </>
    )

    function onCloseLoginModal() {
        setShowLogin(false)
        setLoginError('')
    }
    function onShowLoginModal() {
        setShowLogin(true)
    }

    function onCloseSignUpModal() {
        setSignUpError('')
        setShowSignUp(false)
    }
    function onShowSignUpModal() {
        setShowSignUp(true)
    }

    async function onLoginSubmit(data: LoginData) {
        setLoginError('')
        setLoginLoading(true)
        const authData = await loginService(data)
        if (authData && authData?.user_data && authData?.token) {
            setLoginLoading(false)
            setStoreData(StoreKey.USER, authData?.user_data)
            setStoreData(StoreKey.TOKEN, authData?.token)

            props.history.go(0)
        } else {
            setLoginLoading(false)
            if (authData.message) {
                setLoginError(authData.message)
            }
        }
    }

    async function onSignUpSubmit(data: SignUpData) {
        setSignUpError('')
        setSignUpLoading(true)
        const authData = await SignUpService(data)
        if (authData && authData?.user_data && authData?.token) {
            setSignUpLoading(false)
            setStoreData(StoreKey.USER, authData?.user_data)
            setStoreData(StoreKey.TOKEN, authData?.token)

            props.history.go(0)
        } else {
            setSignUpLoading(false)
            if (authData.message) {
                setSignUpError(interpreteSignUpError(authData.message))
            }
        }
    }
}

export default Landing
