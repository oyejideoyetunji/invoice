import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import Button from '../button'
import { Input } from '../input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const StyledForm = styled.form`
    width: 80%;
    height: 500px;
    margin: 0;
    padding: 16px;
    border-radius: 16px;
    background-color: ${Colour.white};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    @media only screen and (min-width: 767px) {
        width: 50%;
    }

    @media only screen and (min-width: 1020px) {
        width: 30%;
    }
`
const BrandWrapper = styled.section`
    width: 100%;
    height: 35%;
    margin: 18px 0;
`
const CloseModalButtonWrapper = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 4px;
    cursor: pointer;
`

export interface LoginFormProps {
    onCloseModal?(): void
    onLoginSubmit(data: { email: string; password: string }): void
}

const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
    const [email, setEmail] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [password, setPassword] = useState('')

    return (
        <StyledForm onSubmit={onSubmit}>
            <div className="w-full flex justify-end px-4">
                <CloseModalButtonWrapper
                    onClick={props.onCloseModal}
                    className="text-lg md:text-xl"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </CloseModalButtonWrapper>
            </div>
            <BrandWrapper className="flex items-center justify-center">
                Brand Here
            </BrandWrapper>
            <Input
                type="email"
                label="Email address"
                placeholder="Enter email"
                value={email}
                onChange={onEmailChange}
                required
            />
            <Input
                type="password"
                label="Password"
                placeholder="Enter password"
                value={password}
                error={passwordError}
                onChange={onPasswordChange}
                required
            />
            <div className="w-full flex py-8 justify-end">
                <Button size="medium" primary type="submit">
                    Login
                </Button>
            </div>
        </StyledForm>
    )

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }
    function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (password.length < 6) {
            setPasswordError(
                'Error: Password must contain at least six (6) characters'
            )
        } else {
            const payload = { email, password }
            props.onLoginSubmit(payload)
        }
    }
}

export default LoginForm
