export const formatPublicationDate = (date: string | null) => {
    if (!date) return '출판일 정보 없음';

    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();

    return `${year}년 ${month}월 ${day}일`;
};