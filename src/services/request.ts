import axios from 'axios'
import { AuthData, LoginData, SignUpData } from '../lib/types'

const baseUrl = 'https://sthackup-invoice-service.herokuapp.com'

export async function loginService(
    payload: LoginData
): Promise<AuthData | null> {
    try {
        const { data } = await axios.post(`${baseUrl}/api/login`, payload)
        if (data) {
            // console.log(data)
            return data
        }
        return null
    } catch (_err) {
        // console.log(err)
        return null
    }
}

export async function SignUpService(
    payload: SignUpData
): Promise<AuthData | null> {
    try {
        const { data } = await axios.post(`${baseUrl}/api/user`, payload)
        if (data) {
            // console.log(data)
            return data
        }
        return null
    } catch (_err) {
        // console.log(err)
        return null
    }
}
