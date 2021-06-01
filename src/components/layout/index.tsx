import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { removeStoreData } from '../../store'
import Button from '../button'
import { StoreKey } from '../../lib/types'
import { Colour } from '../../lib/colour'

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`

const LayoutBar = styled.div`
    width: 100%;
    height: 50px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${Colour.white};
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    @media only screen and (min-width: 1024px) {
        width: 100px;
        height: 100vh;
        padding: 32px 8px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
    }
`

const LogoutButtonWrapper = styled.div`
    width: fit-content;
    height: fit-content;
`
const Container = styled.section`
    width: 100%;

    @media only screen and (min-width: 1024px) {
        width: calc(100% - 103px);
        margin-left: 103px;
    }
`

export interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps & RouteComponentProps> = (
    props: LayoutProps & RouteComponentProps
) => {
    return (
        <Wrapper className="w-full">
            <LayoutBar>
                <div className="flex items-center">
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
                    <h1>Invoice</h1>
                </div>
                <LogoutButtonWrapper>
                    <Button onClick={onSignOut} primary size="small">
                        Sign out
                    </Button>
                </LogoutButtonWrapper>
            </LayoutBar>
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
