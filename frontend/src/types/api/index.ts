import { ErrorStatusCode, SuccessStatusCode } from 'types/common';

export interface ErrorResponse {
	statusCode: ErrorStatusCode;
	payload: null;
	error: string;
	message: null;
}

export type ApiResponse<T> = { data: T };

export interface SuccessResponse<T, P = unknown> {
	statusCode: SuccessStatusCode;
	message: string;
	payload: T;
	error: null;
	params?: P;
}
