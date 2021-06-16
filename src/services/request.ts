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
        const { data } = await axios.post(`${baseUrl}/api/login`, payload)
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function SignUpService(payload: SignUpData): Promise<AuthData> {
    try {
        const { data } = await axios.post(`${baseUrl}/api/user`, payload)
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function CreateInvoiceService(
    payload: IInvoiceInput
): Promise<IInvoiceResponse> {
    try {
        const { data } = await axios.post(`${baseUrl}/api/invoices`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return data
    } catch (error) {
        return error.response.data
    }
}
