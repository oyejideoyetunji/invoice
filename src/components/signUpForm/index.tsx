import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import { SignUpData } from '../../lib/types'
import Button from '../button'
import { Input } from '../input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const StyledForm = styled.form`
    width: 80%;
    height: 500px;
    margin: 0;
    padding: 0;
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
    height: 20%;
    margin: 18px 0;
`
const CloseModalButtonWrapper = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 4px;
    cursor: pointer;
`

export interface SignUpFormProps {
    onCloseModal?(): void
    onSignUpSubmit(data: SignUpData): void
}

const SignUpForm: FC<SignUpFormProps> = (props: SignUpFormProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
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
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={onFirstNameChange}
                required
            />
            <Input
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={onLastNameChange}
                required
            />
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
            <div className="w-full flex py-4 justify-end">
                <Button size="medium" primary type="submit">
                    Submit
                </Button>
            </div>
        </StyledForm>
    )

    function onFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
    }
    function onLastNameChange(event: ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
    }
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
            const payload = { firstName, lastName, email, password }
            props.onSignUpSubmit(payload)
        }
    }
}

export default SignUpForm
