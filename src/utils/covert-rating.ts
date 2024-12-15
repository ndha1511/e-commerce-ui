export const formatRating = (rating: number): string => {
    return rating % 1 === 0
      ? rating.toFixed(0) // Nếu là số nguyên, không hiển thị phần thập phân
      : rating.toFixed(1); // Nếu có phần thập phân, hiển thị 1 chữ số thập phân
  };
  