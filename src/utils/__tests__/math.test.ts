import * as mathUtils from "utils/math";

describe("Testing math utils : notANumber", () => {
  it("should return false with -12", () => {
    const result = mathUtils.notANumber(-12 as any);
    expect(result).toBe(false);
  });
  it("should return false with 0", () => {
    const result = mathUtils.notANumber(0 as any);
    expect(result).toBe(false);
  });
  it("should return false with 12", () => {
    const result = mathUtils.notANumber(12 as any);
    expect(result).toBe(false);
  });
  it("should return true with string", () => {
    const result = mathUtils.notANumber("test" as any);
    expect(result).toBe(true);
  });
  it("should return true with array", () => {
    const result = mathUtils.notANumber([] as any);
    expect(result).toBe(true);
  });
  it("should return true with object", () => {
    const result = mathUtils.notANumber({} as any);
    expect(result).toBe(true);
  });
  it("should return true with null", () => {
    const result = mathUtils.notANumber(null as any);
    expect(result).toBe(true);
  });
  it("should return true with undefined", () => {
    const result = mathUtils.notANumber(undefined as any);
    expect(result).toBe(true);
  });
  it("should return true with date", () => {
    const result = mathUtils.notANumber(new Date() as any);
    expect(result).toBe(true);
  });
});

describe("Testing math utils : roundTwoDecimal", () => {
  it('should round "100.1230329" to "100.12"', () => {
    const result = mathUtils.roundTwoDecimal(100.1230329);
    expect(result).toBe(100.12);
  });
  it('should not have decimal with "100"', () => {
    const result = mathUtils.roundTwoDecimal(100);
    expect(result).toBe(100);
  });
  it("should throw an error with an object / array", () => {
    expect(() => {
      const result = mathUtils.roundTwoDecimal({} as any);
    }).toThrow("isNaN");
    expect(() => {
      const result = mathUtils.roundTwoDecimal([] as any);
    }).toThrow("isNaN");
  });
  it("should throw an error with a string passed", () => {
    expect(() => {
      const result = mathUtils.roundTwoDecimal("test" as any);
    }).toThrow("isNaN");
  });
});

describe("Testing math utils : convertGToKG", () => {
  it("should convert 1120.99 to 1.12", () => {
    const result = mathUtils.convertGToKG(1120.99);
    expect(result).toBe(1.12);
  });
  it("should convert 1000 to 1", () => {
    const result = mathUtils.convertGToKG(1000);
    expect(result).toBe(1);
  });
  it("should throw an error with a string passed", () => {
    expect(() => {
      const result = mathUtils.convertGToKG("test" as any);
    }).toThrow("isNaN");
  });

  it("should throw an error with an object / array", () => {
    expect(() => {
      const result = mathUtils.convertGToKG({} as any);
    }).toThrow("isNaN");
    expect(() => {
      const result = mathUtils.convertGToKG([] as any);
    }).toThrow("isNaN");
  });

  it("should throw an error if number is negative", () => {
    expect(() => {
      const result = mathUtils.convertGToKG(-1000 as any);
    }).toThrow("negative");
  });
});

describe("Testing math utils : convertCMtoM", () => {
  it("should convert 112.99 to 1.13", () => {
    const result = mathUtils.convertCMtoM(112.99);
    expect(result).toBe(1.13);
  });
  it("should convert 100 to 1", () => {
    const result = mathUtils.convertCMtoM(100);
    expect(result).toBe(1);
  });
  it("should throw an error with a string passed", () => {
    expect(() => {
      const result = mathUtils.convertCMtoM("test" as any);
    }).toThrow("isNaN");
  });

  it("should throw an error with an object / array", () => {
    expect(() => {
      const result = mathUtils.convertCMtoM({} as any);
    }).toThrow("isNaN");
    expect(() => {
      const result = mathUtils.convertCMtoM([] as any);
    }).toThrow("isNaN");
  });

  it("should throw an error if number is negative", () => {
    expect(() => {
      const result = mathUtils.convertCMtoM(-1000 as any);
    }).toThrow("negative");
  });
});
