import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { removeStoreData, StoreKey } from '../../store/user'
import Button from '../button'
import { Colour } from '../../lib/colour'

const Wrapper = styled.main`
    display: flex;
    margin: 0;
    padding: 0;
`

const SideBar = styled.section`
    width: 150px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${Colour.elementsBackground};
    color: ${Colour.primaryText};
`
const SideBarItem = styled.div`
    width: 100%;
    padding: 14px 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    & * {
        text-decoration: none;
    }
`

const LogoutButtonWrapper = styled.div`
    width: 100%;
    position: absolute;
    bottom: 50px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Container = styled.section`
    width: calc(100% - 150px);
    margin-left: 150px;
`

const SideBarContents = [
    {
        name: 'Profile',
        path: '/',
        icon: '',
    },
]

export interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps & RouteComponentProps> = (
    props: LayoutProps & RouteComponentProps
) => {
    return (
        <Wrapper className="w-full">
            <SideBar>
                {SideBarContents.map((content) => (
                    <SideBarItem key={content.name}>
                        <span>{content.name}</span>
                    </SideBarItem>
                ))}
                <LogoutButtonWrapper>
                    <Button onClick={onSignOut} primary size="medium">
                        Sign out
                    </Button>
                </LogoutButtonWrapper>
            </SideBar>
            <Container>{props.children}</Container>
        </Wrapper>
    )

    function onSignOut() {
        removeStoreData(StoreKey.TOKEN)
        removeStoreData(StoreKey.USER)
        props.history.go(0)
    }
}

export default Layout
