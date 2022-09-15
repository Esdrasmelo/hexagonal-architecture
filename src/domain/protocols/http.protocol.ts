import { InternalServerError } from '../exceptions/internal-server-error.exception';

export type HttpResponse = {
  status: number;
  body?: any;
};

export type HttpRequest = {
  body?: any;
};

export const ok = (data: HttpRequest): HttpResponse => ({
  status: 200,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error,
});

export const notFound = (error: Error): HttpResponse => ({
  status: 404,
  body: error,
});

export const internalServerError = (): HttpResponse => ({
  status: 500,
  body: new InternalServerError(),
});
