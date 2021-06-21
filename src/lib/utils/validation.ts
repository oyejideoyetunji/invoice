import {
    EInvoiceValidationInput,
    EInvoiceValidationResults,
    ILabeledInvoiceItem,
} from '../types'

export interface ValidateInvoiceDataArgs {
    marchantStreet: string
    marchantCity: string
    marchantPostCode: string
    marchantCountry: string
    clientName: string
    clientEmail: string
    clientStreet: string
    clientCity: string
    clientPostCode: string
    clientCountry: string
    transactionDescription: string
}

interface ValidationResults {
    marchantStreetError: string
    marchantCityError: string
    marchantPostCodeError: string
    marchantCountryError: string
    clientNameError: string
    clientEmailError: string
    clientStreetError: string
    clientCityError: string
    clientPostCodeError: string
    clientCountryError: string
    transactionDescriptionError: string
}

export function isEmpty(value: string): boolean {
    return !value || !value.trim()
}

export function isInvalidString(value: string): boolean {
    return !value || value.trim().length < 3
}

export function isEmailInvalid(email: string): boolean {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    return !email || !emailRegex.test(email.trim())
}

export function validateInvoiceData(
    data: ValidateInvoiceDataArgs,
    itemListData: ILabeledInvoiceItem[]
): {
    isValid: boolean
    validatedItemList: ILabeledInvoiceItem[]
} & ValidationResults {
    let isValid = true
    const validationResults: ValidationResults = {
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
    }

    for (const field in data) {
        if (
            isEmpty(data[field as EInvoiceValidationInput]) ||
            isInvalidString(data[field as EInvoiceValidationInput])
        ) {
            isValid = false
            validationResults[`${field}Error` as EInvoiceValidationResults] =
                'this field is required'
        } else if (
            field === 'clientEmail' &&
            isEmailInvalid(data[field as EInvoiceValidationInput])
        ) {
            isValid = false
            validationResults.clientEmailError = 'invalid email format'
        }
    }

    const validatedItemList = itemListData.map((item) => {
        if (
            isEmpty(item.name) ||
            isInvalidString(item.name) ||
            !item.price ||
            !item.quantity
        ) {
            isValid = false
            return {
                ...item,
                error: 'invalid item entry',
            }
        } else {
            return item
        }
    })

    return { ...validationResults, isValid, validatedItemList }
}
