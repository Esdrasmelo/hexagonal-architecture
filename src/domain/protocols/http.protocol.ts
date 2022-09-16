import { InternalServerError } from '../exceptions/internal-server-error.exception';

export type HttpResponse = {
  statusCode: number;
  body?: object;
};

export type HttpRequest = {
  body?: any;
};

export const ok = (data: HttpRequest): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError(),
});
