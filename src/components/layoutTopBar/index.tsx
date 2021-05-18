import React, { FC } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'

const Wrapper = styled.div`
    height: 50px;
    background-color: ${Colour.elementsBackground};
    color: ${Colour.primaryText};
`

const LeftTab = styled.div`
    width: 55px;
    height: 100%;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: ${Colour.dodgerBlue};
`

const LayoutTopBar: FC = () => {
    return (
        <Wrapper className="flex items-center justify-between">
            <LeftTab />
            <div>Avatar and Theme Switch</div>
        </Wrapper>
    )
}

export default LayoutTopBar
