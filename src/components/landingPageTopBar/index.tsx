import React, { FC } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import Button from '../button'

const Header = styled.header`
    height: 85px;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${Colour.white};

    & svg {
        display: inline-block;
        vertical-align: top;
    }

    & h1 {
        font-weight: 900;
        font-size: 20px;
        line-height: 1;
        margin: 0 5px;
        display: inline-block;
        vertical-align: top;
    }

    & button + button {
        margin-left: 10px;
    }

    @media only screen and (min-width: 640px) {
        height: 60px;
    }
`
export interface LandingPageTopBarProps {
    onShowLoginModal(): void
    onShowSignUpModal(): void
}

const LandingPageTopBar: FC<LandingPageTopBarProps> = (
    props: LandingPageTopBarProps
) => {
    return (
        <Header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 md:px-8 lg:px-20">
            <div className="pt-2 sm:py-3 flex items-center">
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
                <h1>envoice</h1>
            </div>
            <div className="pb-2 sm:py-3 flex justify-end">
                <Button onClick={props.onShowLoginModal} size="small">
                    Log in
                </Button>
                <Button onClick={props.onShowSignUpModal} primary size="small">
                    Sign up
                </Button>
            </div>
        </Header>
    )
}

export default LandingPageTopBar
