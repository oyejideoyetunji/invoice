import axios from 'axios'

const baseUrl = 'http://localhost:8080'

export async function loginService(payload: any): Promise<any> {
    try {
        const { data } = await axios.post(`${baseUrl}/api/login`, payload)
        if (data) {
            console.log(data)
        }
    } catch (err) {
        console.log(err)
    }
}
