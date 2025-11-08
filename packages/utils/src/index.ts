type ValueType = string | object | number | null | undefined | Array<ValueType>;
/**
 * 빈 객체/값인지 확인합니다.
 * @param value - 확인할 값
 * @returns 빈 객체/값인지 여부
 */
export const isEmpty = (value: ValueType) => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

/**
 * 배열인지 확인합니다.
 * @param value - 확인할 값
 * @returns 배열인지 여부
 */
export const isArray = (value: ValueType): value is Array<ValueType> => {
  return Array.isArray(value);
};

/**
 * 객체인지 확인합니다.
 * @param value - 확인할 값
 * @returns 객체인지 여부
 */
export const isObject = (value: ValueType): value is object => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * 문자열인지 확인합니다.
 * @param value - 확인할 값
 * @returns 문자열인지 여부
 */
export const isString = (value: ValueType): value is string => {
  return typeof value === "string";
};

/**
 * 숫자인지 확인합니다.
 * @param value - 확인할 값
 * @returns 숫자인지 여부
 */
export const isNumber = (value: ValueType): value is number => {
  return typeof value === "number";
};
