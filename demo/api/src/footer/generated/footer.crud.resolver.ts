import { validateNotModified } from "@comet/cms-api";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Footer } from "../entities/footer.entity";
import { FooterContentScope } from "../entities/footer-content-scope.entity";
import { FooterInput } from "./dto/footer.input";
import { FootersService } from "./footers.service";

@Resolver(() => Footer)
export class FooterCrudResolver {
    constructor(private readonly footersService: FootersService, @InjectRepository(Footer) private readonly repository: EntityRepository<Footer>) {}

    @Query(() => Footer, { nullable: true })
    async footer(@Args("scope", { type: () => FooterContentScope }) scope: FooterContentScope): Promise<Footer | null> {
        const footers = await this.repository.find({ scope });
        if (footers.length > 1) {
            throw new Error("There must be only one footer");
        }

        return footers.length > 0 ? footers[0] : null;
    }

    @Mutation(() => Footer)
    async saveFooter(
        @Args("scope", { type: () => FooterContentScope }) scope: FooterContentScope,
        @Args("input", { type: () => FooterInput }) input: FooterInput,
        @Args("lastUpdatedAt", { type: () => Date, nullable: true }) lastUpdatedAt?: Date,
    ): Promise<Footer> {
        let footer = await this.repository.findOne({ scope });

        if (!footer) {
            footer = this.repository.create({
                ...input,
                scope,
            });
        } else if (lastUpdatedAt) {
            if (lastUpdatedAt) {
                validateNotModified(footer, lastUpdatedAt);
            }

            footer.assign({
                ...input,
                content: input.content.transformToBlockData(),
            });
        }

        await this.repository.persistAndFlush(footer);

        return footer;
    }
}
