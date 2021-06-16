import React, { FC, SelectHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
// import { Option } from '../../lib/types'

const SelectWrapper = styled.div<{ error?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;

    & span {
        font-size: 14px;
        padding: 2px 8px;
    }
`
export const StyledSelect = styled.select`
    font-family: sans-serif;
    font-size: 14px;
    line-height: 1.3;
    padding: 11px 16px;
    outline: none;
    border: thin solid ${Colour.lightGray};
    border-radius: 8px;
    width: 100%;
    max-width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;

    & option {
        padding: 1.8rem;

        &::placeholder {
            font-size: 14px;
        }
    }

    &:focus {
        border: thin solid ${Colour.dodgerBlue};
    }

    &::placeholder {
        font-size: 14px;
    }
`

export interface SelectComponentProps {
    label?: string
}

export const Select: FC<
    SelectComponentProps & SelectHTMLAttributes<HTMLSelectElement>
> = (props: SelectComponentProps & SelectHTMLAttributes<HTMLSelectElement>) => {
    const { label, ...rest } = props

    return (
        <SelectWrapper>
            {label && <span>{label}</span>}
            <StyledSelect {...rest} />
        </SelectWrapper>
    )
}

// export interface ControlledSelectProps {
//     options: Option[]
//     onChange(): void
// }

// export const ControlledSelect: FC<
//     ControlledSelectProps & SelectComponentProps
// > = (props: ControlledSelectProps & SelectComponentProps) => {
//     return <Select></Select>
// }
