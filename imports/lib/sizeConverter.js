const scales = ["Б", "КБ", "МБ", "ГБ", "ТБ"];

export const SizeConverter = {
  prettyFileSize(size) {
    let useScales = 0;
    let result = size;
    while (result > 1024) {
      result = result / 1024;
      useScales++;
    }
    const presicion = Math.pow(10, Math.max(useScales - 1, 0));
    return Math.round(result * presicion) / presicion + scales[useScales];
  }
}
