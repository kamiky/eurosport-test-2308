import * as datetimeUtils from "utils/datetime";

describe("Timezones", () => {
  it("should always be UTC", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});

describe("Testing datetime utils : formatDatetime", () => {
  it("should return formatted date", () => {
    const result = datetimeUtils.formatDatetime("2022-01-31T07:12:00.000Z");
    expect(result).toBe("31/01/2022 07:12:00");
  });

  it("should throw an error with an invalid string passed", () => {
    expect(() => {
      const result = datetimeUtils.formatDatetime("test" as any);
    }).toThrow("Invalid time value");
  });

  it('should return "01/01/1970 00:00:00" with a number passed', () => {
    const result = datetimeUtils.formatDatetime(12 as any);
    expect(result).toBe("01/01/1970 00:00:00");
  });

  it('should return "01/01/1970 00:00:00" with null passed', () => {
    const result = datetimeUtils.formatDatetime(null as any);
    expect(result).toBe("01/01/1970 00:00:00");
  });

  it('should return "01/01/1970 00:00:00" with undefined passed', () => {
    expect(() => {
      const result = datetimeUtils.formatDatetime(undefined as any);
    }).toThrow("Invalid time value");
  });

  it('should return "01/01/1970 00:00:00" with -1 passed', () => {
    const result = datetimeUtils.formatDatetime(-1 as any);
    expect(result).toBe("31/12/1969 23:59:59");
  });
});
