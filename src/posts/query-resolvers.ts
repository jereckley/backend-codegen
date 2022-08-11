import {db} from "../db"

export const getPosts = async () => {
	return db.prismaExample.post.findMany()
}
