import { TObject } from '@sinclair/typebox';
import { ValidatorFactoryReturn } from '../interface/schema-validator';
export declare const validatorFactory: <T>(schema: TObject) => ValidatorFactoryReturn<T>;
