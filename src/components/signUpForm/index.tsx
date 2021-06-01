import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import { SignUpData } from '../../lib/types'
import Button from '../button'
import { Input } from '../input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'

const StyledForm = styled.form`
    width: 80%;
    min-height: 550px;
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
    margin: 12px 0;
`
const CloseModalButtonWrapper = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 4px;
    cursor: pointer;
`
const ErrorWrapper = styled.div`
    font-size: 14px;
    color: ${Colour.danger};
`

export interface SignUpFormProps {
    error: string
    loading: boolean
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
            <div className="w-full flex justify-end">
                <CloseModalButtonWrapper
                    onClick={props.onCloseModal}
                    className="text-lg md:text-xl"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </CloseModalButtonWrapper>
            </div>
            <BrandWrapper className="flex items-center justify-center">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fillRule="evenodd">
                        <path
                            d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                            fill="#FFF"
                        />
                        <path
                            d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                            fill="#555AB9"
                        />
                        <path
                            d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                            fill="#91BAF8"
                        />
                    </g>
                </svg>
                <h1>envoice</h1>
            </BrandWrapper>
            <ErrorWrapper className="px-1 py-2 text-center">
                {props.error}
            </ErrorWrapper>
            <Input
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={onFirstNameChange}
                required
            />
            <div className="py-2" />
            <Input
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={onLastNameChange}
                required
            />
            <div className="py-2" />
            <Input
                type="email"
                label="Email address"
                placeholder="Enter email"
                value={email}
                onChange={onEmailChange}
                required
            />
            <div className="py-2" />
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
                    {props.loading ? (
                        <span className="inline-block px-4">
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="fa-spin"
                            />
                        </span>
                    ) : (
                        'Submit'
                    )}
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
        setPasswordError('')
    }
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setPasswordError('')

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
