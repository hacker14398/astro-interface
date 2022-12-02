const numToArray = (num: number) => {
  let arr: any[] = [];
  for (let i = 0; i < num; i++) {
    arr.push({ id: i });
  }
  return arr;
};
export default numToArray;
