export interface AuthUser {
    firstName: string
    lastName: string
    email: string
    id: string
}

export interface AuthData {
    token: string | null
    user_data: AuthUser | null
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
