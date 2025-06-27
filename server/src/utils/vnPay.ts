function sortObject(obj: any) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    if (key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType') {
      sorted[key] = obj[key];
    }
  }
  return sorted;
}


export {
  sortObject
};
