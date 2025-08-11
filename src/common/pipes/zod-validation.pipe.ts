import { PipeTransform,ArgumentMetadata,BadRequestException } from "@nestjs/common";
import {z,ZodError} from 'zod'

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema:z.ZodType){}
    transform(value: any, metadata: ArgumentMetadata) {
        try
        {
            return this.schema.parse(value)
        }
        catch(error)
        {
            if(error instanceof ZodError)
            {
                throw new BadRequestException(error);
            }
            throw error;
        }
    }
}