import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Post } from "../../model/post";
import { postActionTypes } from "../_actions/post.actions";

export interface PostState extends EntityState<Post> {
    postsLoaded: boolean;
  }
  
  export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();
  
  export const initialState = adapter.getInitialState({
    postsLoaded: false
  });
  
  export const postReducer = createReducer(
    initialState,
  
    on(postActionTypes.postsLoaded, (state, action) => {
      return adapter.addMany(
        action.posts,
        {...state, postsLoaded: true}
      );
    }),
  
  );
  
  export const { selectAll, selectIds } = adapter.getSelectors();