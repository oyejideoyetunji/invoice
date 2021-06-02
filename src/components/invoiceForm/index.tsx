import React, { FC, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'
import Button from '../button'
import Calendar from '../calendar'
import { Input } from '../input'
import { Select } from '../select'
import { H1 } from '../typography'

const StyledForm = styled.form`
    width: 100%;
    min-height: 100vh;
    color: ${Colour.primaryText};

    & .w-30p {
        width: 30%;
    }
    & .w-45p {
        width: 45%;
    }
    & .w-100p {
        width: 100%;
    }

    @media only screen and (min-width: 767px) {
        & .md-w-30p {
            width: 30%;
        }
        & .md-w-45p {
            width: 45%;
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

export interface InvoiceFormProps {
    action: 'New' | 'Edit'
    invoiceData?: Record<string, unknown>
}

const InvoiceForm: FC<InvoiceFormProps> = (props: InvoiceFormProps) => {
    const [invoiceDate, setInvoiceDate] = useState<Date>(new Date())

    return (
        <StyledForm onSubmit={onSubmit} className="relative">
            <div className="w-full px-4 md:px-8 pb-24">
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
                <div className="py-2">
                    <Input label="Street Address" />
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-45p md-w-30p py-2">
                        <Input label="City" />
                    </div>
                    <div className="w-45p md-w-30p py-2">
                        <Input label="Post Code" />
                    </div>
                    <div className="w-100p md-w-30p py-2">
                        <Input label="Country" />
                    </div>
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
                    <Input label="Client's Name" />
                </div>
                <div className="py-2">
                    <Input label="Client's Email" />
                </div>
                <div className="py-2">
                    <Input label="Street Address" />
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-45p md-w-30p py-2">
                        <Input label="City" />
                    </div>
                    <div className="w-45p md-w-30p py-2">
                        <Input label="Post Code" />
                    </div>
                    <div className="w-100p md-w-30p py-2">
                        <Input label="Country" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between py-8">
                    <div className="w-100p md-w-45p py-2">
                        <Calendar
                            onChange={onInvoiceDateChange}
                            value={invoiceDate}
                            label="Invoice Date"
                        />
                    </div>
                    <div className="w-100p md-w-45p py-2">
                        <Select label="Payment Terms">
                            <option>One month time</option>
                        </Select>
                    </div>
                </div>
            </div>
            <ActionBar className="w-full flex items-center justify-end px-2 py-6 absolute bottom-0 left-0 right-0">
                <Button size="small">Save as Draft</Button>
                <span className="px-2" />
                <Button size="small" color={Colour.danger}>
                    Discard
                </Button>
                <span className="px-2" />
                <Button size="small" primary>
                    Submit
                </Button>
            </ActionBar>
        </StyledForm>
    )

    function onInvoiceDateChange(value: Date) {
        setInvoiceDate(value)
    }
    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }
}

export default InvoiceForm
