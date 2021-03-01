import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/model/post';
import { loadPosts } from 'src/app/core/store/_actions/post.actions';
import { getAllPosts } from 'src/app/core/store/_selectors/post.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource$?:Observable<Post []>;

  constructor(private store: Store<AppState>){
    
  }
  ngOnInit() {
    this.store.dispatch(loadPosts());
    this.dataSource$ = this.store.select(getAllPosts);
    console.log(this.dataSource$);
  }
  loading(){
    
  }
}
