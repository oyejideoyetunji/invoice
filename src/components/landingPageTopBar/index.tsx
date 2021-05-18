import React, { FC } from 'react'
import styled from 'styled-components'
import Button from '../button'

const Header = styled.header`
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;

    & svg {
        display: inline-block;
        vertical-align: top;
    }

    & h1 {
        font-weight: 900;
        font-size: 20px;
        line-height: 1;
        margin: 6px 0 6px 10px;
        display: inline-block;
        vertical-align: top;
    }

    & button + button {
        margin-left: 10px;
    }
`

const LandingPageTopBar: FC = () => {
    return (
        <Header className="flex items-center justify-between">
            <div>
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
            <div>
                {/* <Button size="small">Log out</Button> */}
                <Button size="small">Log in</Button>
                <Button primary size="small">
                    Sign up
                </Button>
            </div>
        </Header>
    )
}

export default LandingPageTopBar
