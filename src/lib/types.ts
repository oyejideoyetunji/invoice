export interface AuthUser {
    firstName: string
    lastName: string
    email: string
    id: string
}

export interface AuthData {
    token: string | null
    user_data: AuthUser | null
    message?: string
}

export interface SignUpData {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export enum StoreKey {
    USER = 'current_user',
    TOKEN = 'token',
    Theme = 'theme',
}

export enum IInvoiceStatus {
    DRAFT = 'draft',
    PENDING = 'pending',
    PAID = 'paid',
}

export interface IInvoiceItem {
    name: string
    price: number
    quantity: number
    total: number
}

export interface ILabeledInvoiceItem {
    tempId: string
    name: string
    price: number
    quantity: number
    total: number
}

export interface IInvoiceInput {
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
    invoiceDate: Date
    paymentTerms: Date
    transactionDescription: string
    totalAmount: number
    status: IInvoiceStatus
    itemList: IInvoiceItem[]
}

export interface IInvoice {
    id: string
    user: string
    invoiceNumber: string
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
    invoiceDate: Date
    paymentTerms: Date
    transactionDescription: string
    totalAmount: number
    status: IInvoiceStatus
    itemList: IInvoiceItem[]
}

export interface IInvoiceResponse {
    id: string
    user: string
    invoiceNumber: string
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
    invoiceDate: Date
    paymentTerms: Date
    transactionDescription: string
    totalAmount: number
    status: IInvoiceStatus
    itemList: IInvoiceItem[]
    message?: string
}

export interface Option<T> {
    label: string
    value: T
}

export enum EInvoiceInput {
    marchantStreet = 'marchantStreet',
    marchantCity = 'marchantCity',
    marchantPostCode = 'marchantPostCode',
    marchantCountry = 'clientName',
    clientName = 'clientName',
    clientEmail = 'clientEmail',
    clientStreet = 'clientStreet',
    clientCity = 'clientCity',
    clientPostCode = 'clientPostCode',
    clientCountry = 'clientCountry',
    invoiceDate = 'invoiceDate',
    paymentTerms = 'paymentTerms',
    transactionDescription = 'transactionDescription',
    totalAmount = 'totalAmount',
    status = 'status',
    itemList = 'itemList',
}
