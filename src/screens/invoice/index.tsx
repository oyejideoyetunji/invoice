import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Button from '../../components/button'
import { Colour } from '../../lib/colour'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Routes } from '../../components/navigation/routes'

const Wrapper = styled.section`
    min-height: 100vh;
    margin-top: 3px;
    padding: 32px 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${Colour.darkBlueAlt};
    background-color: ${Colour.whiteSmoke};

    & > * {
        width: 100%;
    }

    @media only screen and (min-width: 640px) {
        & > * {
            width: 90%;
        }
    }

    @media only screen and (min-width: 1020px) {
        margin-top: 0;

        & > * {
            width: 70%;
        }
    }
`

const ScreenCard = styled.section`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: ${Colour.white};
    border-radius: 12px;
`

const InvoiceDetailsCard = styled.section`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: ${Colour.white};
    border-radius: 12px;
`

const MobileActionBar = styled.section`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: ${Colour.white};
`

const Invoice: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const id = props.match.params.invoiceId

    return (
        <Wrapper className="relative md:static">
            <div className="flex items-center justify-start py-8">
                <div className="pr-2 cursor-pointer">
                    <Link to={Routes.Invoices}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                </div>
                <span>Go back</span>
            </div>
            <ScreenCard className="flex p-6 justify-between my-4">
                <div className="w-full md:w-auto flex items-center justify-between md:justify-start">
                    <span className="pr-4">Status</span>
                    <span>Pending</span>
                </div>
                <div className="hidden md:flex items-center">
                    <Button>Edit</Button>
                    <span className="px-2" />
                    <Button color={Colour.danger}>Delete</Button>
                    <span className="px-2" />
                    <Button primary>Mark as paid</Button>
                </div>
            </ScreenCard>
            <InvoiceDetailsCard className="p-6 my-4"></InvoiceDetailsCard>
            <MobileActionBar className="md:hidden w-full flex items-center justify-end px-2 py-6 mt-4 absolute bottom-0 left-0">
                <Button size="small">Edit</Button>
                <span className="px-2" />
                <Button size="small" color={Colour.danger}>
                    Delete
                </Button>
                <span className="px-2" />
                <Button size="small" primary>
                    Mark as paid
                </Button>
            </MobileActionBar>
        </Wrapper>
    )
}

export default Invoice
