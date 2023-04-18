// This file has been generated by comet api-generator on 2023-04-18
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { OffsetBasedPaginationArgs } from "@comet/cms-api";
import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

import { NewsContentScope } from "../../entities/news.entity";
import { NewsFilter } from "./news.filter";
import { NewsSort } from "./news.sort";

@ArgsType()
export class NewsListArgs extends OffsetBasedPaginationArgs {
    @Field(() => NewsContentScope)
    @ValidateNested()
    @Type(() => NewsContentScope)
    scope: NewsContentScope;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    @Field(() => NewsFilter, { nullable: true })
    @ValidateNested()
    @Type(() => NewsFilter)
    filter?: NewsFilter;

    @Field(() => [NewsSort], { nullable: true })
    @ValidateNested({ each: true })
    @Type(() => NewsSort)
    sort?: NewsSort[];
}
