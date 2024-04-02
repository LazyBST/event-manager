import { TObject } from '@sinclair/typebox';
export interface ValidatorFactoryReturn<T> {
    schema: TObject;
    verify: (data: T) => T;
}
