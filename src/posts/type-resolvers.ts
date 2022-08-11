import {Resolvers} from "../generated/graphql";
import {BookTypesEnum} from "./types";

export const bookTypes: Resolvers['BookTypes'] = {
	BATTLE: BookTypesEnum.BATTLE,
	SAD: BookTypesEnum.SAD,
	HAPPY: BookTypesEnum.HAPPY
}
