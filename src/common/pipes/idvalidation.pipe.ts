import { PipeTransform,Injectable,BadRequestException, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationidPipe implements PipeTransform
{
    transform(value: any, metadata: ArgumentMetadata) {
        const val = parseInt(value,10);
        if(isNaN(val) || val<=0)
        {
            throw new BadRequestException('ID MUST BE POSITIVE NUMBER ')
        }
        return val;
    }
    
}