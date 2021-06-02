import 'react-calendar/dist/Calendar.css'
import ReactCalendar from 'react-calendar'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Input } from '../input'
import { Colour } from '../../lib/colour'

interface CalenderWrapperProps {
    showCalender: boolean
}

const CalenderWrapper = styled.div<CalenderWrapperProps>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    overflow: auto;
    display: ${({ showCalender }) => (showCalender ? '' : 'none')};
    background: ${Colour.whiteModalBackground};

    @media only screen and (max-width: 540px) {
        & > * {
            min-width: 250px;
            max-width: 80%;
        }
    }
`

export interface CalendarProps {
    label?: string
    value: Date
    onChange(value: Date | Date[]): void
}

const Calendar: FC<CalendarProps> = (props: CalendarProps) => {
    const [showCalender, setShowCalender] = useState<boolean>(false)

    function _noop() {
        return null
    }

    function _handleInputFocus() {
        setShowCalender(true)
    }

    function handleCloseCalender(event: React.MouseEvent<HTMLElement>) {
        if (event.target === event.currentTarget) {
            setShowCalender(false)
        }
    }
    return (
        <div className="w-full">
            <Input
                onChange={_noop}
                label={props.label}
                placeholder="___ ___ _______"
                value={props.value.toLocaleDateString()}
                onFocus={_handleInputFocus}
            />
            <CalenderWrapper
                showCalender={showCalender}
                onClick={handleCloseCalender}
                className="flex justify-center items-center w-screen h-screen"
            >
                <ReactCalendar onChange={props.onChange} value={props.value} />
            </CalenderWrapper>
        </div>
    )
}

export default Calendar
