import {Resolvers} from "./generated/graphql";
import {getPosts} from "./posts/query-resolvers";
import {bookTypes, postType} from "./posts/type-resolvers";
import {getUsers} from "./users/query-resolvers";

export const resolvers: Resolvers = {
	BookTypes: bookTypes,
	Post: postType,
	Query: {
		getPosts,
		getUsers
	}
};
