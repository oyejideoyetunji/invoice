import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Button from '../../components/button'
import { Colour } from '../../lib/colour'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Routes } from '../../components/navigation/routes'
import Badge, { getVariantColor } from '../../components/badge'
import { Variant } from '../../lib/variants'
import { ModalWrapper } from '../../components/modalWrapper'
import InvoiceForm from '../../components/invoiceForm'

const Wrapper = styled.section`
    min-height: 100vh;
    margin-top: 3px;
    padding: 18px 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${Colour.darkBlueAlt};
    background-color: ${Colour.whiteSmoke};

    & > *:not(.action-bar) {
        width: 100%;
    }

    @media only screen and (min-width: 640px) {
        & > *:not(.action-bar) {
            width: 90%;
        }
    }

    @media only screen and (min-width: 1020px) {
        margin-top: 0;

        & > *:not(.action-bar) {
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
const BalanceSheet = styled.div`
    background-color: ${Colour.whiteSmoke};
    border-radius: 12px;
`
const SumtotalWrapper = styled.div`
    background-color: ${Colour.darkBlueAlt};
    color: ${Colour.white};
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`
const IconWrapper = styled.span<{ size?: string }>`
    ${({ size }) => size && `font-size: ${size};`}
    display: inline-block;
    width: fit-content;
    height: fit-content;
`
const FormWrapper = styled.section`
    height: 100vh;
    overflow-y: auto;
    background-color: ${Colour.white};
`
const CloseModalButtonWrapper = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 4px;
    cursor: pointer;
`

const Invoice: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [showInvoiceForm, setShowInvoiceForm] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const id = props.match.params.invoiceId

    return (
        <>
            <Wrapper className="relative md:static">
                <div className="flex items-center justify-start pb-8">
                    <div className="pr-8 cursor-pointer">
                        <Link to={Routes.Invoices}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                    </div>
                    <span>Go back</span>
                </div>
                <ScreenCard className="flex p-6 justify-between my-4">
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-start">
                        <span className="pr-4">Status</span>
                        <Badge variantColor={getVariantColor(Variant.Warning)}>
                            <IconWrapper className="pr-1" size="8px">
                                <FontAwesomeIcon icon={faCircle} />
                            </IconWrapper>
                            <span className="text-sm">Pending</span>
                        </Badge>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Button onClick={onShowInvoiceForm}>Edit</Button>
                        <span className="px-2" />
                        <Button color={Colour.danger}>Delete</Button>
                        <span className="px-2" />
                        <Button primary>Mark as paid</Button>
                    </div>
                </ScreenCard>
                <InvoiceDetailsCard className="px-3 py-6 sm:px-6 mb-32">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
                        <div className="flex flex-col pb-8 md:pb-0">
                            <span className="pb-1 text-sm md:text-base font-bold md:font-medium">
                                #XARTG012
                            </span>
                            <span className="text-sm md:text-base font-light">
                                Graphic design
                            </span>
                        </div>
                        <span className="text-sm md:text-base font-light">
                            19 Usaeene terance <br />
                            London <br />
                            EI 3EZ <br />
                            United Kingdom
                        </span>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:justify-between">
                        <div className="md:w-1/2 flex justify-between">
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col pb-8">
                                    <span className="text-sm md:text-base font-light">
                                        Invoice Date
                                    </span>
                                    <span className="pb-1 text-sm md:text-base font-bold md:font-medium">
                                        21 Aug, 2021
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm md:text-base font-light">
                                        Payment Due
                                    </span>
                                    <span className="pb-1 text-sm md:text-base font-bold md:font-medium">
                                        21 Aug, 2021
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm md:text-base font-light">
                                    Bill To
                                </span>
                                <span className="py-2 text-sm md:text-base font-bold md:font-medium">
                                    Alex Grim
                                </span>
                                <span className="text-sm md:text-base font-light">
                                    19 Usaeene terance <br />
                                    London <br />
                                    EI 3EZ <br />
                                    United Kingdom
                                </span>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex flex-col py-8 md:py-0 md:pl-12">
                            <span className="pb-1 text-sm md:text-base font-light">
                                Send to
                            </span>
                            <span className="text-sm md:text-base font-bold md:font-medium">
                                customer@mail.com
                            </span>
                        </div>
                    </div>
                    <BalanceSheet className="w-full my-8 pt-4">
                        <div className="hidden w-full md:flex items-center justify-between py-4 px-4 md:px-8">
                            <div className="w-2/3 lg:w-3/4 flex justify-start">
                                <div className="w-1/2 text-xs md:text-base font-light">
                                    Item Name
                                </div>
                                <div className="w-1/2 flex items-center justify-between px-2">
                                    <span className="text-xs md:text-base font-light">
                                        QTY
                                    </span>
                                    <span className="text-xs md:text-base font-light">
                                        Price
                                    </span>
                                </div>
                            </div>
                            <div className="w-1/3 lg:w-1/4 text-xs md:text-base font-light text-right">
                                Total
                            </div>
                        </div>
                        {['1', '2', '3', '4'].map((itm) => (
                            <div
                                key={itm}
                                className="w-full flex items-center justify-between py-3 px-3 md:px-8"
                            >
                                <div className="w-1/2 md:w-2/3 lg:w-3/4 flex flex-wrap md:flex-nowrap justify-start">
                                    <div className="w-full md:w-1/2 text-xs md:text-base font-bold md:font-medium">
                                        Logo Design
                                    </div>
                                    <div className="w-full flex md:w-1/2 items-center md:justify-between md:px-2">
                                        <span className="md:px-2 text-xs md:text-base font-light">
                                            2
                                        </span>
                                        <span className="md:hidden p-1 text-xs font-light">
                                            X
                                        </span>
                                        <span className="text-xs md:text-base font-light">
                                            NGN2500
                                        </span>
                                    </div>
                                </div>

                                <div className="w-1/2 md:w-1/3 lg:w-1/4 text-xs md:text-base font-bold md:font-medium text-right">
                                    NGN 5000
                                </div>
                            </div>
                        ))}
                        <SumtotalWrapper className="w-full flex items-center justify-between mt-4 py-4 md:py-8 px-4 md:px-8">
                            <span className="text-sm md:text-base text-left font-bold md:font-medium">
                                Total
                            </span>
                            <span className="text-lg md:text-xl text-right font-bold md:font-medium">
                                NGN2565534
                            </span>
                        </SumtotalWrapper>
                    </BalanceSheet>
                </InvoiceDetailsCard>
                <MobileActionBar className="action-bar md:hidden w-full flex items-center justify-end px-2 py-6 absolute bottom-0 left-0 right-0">
                    <Button onClick={onShowInvoiceForm} size="small">
                        Edit
                    </Button>
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
            {showInvoiceForm && (
                <ModalWrapper
                    modalPosition="fixed"
                    contentPosition="left"
                    onClose={onCloseInvoiceForm}
                >
                    <FormWrapper className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-1/2 2xl:w-2/5">
                        <div className="w-full flex justify-end py-4 px-4">
                            <CloseModalButtonWrapper
                                onClick={onCloseInvoiceForm}
                                className="text-lg md:text-xl"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </CloseModalButtonWrapper>
                        </div>
                        <InvoiceForm action="Edit" />
                    </FormWrapper>
                </ModalWrapper>
            )}
        </>
    )

    function onShowInvoiceForm() {
        setShowInvoiceForm(true)
    }
    function onCloseInvoiceForm() {
        setShowInvoiceForm(false)
    }
}

export default Invoice
