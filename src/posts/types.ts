import {Post} from "@prisma/client";

export type ResolvedPost = Post

export enum BookTypesEnum {
  HAPPY = 'happy',
  SAD = 'sad',
  BATTLE = 'battle'
}
