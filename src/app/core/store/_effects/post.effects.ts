import { Injectable } from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { PostService } from '../../services/post.service';
import { postActionTypes } from '../_actions/post.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
@Injectable()
export class PostsEffects {

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActionTypes.loadPosts),
      mergeMap(() => this.postService.getPost()
        .pipe(
          map(posts => postActionTypes.postsLoaded({posts})),
          catchError(() => of({ type: '[Posts API] Post Loaded Error' }))
        )
      )
    )
  );
  constructor(private postService: PostService, private actions$: Actions) {}
}