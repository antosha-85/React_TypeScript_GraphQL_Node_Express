import React, { FunctionComponent, ReactNode } from 'react'

interface Props {
    title:string;
    // children: ReactNode
}
export const Listings = ({title}: Props) => {
    return <h2>{title}</h2>
}
// export const Listings2:FunctionComponent<Props> = ({title, children}) => {
//     return <h2>{title}</h2>
// }