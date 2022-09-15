import { HttpResponse } from '../protocols';

export type UseCase = {
  execute: (data: any) => Promise<HttpResponse>;
};
