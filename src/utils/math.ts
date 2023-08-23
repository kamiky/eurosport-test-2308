export const notANumber = (value: any) => {
  return (
    value === null ||
    value === undefined ||
    isNaN(value) ||
    Array.isArray(value) ||
    typeof value?.getMonth === "function"
  );
};

export const roundTwoDecimal = (number: number) => {
  if (notANumber(number)) {
    throw new Error("isNaN");
  }
  return Math.round(number * 100) / 100;
};

export const convertGToKG = (weight: number) => {
  if (notANumber(weight)) {
    throw new Error("isNaN");
  }
  if (weight < 0) {
    throw new Error("negative");
  }
  const kg = weight / 1000;
  return roundTwoDecimal(kg);
};

export const convertCMtoM = (height: number) => {
  if (notANumber(height)) {
    throw new Error("isNaN");
  }
  if (height < 0) {
    throw new Error("negative");
  }
  const meters = height / 100;
  return roundTwoDecimal(meters);
};
