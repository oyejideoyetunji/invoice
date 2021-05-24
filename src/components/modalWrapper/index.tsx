import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'

const Modal = styled.section`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    cursor: pointer;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background: ${Colour.whiteModalBackground};

    & > * {
        cursor: default;
    }
`
interface ModalWrapperProps {
    onClose(): void
    children: ReactNode
}

export const ModalWrapper: FC<ModalWrapperProps> = (
    props: ModalWrapperProps
) => {
    return <Modal onClick={onModalClick}>{props.children}</Modal>

    function onModalClick(event: React.MouseEvent<HTMLElement>) {
        if (event.target === event.currentTarget) {
            props.onClose()
        }
    }
}
