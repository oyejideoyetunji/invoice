import styled from 'styled-components'
import { Colour } from '../../lib/colour'

export interface ButtonProps {
    color?: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
}

const buttonSizeStyles = {
    small: 'font-size: 12px; padding: 10px 16px;',
    medium: 'font-size: 14px; padding: 11px 20px;',
    large: 'font-size: 16px; padding: 12px 24px;',
}

const Button = styled.button<ButtonProps>`
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: none;
    outline: none;
    border-radius: 3em;
    cursor: pointer;
    line-height: 1;

    &:focus {
        outline: none;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    &:disabled {
        cursor: not-allowed;
    }

    ${({ primary, color }) =>
        primary
            ? `
                color: ${Colour.white};
                background-color: ${Colour.primaryBlue};
        `
            : color
            ? `
                color: ${Colour.white};
                background-color: ${color};
            `
            : `
                color: #333;
                background-color: ${Colour.white};
                border: 1px solid rgba(0, 0, 0, 0.25);
        `}
    ${({ size }) => (size ? buttonSizeStyles[size] : buttonSizeStyles.medium)}
`

export default Button
