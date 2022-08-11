import {db} from "../db"
import {QueryResolvers, Resolvers} from "../generated/graphql"

export const getUsers: QueryResolvers['getUsers'] = async () => {
	return await db.prismaExample.user.findMany()
}
