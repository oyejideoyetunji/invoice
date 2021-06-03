import styled from 'styled-components'
import { Colour } from '../../lib/colour'

export const H1 = styled.h1<{
    fontSize?: string
    fontWeight?: string
    color?: string
}>`
    font-size: ${({ fontSize }) => fontSize || '24px'};
    font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
    color: ${({ color }) => color || Colour.darkBlue};
`

export const P = styled.p<{
    fontSize?: string
    fontWeight?: string
    color?: string
}>`
    font-size: ${({ fontSize }) => fontSize || '16px'};
    font-weight: ${({ fontWeight }) => fontWeight || '400'};
    color: ${({ color }) => color || Colour.darkBlueAlt};
`

export const Span = styled.span<{
    fontSize?: string
    fontWeight?: string
    color?: string
}>`
    font-size: ${({ fontSize }) => fontSize || '14px'};
    font-weight: ${({ fontWeight }) => fontWeight || '400'};
    color: ${({ color }) => color || Colour.darkBlueAlt};
`

export const Text = styled.span<{
    color?: string
}>`
    color: ${({ color }) => color || Colour.darkBlueAlt};
`
