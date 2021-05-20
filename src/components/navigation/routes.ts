export enum Routes {
    Home = '/',
    Landing = '/landing',
    Invoices = '/invoices',
    Invoice = '/invoice/:invoiceId',
}

export function getUrlString(url: string): string {
    return url.split(':')[0]
}
