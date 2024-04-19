
// YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
export const DATE_REGEX = /^(\d{4})([/]\d{2}[/]|[\-]\d{2}[\-]|[.]\d{2}[.])\d{2}$/;

export const parseDate = (date: string): Date => {
    if (!DATE_REGEX.test(date)) {
        throw Error('Invalid date format. Please use YYYY-MM-DD or YY-MM-DD or YY/MM/DD or YY.MM.DD');
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw Error('Invalid date. Please enter a valid date');
    }
    return parsedDate;
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export const toUTCDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
};