export const foo = "bar";

export type responseInterface =
  | errorResponseInterface
  | successResponseInterface;

interface errorResponseInterface extends baseResponseInterface {
  errors: { message: string }[];
}

interface successResponseInterface extends baseResponseInterface {
  data?: any[];
}

interface baseResponseInterface {
  success: boolean;
}
