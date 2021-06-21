import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/button'
import { Colour } from '../../lib/colour'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faCircle,
    faSpinner,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Routes } from '../../components/navigation/routes'
import Badge, { getVariantColor } from '../../components/badge'
import { Variant } from '../../lib/variants'
import { ModalWrapper } from '../../components/modalWrapper'
import InvoiceForm from '../../components/invoiceForm'
import { IInvoice, IInvoiceInput, IInvoiceStatus } from '../../lib/types'
import {
    DeleteInvoiceService,
    ReadInvoiceService,
    UpdateInvoiceService,
} from '../../services/request'

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
const StatusWrapper = styled.section<{ color: string }>`
    margin: 16px 0;
    padding: 16px;
    height: calc(70vh);
    color: ${({ color }) => color};
`
const ErrorText = styled.span`
    font-size: 16px;
    padding: 2px 8px;
    color: ${Colour.danger};

    @media only screen and (min-width: 767px) {
        font-size: 18px;
    }
`

const Invoice: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [submitError, setSubmitError] = useState<string>('')
    const [statusUpdateError, setStatusUpdateError] = useState<string>('')
    const [showInvoiceForm, setShowInvoiceForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [invoice, setInvoice] = useState<IInvoice>()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const id = props.match.params.invoiceId

    useEffect(() => {
        let isMounted = true
        const getInvoice = async () => {
            setLoading(true)
            const invoiceData = await ReadInvoiceService(id)
            if (isMounted) {
                setInvoice(invoiceData)
                setLoading(false)
            }
            setLoading(false)
        }
        getInvoice()

        return () => {
            isMounted = false
        }
    }, [])

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
                ) : invoice && invoice?.id ? (
                    <>
                        {statusUpdateError && (
                            <ErrorText>{statusUpdateError}</ErrorText>
                        )}
                        <ScreenCard className="flex p-6 justify-between my-4">
                            <div className="w-full md:w-auto flex items-center justify-between md:justify-start">
                                <span className="pr-4">Status</span>
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
                                    <IconWrapper className="pr-1" size="8px">
                                        <FontAwesomeIcon icon={faCircle} />
                                    </IconWrapper>
                                    <span className="text-sm">
                                        {invoice.status.toUpperCase()}
                                    </span>
                                </Badge>
                            </div>
                            <div className="hidden md:flex items-center">
                                {invoice.status === IInvoiceStatus.DRAFT && (
                                    <Button onClick={onShowInvoiceForm}>
                                        Edit
                                    </Button>
                                )}
                                <span className="px-2" />
                                {invoice.status !== IInvoiceStatus.PENDING && (
                                    <Button
                                        onClick={onDeleteInvoice}
                                        color={Colour.danger}
                                    >
                                        Delete
                                    </Button>
                                )}
                                <span className="px-2" />
                                {invoice.status === IInvoiceStatus.DRAFT ? (
                                    <Button
                                        onClick={onMoveInvoiceToPending}
                                        color={Colour.warningLight}
                                    >
                                        Move to Pending
                                    </Button>
                                ) : invoice.status ===
                                  IInvoiceStatus.PENDING ? (
                                    <Button
                                        onClick={onMarkInvoiceAsPaid}
                                        primary
                                    >
                                        Mark as paid
                                    </Button>
                                ) : null}
                            </div>
                        </ScreenCard>
                        <InvoiceDetailsCard className="px-3 py-6 sm:px-6 mb-32">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
                                <div className="flex flex-col pb-8 md:pb-0 break-words">
                                    <span className="pb-1 text-sm md:text-base font-bold md:font-medium">
                                        {invoice.invoiceNumber}
                                    </span>
                                    <span className="text-sm md:text-base font-light">
                                        {invoice.transactionDescription}
                                    </span>
                                </div>
                                <span className="text-sm md:text-base font-light">
                                    {invoice.marchantStreet}
                                    <br />
                                    {invoice.marchantCity}
                                    <br />
                                    {invoice.marchantPostCode} <br />
                                    {invoice.marchantCountry}
                                </span>
                            </div>
                            <div className="w-full flex flex-col md:flex-row md:justify-between">
                                <div className="md:w-2/3 flex justify-between">
                                    <div className="flex flex-col justify-between break-words">
                                        <div className="flex flex-col pb-8">
                                            <span className="text-sm md:text-base font-light">
                                                Invoice Date
                                            </span>
                                            <span className="pb-1 text-sm md:text-base font-bold md:font-medium">
                                                {new Date(
                                                    invoice.invoiceDate
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm md:text-base font-light">
                                                Payment Due
                                            </span>
                                            <span className="pb-1 text-sm md:text-base font-bold md:font-medium">
                                                {new Date(
                                                    invoice.paymentTerms
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-3 md:pl-6 break-words">
                                        <span className="text-sm md:text-base font-light">
                                            Bill To
                                        </span>
                                        <span className="py-2 text-sm md:text-base font-bold md:font-medium">
                                            {invoice.clientName}
                                        </span>
                                        <span className="text-sm md:text-base font-light">
                                            {invoice.clientStreet} <br />
                                            {invoice.clientCity} <br />
                                            {invoice.clientPostCode} <br />
                                            {invoice.clientCountry}
                                        </span>
                                    </div>
                                </div>
                                <div className="md:w-1/3 flex flex-col py-8 md:py-0 md:pl-8 break-words">
                                    <span className="pb-1 text-sm md:text-base font-light">
                                        Send to
                                    </span>
                                    <span className="text-sm md:text-base font-bold md:font-medium">
                                        {invoice.clientEmail}
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
                                {invoice.itemList &&
                                    invoice.itemList.length > 0 &&
                                    invoice.itemList.map((itm) => (
                                        <div
                                            key={itm._id}
                                            className="w-full flex items-center justify-between py-3 px-3 md:px-8"
                                        >
                                            <div className="w-1/2 md:w-2/3 lg:w-3/4 flex flex-wrap md:flex-nowrap justify-start">
                                                <div className="w-full md:w-1/2 text-xs md:text-base font-bold md:font-medium">
                                                    {itm.name}
                                                </div>
                                                <div className="w-full flex md:w-1/2 items-center md:justify-between md:px-2">
                                                    <span className="md:px-2 text-xs md:text-base font-light">
                                                        {itm.quantity}
                                                    </span>
                                                    <span className="md:hidden p-1 text-xs font-light">
                                                        X
                                                    </span>
                                                    <span className="text-xs md:text-base font-light">
                                                        {`NGN${itm.price}`}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-1/2 md:w-1/3 lg:w-1/4 text-xs md:text-base font-bold md:font-medium text-right">
                                                {`${itm.total}`}
                                            </div>
                                        </div>
                                    ))}
                                <SumtotalWrapper className="w-full flex items-center justify-between mt-4 py-4 md:py-8 px-4 md:px-8">
                                    <span className="text-sm md:text-base text-left font-bold md:font-medium">
                                        Total
                                    </span>
                                    <span className="text-lg md:text-xl text-right font-bold md:font-medium">
                                        {`${invoice.totalAmount}`}
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
                    </>
                ) : (
                    <StatusWrapper
                        color={Colour.gray}
                        className="w-full flex items-center justify-center text-xl text-center"
                    >
                        Sorry, Invoice not found
                    </StatusWrapper>
                )}
            </Wrapper>
            {showInvoiceForm && invoice && (
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
                            action="Edit"
                            invoiceData={invoice}
                            onSubmitInvoiceUpdate={onSubmitInvoiceUpdate}
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
    async function onSubmitInvoiceUpdate(
        inputData: IInvoiceInput,
        invoiceId: string
    ) {
        setSubmitError('')
        setSubmitLoading(true)
        const invoiceData = await UpdateInvoiceService(inputData, invoiceId)
        if (invoiceData && invoiceData.id) {
            setSubmitLoading(false)
            onCloseInvoiceForm()
            setInvoice(invoiceData)
        } else {
            setSubmitError('Sorry Invoice update failed.')
            setSubmitLoading(false)
            if (invoiceData && invoiceData.message) {
            }
        }
    }
    async function onMarkInvoiceAsPaid() {
        if (invoice) {
            const inputData = { ...invoice, status: IInvoiceStatus.PAID }
            const invoiceData = await UpdateInvoiceService(
                inputData,
                invoice.id
            )

            if (invoiceData && invoiceData.id) {
                setInvoice(invoiceData)
            } else {
                setStatusUpdateError('Sorry, Invoice update to PAID failed')
                setTimeout(function () {
                    setStatusUpdateError('')
                }, 5000)
                if (invoiceData && invoiceData.message) {
                }
            }
        }
    }

    async function onMoveInvoiceToPending() {
        if (invoice) {
            const inputData = { ...invoice, status: IInvoiceStatus.PENDING }
            const invoiceData = await UpdateInvoiceService(
                inputData,
                invoice.id
            )

            if (invoiceData && invoiceData.id) {
                setInvoice(invoiceData)
            } else {
                setStatusUpdateError('Sorry, Invoice update to PENDING failed')
                setTimeout(function () {
                    setStatusUpdateError('')
                }, 5000)
                if (invoiceData && invoiceData.message) {
                }
            }
        }
    }

    async function onDeleteInvoice() {
        const data = await DeleteInvoiceService(id)

        if (data && data?.message) {
            props.history.push('/')
        }
    }
}

export default Invoice
