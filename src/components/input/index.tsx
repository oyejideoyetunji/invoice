import React, { FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'

export const StyledInput = styled.input<{ error?: boolean }>`
    width: 100%;
    padding: 8px 16px;
    outline: none;
    border: thin solid
        ${({ error }) => (error ? Colour.danger : Colour.lightGray)};
    border-radius: 8px;

    &:focus {
        border: thin solid
            ${({ error }) => (error ? Colour.danger : Colour.dodgerBlue)};
    }
`
const InputWrapper = styled.div<{ error?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;

    & span {
        font-size: 14px;
        padding: 2px 8px;
    }

    & span.error {
        font-size: 14px;
        color: ${Colour.danger};
    }
`
export interface InputComponentProps {
    label?: string
    error?: string
}

export const Input: FC<
    InputComponentProps & InputHTMLAttributes<HTMLInputElement>
> = (props: InputComponentProps & InputHTMLAttributes<HTMLInputElement>) => {
    const { label, error, ...rest } = props

    return (
        <InputWrapper error={!!error}>
            {label && <span>{label}</span>}
            <StyledInput error={!!error} {...rest} />
            {error && <span className="error">{error}</span>}
        </InputWrapper>
    )
}
