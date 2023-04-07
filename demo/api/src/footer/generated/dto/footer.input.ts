import { BlockInputInterface, isBlockInputInterface } from "@comet/blocks-api";
import { RootBlockInputScalar } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

import { FooterContentBlock } from "../../blocks/footer-content.block";

@InputType()
export class FooterInput {
    @IsNotEmpty()
    @Field(() => RootBlockInputScalar(FooterContentBlock))
    @Transform(({ value }) => (isBlockInputInterface(value) ? value : FooterContentBlock.blockInputFactory(value)), { toClassOnly: true })
    @ValidateNested()
    content: BlockInputInterface;
}
