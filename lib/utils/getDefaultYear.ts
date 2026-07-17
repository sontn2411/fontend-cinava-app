/**
 * Trả về năm mặc định cho filter phim.
 * Tháng 1–2: dùng năm trước (chưa đủ phim năm mới).
 * Tháng 3 trở đi: dùng năm hiện tại.
 */
export function getDefaultYear(): number {
    const now = new Date();
    return now.getMonth() < 2 ? now.getFullYear() - 1 : now.getFullYear();
}
