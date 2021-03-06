import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/button'
import { Colour } from '../../lib/colour'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronRight,
    faCircle,
    faPlusCircle,
    faSpinner,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { Link, RouteComponentProps } from 'react-router-dom'
import { getUrlString, Routes } from '../../components/navigation/routes'
import { ModalWrapper } from '../../components/modalWrapper'
import InvoiceForm from '../../components/invoiceForm'
import Badge, { getVariantColor } from '../../components/badge'
import { Variant } from '../../lib/variants'
import {
    CreateInvoiceService,
    ReadAllInvoiceService,
} from '../../services/request'
import { IInvoice, IInvoiceInput, IInvoiceStatus } from '../../lib/types'

const Wrapper = styled.section`
    min-height: 100vh;
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${Colour.darkBlueAlt};
    background-color: ${Colour.whiteSmoke};

    @media only screen and (min-width: 1024px) {
        margin-top: 0;
    }
`

const TopBar = styled.section`
    width: 100%;
    border-bottom: 1px solid ${Colour.lightGray};
    background-color: ${Colour.whiteSmoke};
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;

    & > div {
        width: 100%;
        height: 100px;
        padding: 24px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media only screen and (min-width: 640px) {
        & > div {
            width: 90%;
        }
    }

    @media only screen and (min-width: 1020px) {
        & > div {
            width: 70%;
        }
    }
`

const InvoiceListWrapper = styled.section`
    margin: 16px 0;
    padding: 16px;
    width: 100%;

    @media only screen and (min-width: 640px) {
        width: 90%;
    }

    @media only screen and (min-width: 1020px) {
        width: 70%;
    }
`

const InvoiceCardWrapper = styled.div`
    width: 100%;
    margin: 18px 0;
    padding: 18px;
    display: grid;
    grid-template-areas:
        'id cus-name'
        'id cus-name'
        'date status'
        'amount status';
    border-radius: 12px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: ${Colour.white};
    cursor: pointer;

    &:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    & > * {
        display: flex;
    }

    & .invoice-id,
    .invoice-cus-name {
        margin-bottom: 8px;
        padding: 2px 0;
    }

    & .invoice-id {
        grid-area: id;
    }

    & .invoice-date {
        grid-area: date;
    }

    & .invoice-amount {
        grid-area: amount;
    }

    & .invoice-cus-name {
        justify-content: flex-end;
        grid-area: cus-name;
    }

    & .invoice-status {
        align-items: flex-end;
        justify-content: flex-end;
        grid-area: status;
    }

    @media only screen and (min-width: 767px) {
        padding: 24px;
        box-shadow: rgba(99, 99, 99, 0.1) 0px 1px 4px 0px;
        grid-template-areas: 'id date cus-name amount status';

        & .invoice-id,
        .invoice-cus-name,
        .invoice-amount,
        .invoice-status,
        .invoice-date {
            margin: 0;
            padding: 0;
            align-items: center;
        }

        & .invoice-id,
        .invoice-cus-name,
        .invoice-amount,
        .invoice-date {
            margin: 0;
            padding: 0;
            align-items: center;
            justify-content: flex-start;
        }
    }
`

const FormWrapper = styled.section`
    height: 100vh;
    overflow-y: auto;
    background-color: ${Colour.white};

    & span.error {
        font-size: 16px;
        padding: 2px 8px;
        color: ${Colour.danger};

        @media only screen and (min-width: 767px) {
            font-size: 18px;
        }
    }
`
const CloseModalButtonWrapper = styled.span`
    width: fit-content;
    height: fit-content;
    padding: 4px;
    cursor: pointer;
`
const IconWrapper = styled.span<{ size?: string }>`
    ${({ size }) => size && `font-size: ${size};`}
    display: inline-block;
    width: fit-content;
    height: fit-content;
`
const StatusWrapper = styled.section<{ color: string }>`
    margin: 16px 0;
    padding: 16px;
    height: calc(70vh);
    color: ${({ color }) => color};
`

const Invoices: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [submitError, setSubmitError] = useState<string>('')
    const [showInvoiceForm, setShowInvoiceForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [invoices, setInvoices] = useState<IInvoice[]>()

    useEffect(() => {
        let isMounted = true
        const getAllInvoices = async () => {
            setLoading(true)
            const invoicesData = await ReadAllInvoiceService()
            if (isMounted) {
                setInvoices(invoicesData)
                setLoading(false)
            }
        }
        getAllInvoices()
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <>
            <Wrapper className="w-full">
                <TopBar>
                    <div>
                        <div className="flex flex-col">
                            <h1 className="text-xl sm:text-2xl md:text-4xl leading-snug md:leading-normal">
                                Invoices
                            </h1>
                            {invoices && invoices.length > 0 && (
                                <>
                                    <span className="hidden md:inline text-sm">
                                        There are {invoices.length} total
                                        invoices
                                    </span>
                                    <span className="md:hidden text-xs">
                                        {invoices.length} total invoices
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Button
                                className="hidden md:inline flex items-center"
                                onClick={onShowInvoiceForm}
                                primary
                            >
                                <IconWrapper className="pr-1" size="16px">
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </IconWrapper>
                                New Invoice
                            </Button>
                            <Button
                                className="md:hidden flex items-center"
                                onClick={onShowInvoiceForm}
                                size="small"
                                primary
                            >
                                <IconWrapper className="pr-1" size="12px">
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </IconWrapper>
                                New
                            </Button>
                        </div>
                    </div>
                </TopBar>

                {loading ? (
                    <StatusWrapper
                        color={Colour.primaryBlue}
                        className="w-full flex items-center justify-center"
                    >
                        <FontAwesomeIcon
                            size="5x"
                            icon={faSpinner}
                            className="fa-spin"
                        />
                    </StatusWrapper>
                ) : invoices ? (
                    invoices?.length > 0 ? (
                        <InvoiceListWrapper>
                            {invoices.map((invoice) => (
                                <Link
                                    to={`${getUrlString(Routes.Invoice)}${
                                        invoice.id
                                    }`}
                                    key={invoice.id}
                                >
                                    <InvoiceCardWrapper>
                                        <span className="invoice-id text-sm md:text-base font-bold md:font-medium">
                                            {invoice.invoiceNumber ||
                                                '#XARTG012'}
                                        </span>
                                        <span className="invoice-date text-sm md:text-base font-light">
                                            Due{' '}
                                            {new Date(
                                                invoice.paymentTerms
                                            ).toLocaleDateString() ||
                                                '19 Aug 2021'}
                                        </span>
                                        <span className="invoice-cus-name text-sm md:text-base font-light">
                                            {invoice.clientName || 'Alex Grim'}
                                        </span>
                                        <span className="invoice-amount text-base md:text-lg font-bold md:font-medium">
                                            {`NGN${
                                                invoice.totalAmount || 'NGN5236'
                                            }`}
                                        </span>
                                        <div className="invoice-status">
                                            <Badge
                                                variantColor={getVariantColor(
                                                    invoice.status ===
                                                        IInvoiceStatus.PENDING
                                                        ? Variant.Warning
                                                        : invoice.status ===
                                                          IInvoiceStatus.DRAFT
                                                        ? Variant.Neutral
                                                        : Variant.Success
                                                )}
                                            >
                                                <IconWrapper
                                                    className="pr-1"
                                                    size="8px"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCircle}
                                                    />
                                                </IconWrapper>
                                                <span className="text-sm">
                                                    {invoice.status.toUpperCase()}
                                                </span>
                                            </Badge>
                                            <span className="pl-4 cursor-pointer hidden md:inline-block">
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                />
                                            </span>
                                        </div>
                                    </InvoiceCardWrapper>
                                </Link>
                            ))}
                        </InvoiceListWrapper>
                    ) : (
                        <StatusWrapper
                            color={Colour.gray}
                            className="w-full flex items-center justify-center text-xl text-center"
                        >
                            Guess you have no invoice at the moment, Your
                            invoices will be here
                        </StatusWrapper>
                    )
                ) : (
                    <StatusWrapper
                        color={Colour.gray}
                        className="w-full flex items-center justify-center text-xl text-center"
                    >
                        Sorry, An error occurred while loading your List of
                        invoices
                    </StatusWrapper>
                )}
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
                        <div className="flex justify-center text-center">
                            {submitError && (
                                <span className="error">{submitError}</span>
                            )}
                        </div>
                        <InvoiceForm
                            error={submitError}
                            submitLoading={submitLoading}
                            onDiscard={onCloseInvoiceForm}
                            action="New"
                            onSubmitNewInvoice={onSubmitNewInvoice}
                        />
                    </FormWrapper>
                </ModalWrapper>
            )}
        </>
    )

    function onShowInvoiceForm() {
        setShowInvoiceForm(true)
    }
    function onCloseInvoiceForm() {
        setSubmitError('')
        setShowInvoiceForm(false)
    }
    async function onSubmitNewInvoice(inputData: IInvoiceInput) {
        setSubmitError('')
        setSubmitLoading(true)
        const invoiceData = await CreateInvoiceService(inputData)
        if (invoiceData && invoiceData.id) {
            const invoicesData = await ReadAllInvoiceService()
            setSubmitLoading(false)
            if (invoicesData && invoicesData.length) {
                onCloseInvoiceForm()
                setInvoices(invoicesData)
            }
        } else {
            setSubmitError('Sorry Invoice creation failed.')
            setSubmitLoading(false)
            if (invoiceData && invoiceData.message) {
            }
        }
    }
}

export default Invoices
