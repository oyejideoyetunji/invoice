export enum TimeDifference {
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
}

export function getTimeFromNow(
    difference: number,
    difType: TimeDifference
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
        new Date().getFullYear() + differenceMap.year,
        new Date().getMonth() + differenceMap.month,
        new Date().getDate() + differenceMap.day
    )
}
