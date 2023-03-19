export const paginate = <A>(
  array: A[],
  pageSize: number,
  pageNumber: number
): A[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
