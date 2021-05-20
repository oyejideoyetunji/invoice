import React, { FC } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
    width: 100%;
    height: fit-content;
`

const InvoiceForm: FC = () => {
    return <StyledForm>Invoice form</StyledForm>
}

export default InvoiceForm
