export default function calculateDateDifference(startDate: Date, endDate: Date) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDifference = end - start;
    return Math.floor(timeDifference / (1000 * 3600 * 24));
}