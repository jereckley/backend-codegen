## Initial Setup
npm install

## Setup DB
1) Duplicate the .env.example into a file named `.env`. Update the url in the file with your postgres DB credentials. You don't need to create the db.

2) Run `npx prisma generate`

3) Run `npx prisma migrate dev --name init`

4) Run `npm run seed`

## Add Codegen

`npm install -D @graphql-codegen/cli`

`npx graphql-code-generator init`

- select 'Backend'
- schema 'src/**/*.schema.graphql'
- plugins 'typescript and typescript resolvers'
- select default for generated
- no to generate instrospection file
- default name of file
- "codegen" for command

`npm install`

`npm run codegen`

see branch ADD_CODEGEN for completed step

## Add resolver typing

on line 2 of src/resolvers.ts update to have type `export const resolvers: Resolvers = {` and add type importco

notice the issues

to better understand the issue lets add typings to the resolvers

update typings in src/users/query-resolvers.ts `export const getUsers: QueryResolvers['getUsers'] = async () => {` and add type import

update typings in src/posts/query-resolvers.ts `export const getPosts: QueryResolvers['getPosts'] = async () => {` and add type import

as we can see graphql expects anything with an ID to be a string

now we need to teach codegen what type we are expecting for our resolver

create a types.ts in posts and users folders

`
import {Post} from "@prisma/client";

export type ResolvedPost = Post
`

`
import {User} from "@prisma/client";

export type ResolvedUser = User
`

in the codgen.yml teach codegen how to understand the resolved type
`
    config:
      mappers:
        User: ../users/types#ResolvedUser
        Post: ../posts/types#ResolvedPost
`

`npm run codegen`

notice the types are now happy and the server is happy because it auto converts id fields to strings

see branch ADD_RESOLVER_TYPINGS

## Fix enum issue
You can notice in the explorer that the bookType property is not resolving correctly


in posts/types.ts lets teach codegen what enum we want to use in our codegen
`
export enum BookTypesEnum {
  HAPPY = 'happy',
  SAD = 'sad',
  BATTLE = 'battle'
}
`


in codegen.yml 
`
      enumValues: 
        BookTypes: ../posts/types#BookTypesEnum
`


in posts/type-resolvers.ts

`npm run codegen`

`
import {Resolvers} from "../generated/graphql";
import {BookTypesEnum} from "./types";

export const bookTypes: Resolvers['BookTypes'] = {
	BATTLE: BookTypesEnum.BATTLE,
	SAD: BookTypesEnum.SAD,
	HAPPY: BookTypesEnum.HAPPY
}
`

lastly lets update our app to consume the change in reslovers.ts
`
export const resolvers: Resolvers = {
	BookTypes: bookTypes,
	Query: {
		getPosts,
		getUsers
	}
};
`

You can now see in the explorer the book Enum is now resolving

see branch FIX_ENUM

## Type typings

Lets change the schema so we can understand more how this will help us

lets update our schema in posts/posts.schema.graphql
`
type Content {
  text: String!
}

type Post {
  id:        ID!
  title:     String!
  content:   Content
  bookType:  BookTypes
  published: Boolean
  author:    User
  authorId:  Int
}
`

`npm run codegen'


now lets add a type resolver that makes this conversion in the posts/type-resolvers.ts
`
const content = (post: ResolvedPost) => {
	return post.content ? {text: post.content}: null
}

export const postType: Resolvers['Post'] = {
	content
}
`

lastly lets update our resolvers.ts to have a POST type

`
export const resolvers: Resolvers = {
	BookTypes: bookTypes,
	Post: postType,
	Query: {
		getPosts,

`

see branch TYPE_TYPINGS
