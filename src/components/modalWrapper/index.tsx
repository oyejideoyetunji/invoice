import styled from 'styled-components'
import { Colour } from '../../lib/colour'

export const ModalWrapper = styled.section`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    background: ${Colour.whiteModalBackground};
`
