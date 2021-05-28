import React, { FC } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'

const StyledForm = styled.form`
    width: 100%;
    height: fit-content;
    color: ${Colour.darkBlue};
`
export interface InvoiceFormProps {
    action: 'New' | 'Edit'
    invoiceData?: Record<string, unknown>
}

const InvoiceForm: FC<InvoiceFormProps> = (props: InvoiceFormProps) => {
    return (
        <StyledForm className="my-2">
            <h1 className="text-xl sm:text-2xl md:text-4xl leading-snug md:leading-normal">
                {props.action} Invoice
            </h1>
        </StyledForm>
    )
}

export default InvoiceForm
