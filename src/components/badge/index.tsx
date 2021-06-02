import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import { Variant, VariantColor } from '../../lib/variants'

export const badgeVariantColorMap = {
    success: {
        color: Colour.success,
        background: Colour.successShade,
    },
    warning: {
        color: Colour.warning,
        background: Colour.warningShade,
    },
    information: {
        color: '',
        background: '',
    },
    neutral: {
        color: Colour.primaryText,
        background: Colour.whiteSmoke,
    },
}

export function getVariantColor(variant: Variant): VariantColor {
    return badgeVariantColorMap[variant]
}

const Badge = styled.span<{
    variantColor: VariantColor
}>`
    width: 85px;
    height: fit-content;
    padding: 4px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ variantColor }) =>
        variantColor
            ? `
            color: ${variantColor.color};
            background-color: ${variantColor.background};
        `
            : `
            color: ${Colour.primaryText};
            background-color: ${Colour.whiteSmoke}
        `}
`
export default Badge
