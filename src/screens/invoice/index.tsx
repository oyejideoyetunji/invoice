import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'

const Invoice: FC<RouteComponentProps> = (props: RouteComponentProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const id = props.match.params.invoiceId

    return <>{id && <section>Each invoice will be here {id}</section>}</>
}

export default Invoice
