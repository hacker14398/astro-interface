const getMultiplierV2 = (total: string, amount: string) => {
  let totalFloat = parseFloat(total)
  let amountFloat = parseFloat(amount)
  if (!totalFloat) {
    return 0;
  }

  if (totalFloat==0 || amountFloat==0) {
    return 0;
  }


  return (totalFloat/amountFloat).toFixed(1);
};

export default getMultiplierV2;
