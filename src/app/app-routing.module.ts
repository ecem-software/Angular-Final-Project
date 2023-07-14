import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostAddComponent } from './posts/post-add/post-add.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentAddComponent } from './comments/comment-add/comment-add.component';
import { CommentDetailComponent } from './comments/comment-detail/comment-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "userlist", component: UserListComponent},
  {path: "useradd", component: UserAddComponent},
  {path: "postlist", component: PostListComponent},
  {path: "postadd", component: PostAddComponent},
  {path: "postlist/:id", component: PostDetailComponent},
  {path: "categorylist", component: CategoryListComponent},
  {path: "categorylist/:id", component: CategoryDetailComponent},
  {path: "commentlist", component: CommentListComponent},
  {path: "commentadd", component: CommentAddComponent},
  {path: "commentlist/:id", component: CommentDetailComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
