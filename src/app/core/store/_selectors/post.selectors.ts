import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState, selectAll } from "../_reducers/post.reducers";

export const postFeatureSelector = createFeatureSelector<PostState>('posts');

export const getAllPosts = createSelector(
    postFeatureSelector,
    selectAll
);

export const areProductsLoaded = createSelector(
    postFeatureSelector,
  state => state.postsLoaded
);