export const convertDateToVietnamTime = (date: Date | null): string => {
    if (!date) return ''; // Nếu không có date, trả về chuỗi rỗng.

    // Tính toán lại thời gian theo múi giờ Việt Nam (UTC +7)
    const vietnamTime = new Date(date.getTime() + (7 * 60 * 60 * 1000));

    // Trả về chuỗi ISO nhưng loại bỏ ký tự 'Z' cuối cùng (vì là UTC)
    return vietnamTime.toISOString().replace('Z', '');
}