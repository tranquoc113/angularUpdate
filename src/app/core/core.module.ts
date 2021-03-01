import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postReducer } from './store/_reducers/post.reducers';
import { PostsEffects } from './store/_effects/post.effects';
import {PostService } from './services/post.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers:[
    PostService
  ]
})
export class CoreModule { }
