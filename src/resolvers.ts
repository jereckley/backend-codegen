import {Resolvers} from "./generated/graphql";
import {getPosts} from "./posts/query-resolvers";
import {bookTypes} from "./posts/type-resolvers";
import {getUsers} from "./users/query-resolvers";

export const resolvers: Resolvers = {
	BookTypes: bookTypes,
	Query: {
		getPosts,
		getUsers
	}
};
