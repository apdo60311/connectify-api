export interface ResponseModel<T> {
    success: boolean;
    code: Number;
    message?: string;
    data?: T;
    error?: string;
}
  