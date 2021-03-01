import { createAction, props } from "@ngrx/store";
import { Post } from "../../model/post";

export const loadPosts = createAction(
    '[Posts List] Load Posts via Service',
  );
  
  export const postsLoaded = createAction(
    '[Posts Effect] Posts Loaded Successfully',
    props<{posts: Post[]}>()
  );
  
  export const postActionTypes = {
    loadPosts,
    postsLoaded
  };