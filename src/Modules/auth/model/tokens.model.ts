import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokenModel {

    @Field()
    access_token: string

    @Field()
    refresh_token: string

}
