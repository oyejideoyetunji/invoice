import axios from 'axios'
import { AuthData, LoginData, SignUpData } from '../lib/types'

const baseUrl = 'https://sthackup-invoice-service.herokuapp.com'

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
