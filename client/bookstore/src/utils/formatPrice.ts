export const formatPrice = (price: number) => {
    const roundedPrice = Math.floor(price);
    return roundedPrice.toLocaleString('ko-KR');
};