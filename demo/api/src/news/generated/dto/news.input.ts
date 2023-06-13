// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { BlockInputInterface, isBlockInputInterface } from "@comet/blocks-api";
import { DamImageBlock, IsSlug, RootBlockInputScalar } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { NewsContentBlock } from "../../blocks/news-content.block";
import { NewsCategory } from "../../entities/news.entity";

@InputType()
export class NewsInput {
    @IsNotEmpty()
    @IsString()
    @IsSlug()
    @Field()
    slug: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    title: string;

    @IsNotEmpty()
    @IsDate()
    @Field()
    date: Date;

    @IsNotEmpty()
    @IsEnum(NewsCategory)
    @Field(() => NewsCategory)
    category: NewsCategory;

    @IsNotEmpty()
    @Field(() => RootBlockInputScalar(DamImageBlock))
    @Transform(({ value }) => (isBlockInputInterface(value) ? value : DamImageBlock.blockInputFactory(value)), { toClassOnly: true })
    @ValidateNested()
    image: BlockInputInterface;

    @IsNotEmpty()
    @Field(() => RootBlockInputScalar(NewsContentBlock))
    @Transform(({ value }) => (isBlockInputInterface(value) ? value : NewsContentBlock.blockInputFactory(value)), { toClassOnly: true })
    @ValidateNested()
    content: BlockInputInterface;
}
