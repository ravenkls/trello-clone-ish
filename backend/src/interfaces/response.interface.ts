export type responseInterface =
  | errorResponseInterface
  | successResponseInterface;

interface errorResponseInterface extends baseResponseInterface {
  error: {
    message: string | string[];
  };
}

interface successResponseInterface extends baseResponseInterface {
  data: any;
}

interface baseResponseInterface {
  success: boolean;
}
