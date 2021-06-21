export enum TimeDifference {
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
}

export function getTimeFromDate(
    difference: number,
    difType: TimeDifference,
    initialDate?: Date
): Date | null {
    if (
        typeof difference !== 'number' ||
        !Object.values(TimeDifference).includes(difType)
    ) {
        return null
    }

    const differenceMap = {
        year: 0,
        month: 0,
        day: 0,
    }

    differenceMap[difType] = difference

    return new Date(
        (initialDate ? new Date(initialDate) : new Date()).getFullYear() +
            differenceMap.year,
        (initialDate ? new Date(initialDate) : new Date()).getMonth() +
            differenceMap.month,
        (initialDate ? new Date(initialDate) : new Date()).getDate() +
            differenceMap.day
    )
}
