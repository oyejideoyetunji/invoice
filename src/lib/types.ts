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
