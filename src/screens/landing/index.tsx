import React, { FC, useState } from 'react'
import LandingPageTopBar from '../../components/landingPageTopBar'
import LoginForm from '../../components/loginForm'
import { ModalWrapper } from '../../components/modalWrapper'

const Landing: FC = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false)

    return (
        <>
            <LandingPageTopBar onShowLoginModal={onShowLoginModal} />
            {showLogin && (
                <ModalWrapper onClick={onModalClick}>
                    <LoginForm />
                </ModalWrapper>
            )}
        </>
    )

    function onModalClick(event: React.MouseEvent<HTMLElement>) {
        if (event.target === event.currentTarget) {
            onCloseLoginModal()
        }
    }

    function onCloseLoginModal() {
        setShowLogin(false)
    }
    function onShowLoginModal() {
        setShowLogin(true)
    }
}

export default Landing
