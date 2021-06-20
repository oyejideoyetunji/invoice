import { faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, FC, useState } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import {
    IInvoiceInput,
    ILabeledInvoiceItem,
    IInvoiceStatus,
    Option,
    IInvoice,
} from '../../lib/types'
import { getTimeFromDate, TimeDifference } from '../../lib/utils/dateTime'
import Button from '../button'
import Calendar from '../calendar'
import { Input } from '../input'
import { Select } from '../select'
import { H1, Text } from '../typography'
import { v4 as uuidv4 } from 'uuid'
import {
    isEmailInvalid,
    isEmpty,
    isInvalidString,
    validateInvoiceData,
} from '../../lib/utils/validation'

const StyledForm = styled.form`
    width: 100%;
    min-height: 100vh;
    color: ${Colour.primaryText};

    & .w-30p {
        width: 30%;
    }
    & .w-40p {
        width: 40%;
    }
    & .w-45p {
        width: 45%;
    }
    & .w-50p {
        width: 50%;
    }
    & .w-60p {
        width: 60%;
    }
    & .w-100p {
        width: 100%;
    }

    @media only screen and (min-width: 767px) {
        & .md-w-30p {
            width: 30%;
        }
        & .w-40p {
            width: 40%;
        }
        & .md-w-45p {
            width: 45%;
        }
        & .md-w-50p {
            width: 50%;
        }
        & .md-w-60p {
            width: 60%;
        }
        & .md-w-100p {
            width: 100%;
        }
    }
`

const ActionBar = styled.section`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: ${Colour.white};
`

const ListItemGridWrapper = styled.div`
    width: 100%;

    & span.error {
        font-size: 14px;
        padding: 2px 8px;
        color: ${Colour.danger};
    }
`

const ListItemGrid = styled.div`
    width: 100%;
    display: grid;
    gap: 8px;
    grid-template-areas: 'name qty action' 'price total action';
    grid-template-columns: 6fr 3fr 1fr;

    & .name {
        grid-area: name;
    }
    & .qty {
        grid-area: qty;
    }
    & .price {
        grid-area: price;
    }
    & .total {
        grid-area: total;
    }
    & .action {
        grid-area: action;
    }

    @media only screen and (min-width: 767px) {
        gap: 8px;
        grid-template-areas: 'name qty price total action';
        grid-template-columns: 5fr 2fr 3fr 3fr 1fr;
    }
`

const defaultItemListData = [
    {
        tempId: `${uuidv4()}`,
        error: '',
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
    },
]

export interface InvoiceFormProps {
    action: 'New' | 'Edit'
    submitLoading: boolean
    invoiceData?: IInvoice
    onDiscard?(): void
    onSubmitNewInvoice?(inputData: IInvoiceInput): Promise<void>
    onSubmitInvoiceUpdate?(inputData: IInvoiceInput, id: string): Promise<void>
}

const InvoiceForm: FC<InvoiceFormProps> = (props: InvoiceFormProps) => {
    const [validSubmit, setValidSubmit] = useState<boolean>(true)
    const [textValues, setTextValues] = useState({
        marchantCountry: props?.invoiceData?.marchantCountry || '',
        marchantCity: props?.invoiceData?.marchantCity || '',
        marchantPostCode: props?.invoiceData?.marchantPostCode || '',
        marchantStreet: props?.invoiceData?.marchantStreet || '',
        clientName: props?.invoiceData?.clientName || '',
        clientEmail: props?.invoiceData?.clientEmail || '',
        clientCountry: props?.invoiceData?.clientCountry || '',
        clientCity: props?.invoiceData?.clientCity || '',
        clientPostCode: props?.invoiceData?.clientPostCode || '',
        clientStreet: props?.invoiceData?.clientStreet || '',
        transactionDescription:
            props?.invoiceData?.transactionDescription || '',
    })

    const [textValueErrors, setTextValueErrors] = useState({
        marchantStreetError: '',
        marchantCityError: '',
        marchantPostCodeError: '',
        marchantCountryError: '',
        clientNameError: '',
        clientEmailError: '',
        clientStreetError: '',
        clientCityError: '',
        clientPostCodeError: '',
        clientCountryError: '',
        transactionDescriptionError: '',
    })

    const [itemListData, setItemListData] = useState<ILabeledInvoiceItem[]>(
        props?.invoiceData?.itemList?.map((itm) => {
            return {
                name: itm.name,
                price: itm.price,
                quantity: itm.quantity,
                total: itm.total,
                tempId: `${uuidv4()}`,
                error: '',
            }
        }) || defaultItemListData
    )

    const [status, setInvoiceStatus] = useState<IInvoiceStatus>(
        props?.invoiceData?.status || IInvoiceStatus.DRAFT
    )

    const [invoiceDate, setInvoiceDate] = useState<Date>(
        props?.invoiceData?.invoiceDate
            ? new Date(props?.invoiceData?.invoiceDate)
            : new Date()
    )

    const paymentTermsOptions: Option<Date>[] = [
        {
            label: 'Immediately',
            value: invoiceDate,
        },
        {
            label: 'Next two days',
            value: getTimeFromDate(2, TimeDifference.DAY, invoiceDate) as Date,
        },
        {
            label: 'Next Seven days',
            value: getTimeFromDate(7, TimeDifference.DAY, invoiceDate) as Date,
        },
        {
            label: 'Next Two weeks',
            value: getTimeFromDate(14, TimeDifference.DAY, invoiceDate) as Date,
        },
        {
            label: 'Next One Month',
            value: getTimeFromDate(
                1,
                TimeDifference.MONTH,
                invoiceDate
            ) as Date,
        },
    ]

    const [paymentTerms, setPaymentTerms] = useState<Date>(
        props?.invoiceData?.paymentTerms
            ? (paymentTermsOptions.find(
                  (opt) =>
                      opt.value.toLocaleDateString() ===
                      new Date(
                          props?.invoiceData?.paymentTerms as Date
                      ).toLocaleDateString()
              )?.value as Date) || paymentTermsOptions[0].value
            : paymentTermsOptions[0].value
    )

    return (
        <StyledForm className="relative">
            <div className="w-full px-4 sm:px-8 pb-24">
                <h1 className="pb-4 text-xl sm:text-2xl md:text-4xl leading-snug md:leading-normal">
                    {props.action} Invoice
                </h1>

                <H1
                    className="py-4"
                    fontSize="16px"
                    fontWeight="600"
                    color={Colour.purpleBlue}
                >
                    Bill From
                </H1>
                <div className="flex flex-wrap justify-between">
                    <div className="w-100p md-w-30p py-2">
                        <Input
                            onChange={onTextValueChange}
                            type="text"
                            name="marchantCountry"
                            value={textValues.marchantCountry}
                            error={textValueErrors.marchantCountryError}
                            label="Country"
                            required
                        />
                    </div>
                    <div className="w-45p md-w-30p py-2">
                        <Input
                            onChange={onTextValueChange}
                            type="text"
                            name="marchantCity"
                            value={textValues.marchantCity}
                            error={textValueErrors.marchantCityError}
                            label="City"
                            required
                        />
                    </div>
                    <div className="w-45p md-w-30p py-2">
                        <Input
                            onChange={onTextValueChange}
                            type="text"
                            name="marchantPostCode"
                            value={textValues.marchantPostCode}
                            error={textValueErrors.marchantPostCodeError}
                            label="Post Code"
                            required
                        />
                    </div>
                </div>
                <div className="py-2">
                    <Input
                        onChange={onTextValueChange}
                        type="text"
                        name="marchantStreet"
                        value={textValues.marchantStreet}
                        error={textValueErrors.marchantStreetError}
                        label="Street Address"
                        required
                    />
                </div>

                <H1
                    className="py-4"
                    fontSize="16px"
                    fontWeight="600"
                    color={Colour.purpleBlue}
                >
                    Bill To
                </H1>
                <div className="py-2">
                    <Input
                        onChange={onTextValueChange}
                        type="text"
                        name="clientName"
                        value={textValues.clientName}
                        error={textValueErrors.clientNameError}
                        label="Client's Name"
                        required
                    />
                </div>
                <div className="py-2">
                    <Input
                        onChange={onTextValueChange}
                        type="text"
                        name="clientEmail"
                        value={textValues.clientEmail}
                        error={textValueErrors.clientEmailError}
                        label="Client's Email"
                        required
                    />
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-100p md-w-30p py-2">
                        <Input
                            onChange={onTextValueChange}
                            type="text"
                            name="clientCountry"
                            value={textValues.clientCountry}
                            error={textValueErrors.clientCountryError}
                            label="Country"
                            required
                        />
                    </div>
                    <div className="w-45p md-w-30p py-2">
                        <Input
                            onChange={onTextValueChange}
                            type="text"
                            name="clientCity"
                            value={textValues.clientCity}
                            error={textValueErrors.clientCityError}
                            label="City"
                            required
                        />
                    </div>
                    <div className="w-45p md-w-30p py-2">
                        <Input
                            onChange={onTextValueChange}
                            type="text"
                            name="clientPostCode"
                            value={textValues.clientPostCode}
                            error={textValueErrors.clientPostCodeError}
                            label="Post Code"
                            required
                        />
                    </div>
                </div>
                <div className="py-2">
                    <Input
                        onChange={onTextValueChange}
                        type="text"
                        name="clientStreet"
                        value={textValues.clientStreet}
                        error={textValueErrors.clientStreetError}
                        label="Street Address"
                        required
                    />
                </div>

                <div className="flex flex-wrap justify-between pt-6">
                    <div className="w-100p md-w-45p py-2">
                        <Calendar
                            onChange={onInvoiceDateChange}
                            value={invoiceDate}
                            label="Invoice Date"
                        />
                    </div>
                    <div className="w-100p md-w-45p py-2">
                        <Select
                            value={paymentTerms.toLocaleDateString()}
                            label="Payment Terms"
                            onChange={onPaymentTermsChange}
                            required
                        >
                            {paymentTermsOptions.map((itm) => (
                                <option
                                    key={itm.label}
                                    value={itm.value.toLocaleDateString()}
                                >
                                    {itm.label}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="py-2">
                    <Input
                        name="transactionDescription"
                        value={textValues.transactionDescription}
                        error={textValueErrors.transactionDescriptionError}
                        onChange={onTextValueChange}
                        label="Transaction Description"
                        placeholder="Transaction Description"
                        required
                    />
                </div>

                <H1
                    className="py-4"
                    fontSize="16px"
                    fontWeight="600"
                    color={Colour.purpleBlue}
                >
                    Item List
                </H1>

                <ListItemGrid className="py-4">
                    <Text className="name text-sm">
                        Name <span className="md:hidden"> - </span>
                    </Text>
                    <Text className="qty text-sm text-center md:text-left">
                        QTY <span className="md:hidden"> - </span>
                    </Text>
                    <Text className="price text-sm md:text-center">Price</Text>
                    <Text className="total text-sm text-center">Total</Text>
                    <Text className="action"></Text>
                </ListItemGrid>

                {itemListData.map((item) => {
                    function onItemChange(
                        event: ChangeEvent<HTMLInputElement>
                    ) {
                        onInvoiceItemInputChange(item.tempId, event)
                    }
                    function onDeleteItem() {
                        onDeleteInvoiceListItem(item.tempId)
                    }
                    return (
                        <ListItemGridWrapper key={item.tempId}>
                            <ListItemGrid className="py-2">
                                <div className="name">
                                    <Input
                                        value={item.name}
                                        name="name"
                                        onChange={onItemChange}
                                        required
                                        placeholder="Item Name"
                                    />
                                </div>
                                <div className="qty">
                                    <Input
                                        value={item.quantity}
                                        name="quantity"
                                        type="number"
                                        onChange={onItemChange}
                                        required
                                        placeholder="Qty"
                                    />
                                </div>
                                <div className="price">
                                    <Input
                                        value={item.price}
                                        name="price"
                                        type="number"
                                        onChange={onItemChange}
                                        required
                                        placeholder="Price"
                                    />
                                </div>
                                <div className="total flex items-center justify-center">
                                    <Text>{item.total || '--------'}</Text>
                                </div>
                                <div
                                    className={`action pt-2 md:pt-0 flex md:items-center justify-center ${
                                        itemListData.length > 1
                                            ? 'cursor-pointer'
                                            : 'cursor-not-allowed'
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        onClick={onDeleteItem}
                                        icon={faTrashAlt}
                                    />
                                </div>
                            </ListItemGrid>
                            <span className="error">{item.error}</span>
                        </ListItemGridWrapper>
                    )
                })}
                <Button
                    type="button"
                    color={Colour.purpleBlue}
                    className="w-full my-2"
                    onClick={onAddNewInvoiceItem}
                >
                    + Add New Item
                </Button>
            </div>
            {props.action === 'New' && (
                <ActionBar className="w-full flex items-center justify-end px-2 py-6 absolute bottom-0 left-0 right-0">
                    <Button onClick={onSaveInvoice} type="button" size="small">
                        {props.submitLoading &&
                        status === IInvoiceStatus.DRAFT ? (
                            <span className="inline-block px-4">
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="fa-spin"
                                />
                            </span>
                        ) : (
                            'Save'
                        )}
                    </Button>
                    <span className="px-2" />
                    <Button
                        onClick={props.onDiscard}
                        type="button"
                        size="small"
                        color={Colour.danger}
                    >
                        Discard
                    </Button>
                    <span className="px-2" />
                    <Button
                        onClick={onSaveInvoiceAsPending}
                        type="button"
                        size="small"
                        primary
                    >
                        {props.submitLoading &&
                        status === IInvoiceStatus.PENDING ? (
                            <span className="inline-block px-4">
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="fa-spin"
                                />
                            </span>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </ActionBar>
            )}
            {props.action === 'Edit' && props?.invoiceData?.id && (
                <ActionBar className="w-full flex items-center justify-end px-2 py-6 absolute bottom-0 left-0 right-0">
                    <Button
                        onClick={props.onDiscard}
                        type="button"
                        size="small"
                        color={Colour.danger}
                    >
                        Cancel
                    </Button>
                    <span className="px-2" />
                    <Button
                        onClick={onSaveInvoiceChanges}
                        type="button"
                        size="small"
                        primary
                    >
                        {props.submitLoading ? (
                            <span className="inline-block px-4">
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="fa-spin"
                                />
                            </span>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </ActionBar>
            )}
        </StyledForm>
    )

    function onTextValueChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name
        const value = event.target.value
        setTextValues({
            ...textValues,
            [name]: value,
        })
        if (!validSubmit) {
            if (isEmpty(value) || isInvalidString(value)) {
                setTextValueErrors({
                    ...textValueErrors,
                    [`${name}Error`]: 'this field is required',
                })
            } else if (name.endsWith('Email') && isEmailInvalid(value)) {
                setTextValueErrors({
                    ...textValueErrors,
                    [`${name}Error`]: 'invalid email format',
                })
            } else {
                setTextValueErrors({
                    ...textValueErrors,
                    [`${name}Error`]: '',
                })
            }
        }
    }

    function onInvoiceDateChange(value: Date) {
        setInvoiceDate(value)
    }
    function onPaymentTermsChange(event: ChangeEvent<HTMLSelectElement>) {
        setPaymentTerms(new Date(event.target.value))
    }

    function onInvoiceItemInputChange(
        itemTempId: string,
        event: ChangeEvent<HTMLInputElement>
    ) {
        const fieldName = event.target.name
        const fieldValue =
            fieldName === 'price' || fieldName === 'quantity'
                ? Number(event.target.value)
                : event.target.value

        setItemListData(
            itemListData.map((item) =>
                item.tempId === itemTempId
                    ? {
                          ...item,
                          [fieldName]: fieldValue,
                          total:
                              fieldName === 'price'
                                  ? item.quantity * Number(fieldValue)
                                  : fieldName === 'quantity'
                                  ? item.price * Number(fieldValue)
                                  : item.total,
                          error: validSubmit
                              ? ''
                              : fieldName === 'name'
                              ? isEmpty(fieldValue as string) ||
                                !Number(item.price) ||
                                !Number(item.quantity)
                                  ? 'invalid item entry'
                                  : ''
                              : fieldName === 'price'
                              ? isEmpty(item.name) ||
                                !Number(fieldValue) ||
                                !Number(item.quantity)
                                  ? 'invalid item entry'
                                  : ''
                              : isEmpty(item.name) ||
                                !Number(fieldValue) ||
                                !Number(item.price)
                              ? 'invalid item entry'
                              : '',
                      }
                    : item
            )
        )
    }

    function onAddNewInvoiceItem() {
        setItemListData([
            ...itemListData,
            {
                tempId: `${uuidv4()}`,
                error: '',
                name: '',
                price: 0,
                quantity: 0,
                total: 0,
            },
        ])
    }

    function onDeleteInvoiceListItem(tempId: string) {
        if (itemListData.length > 1) {
            setItemListData(itemListData.filter((itm) => itm.tempId !== tempId))
        }
    }

    function getSubmittedData(): IInvoiceInput | void {
        const {
            isValid,
            validatedItemList,
            ...errorResults
        } = validateInvoiceData(textValues, itemListData)
        setValidSubmit(isValid)
        if (isValid) {
            const itemList = itemListData.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.total,
            }))

            return {
                ...textValues,
                invoiceDate,
                paymentTerms,
                status,
                itemList,
                totalAmount: itemListData.reduce(
                    (prev, curr) => prev + curr.total,
                    0
                ),
            }
        } else {
            setTextValueErrors(errorResults)
            setItemListData(validatedItemList)
        }
    }

    async function onSaveInvoice() {
        if (props.onSubmitNewInvoice) {
            const invoiceInput = getSubmittedData()
            if (invoiceInput) {
                await props.onSubmitNewInvoice(invoiceInput)
            }
        }
    }

    async function onSaveInvoiceAsPending() {
        setInvoiceStatus(IInvoiceStatus.PENDING)
        await onSaveInvoice()
    }

    async function onSaveInvoiceChanges() {
        if (props.invoiceData && props.onSubmitInvoiceUpdate) {
            const invoiceInput = getSubmittedData()
            if (invoiceInput) {
                await props.onSubmitInvoiceUpdate(
                    invoiceInput,
                    props.invoiceData.id
                )
            }
        }
    }
}

export default InvoiceForm
