import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import styled from 'styled-components'
import Button from '../button'
import { Input } from '../input'
import { loginService } from '../../services/request'

const StyledForm = styled.form`
    width: 30%;
    height: 350px;
    margin: 0;
    padding: 0;
`
const BrandWrapper = styled.section`
    width: 100%;
    height: 35%;
    margin: 18px 0;
`

const LoginForm: FC = () => {
    const [email, setEmail] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [password, setPassword] = useState('')

    return (
        <StyledForm onSubmit={onSubmit}>
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
            <div className="w-full flex py-4 justify-end">
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
            await loginService(payload)
        }
    }
}

export default LoginForm
