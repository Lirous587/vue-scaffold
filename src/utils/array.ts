/**
 * 洗牌算法 - Fisher-Yates shuffle
 * @param array 要打乱的数组
 * @returns 打乱后的数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // 创建副本，避免修改原数组
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 数组去重
 * @param array 要去重的数组
 * @returns 去重后的数组
 */
export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * 数组分块
 * @param array 要分块的数组
 * @param size 每块的大小
 * @returns 分块后的二维数组
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
