import {db} from "../db"
import {QueryResolvers} from "../generated/graphql"

export const getPosts: QueryResolvers['getPosts'] = async () => {
	const data = await db.prismaExample.post.findMany()
	console.log(data)
	return data;
}
