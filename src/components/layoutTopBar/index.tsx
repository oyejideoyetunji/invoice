import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import { StoreKey } from '../../lib/types'
import { removeStoreData } from '../../store'
import Button from '../button'

const Wrapper = styled.div`
    height: 50px;
    background-color: ${Colour.elementsBackground};
    color: ${Colour.primaryText};
`

// const LeftTab = styled.div`
//     width: 55px;
//     height: 100%;
//     border-top-right-radius: 12px;
//     border-bottom-right-radius: 12px;
//     background-color: ${Colour.dodgerBlue};
// `

const LayoutTopBar: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    return (
        <Wrapper className="flex items-center justify-between">
            {/* <LeftTab /> */}
            <Button onClick={onSignOut} primary size="medium">
                Sign out
            </Button>
            <div>Avatar and Theme Switch</div>
        </Wrapper>
    )

    function onSignOut() {
        removeStoreData(StoreKey.TOKEN)
        removeStoreData(StoreKey.USER)
        props.history.go(0)
    }
}

export default LayoutTopBar
