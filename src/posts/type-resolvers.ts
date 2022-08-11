import {Resolvers} from "../generated/graphql";
import {BookTypesEnum, ResolvedPost} from "./types";

export const bookTypes: Resolvers['BookTypes'] = {
	BATTLE: BookTypesEnum.BATTLE,
	SAD: BookTypesEnum.SAD,
	HAPPY: BookTypesEnum.HAPPY
}


const content = (post: ResolvedPost) => {
	return post.content ? {text: post.content}: null
}

export const postType: Resolvers['Post'] = {
	content
}
