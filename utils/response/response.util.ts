import { ResponseModel } from "./response.model"

export const successResponse = <T>(code: Number, data: T, message: string = ''): ResponseModel<T> => {
    return {
        success: true,
        code,
        message,
        data,
    };
};

export const errorResponse = <T>(code: Number, error: string, message: string = ''): ResponseModel<T> => {
    return {
        success: false,
        code,
        message,
        error,
    };
};
