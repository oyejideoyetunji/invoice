import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/button'
import { Colour } from '../../lib/colour'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getUrlString, Routes } from '../../components/navigation/routes'
import { ModalWrapper } from '../../components/modalWrapper'
import InvoiceForm from '../../components/invoiceForm'

const Wrapper = styled.section`
    margin: 32px 0;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopBar = styled.section`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const InvoiceListWrapper = styled.section`
    margin: 24px 0;
    width: 70%;
`

const InvoiceCardWrapper = styled.div`
    width: 100%;
    margin: 8px 0;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 12px;
    box-shadow: 2px 2px 4px ${Colour.lightGray};
`

const FormWrapper = styled.section`
    width: 40%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: auto;
    background-color: ${Colour.elementsBackground};
`

const Invoices: FC = () => {
    const [showInvoiceForm, setShowInvoiceForm] = useState<boolean>(false)

    return (
        <>
            <Wrapper className="w-full">
                <TopBar>
                    <div className="flex flex-col">
                        <h2>Invoices</h2>
                        <span>There are 7 total invoices</span>
                    </div>
                    <div className="flex items-center">
                        <Button onClick={onShowInvoiceForm} primary>
                            New Invoice
                        </Button>
                    </div>
                </TopBar>

                <InvoiceListWrapper>
                    {['1', '2', '3', '4'].map((itm) => (
                        <InvoiceCardWrapper key={itm}>
                            <span>#XARTG012</span>
                            <span>Due 19 Aug 2021</span>
                            <span>Alex Grim</span>
                            <span>NGN5236</span>
                            <div>
                                <span>Paid</span>
                                <span className="px-4 cursor-pointer">
                                    <Link
                                        to={`${getUrlString(
                                            Routes.Invoice
                                        )}XARTG012`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </Link>
                                </span>
                            </div>
                        </InvoiceCardWrapper>
                    ))}
                </InvoiceListWrapper>
            </Wrapper>
            {showInvoiceForm && (
                <ModalWrapper onClose={onCloseInvoiceForm}>
                    <FormWrapper>
                        <InvoiceForm />
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

export default Invoices
