"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorFactory = void 0;
const compiler_1 = require("@sinclair/typebox/compiler");
const validatorFactory = (schema) => {
    const C = compiler_1.TypeCompiler.Compile(schema);
    const verify = (data) => {
        const isValid = C.Check(data);
        if (isValid) {
            return data;
        }
        throw new Error(JSON.stringify([...C.Errors(data)].map(({ path, message }) => ({ path, message }))));
    };
    return { schema, verify };
};
exports.validatorFactory = validatorFactory;
