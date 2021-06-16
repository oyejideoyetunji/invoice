import axios from 'axios'
import {
    AuthData,
    IInvoiceInput,
    IInvoiceResponse,
    LoginData,
    SignUpData,
    StoreKey,
} from '../lib/types'
import { getStoreData } from '../store'

const baseUrl = 'https://sthackup-invoice-service.herokuapp.com'
const token = getStoreData<string>(StoreKey.TOKEN)

export async function loginService(payload: LoginData): Promise<AuthData> {
    try {
        const response = await axios.post(`${baseUrl}/api/login`, payload)
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}

export async function SignUpService(payload: SignUpData): Promise<AuthData> {
    try {
        const response = await axios.post(`${baseUrl}/api/user`, payload)
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}

export async function CreateInvoiceService(
    payload: IInvoiceInput
): Promise<IInvoiceResponse> {
    try {
        const response = await axios.post(`${baseUrl}/api/invoices`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}

export async function ReadAllInvoiceService(): Promise<IInvoiceResponse[]> {
    try {
        const response = await axios.get(`${baseUrl}/api/invoices`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}

export async function ReadInvoiceService(
    id: string
): Promise<IInvoiceResponse> {
    try {
        const response = await axios.get(`${baseUrl}/api/invoices/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}

export async function UpdateInvoiceService(
    payload: IInvoiceInput,
    id: string
): Promise<IInvoiceResponse> {
    try {
        const response = await axios.put(
            `${baseUrl}/api/invoices/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}

export async function DeleteInvoiceService(
    id: string
): Promise<IInvoiceResponse> {
    try {
        const response = await axios.delete(`${baseUrl}/api/invoices/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response?.data
    } catch (error) {
        return error?.response?.data
    }
}
