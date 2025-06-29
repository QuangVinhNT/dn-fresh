export default function formatNumberVN(numberFormat: number) {
  const isNegative = numberFormat < 0;
  const absoluteNumber = Math.abs(numberFormat);

  let result = '';

  if (absoluteNumber >= 1_000_000_000) {
    result = (absoluteNumber / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' tỷ';
  } else if (absoluteNumber >= 1_000_000) {
    result = (absoluteNumber / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' triệu';
  } else if (absoluteNumber >= 1_000) {
    result = (absoluteNumber / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    result = absoluteNumber.toString();
  }

  return isNegative ? `-${result}` : result;
}
