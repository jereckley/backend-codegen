import {getPosts} from "./posts/query-resolvers";
import {getUsers} from "./users/query-resolvers";

export const resolvers = {
	Query: {
		getPosts,
		getUsers
	}
};
