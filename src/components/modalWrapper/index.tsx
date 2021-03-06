import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { Colour } from '../../lib/colour'

const Modal = styled.section<{
    modalPosition?: 'absolute' | 'fixed'
    contentPosition?: 'left' | 'right' | 'center'
}>`
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    position: ${({ modalPosition }) => modalPosition || 'absolute'};
    cursor: pointer;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background: ${Colour.whiteModalBackground};

    ${({ contentPosition }) =>
        contentPosition === 'left'
            ? `
        align-items: flex-start;
        justify-content: flex-start;
    `
            : contentPosition === 'right'
            ? `   align-items: flex-start;
        justify-content: flex-end;
    `
            : `
        align-items: center;
        justify-content: center;
    `}

    & > * {
        cursor: default;
    }
`
interface ModalWrapperProps {
    onClose(): void
    children: ReactNode
    modalPosition?: 'absolute' | 'fixed'
    contentPosition?: 'left' | 'right' | 'center'
}

export const ModalWrapper: FC<ModalWrapperProps> = (
    props: ModalWrapperProps
) => {
    return (
        <Modal
            modalPosition={props.modalPosition}
            contentPosition={props.contentPosition}
            onClick={onModalClick}
        >
            {props.children}
        </Modal>
    )

    function onModalClick(event: React.MouseEvent<HTMLElement>) {
        if (event.target === event.currentTarget) {
            props.onClose()
        }
    }
}
