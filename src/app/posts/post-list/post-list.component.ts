import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts: Post[] = [];
  pagedData: Post[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  filterType: string = 'userId';
  filterValue: string = '';

  constructor(private postService: PostService, private router: Router) {
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts();
    this.posts = this.postService.getPosts()

  }
  handleDeleteClick($event: number): void {
    this.postService.deletePost($event);
    this.posts = this.postService.getPosts();
    this.pageChanged(this.currentPage);
  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/postlist/", $event]);
  }

  ngOnInit(){
    this.pageChanged(this.currentPage);
  }

  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.posts.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1)
      this.previousPage();
  }

  previousPage(): void {
    if (this.currentPage > 1)
    {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages)
    {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }
  onFilterChange(): void {
    this.pageChanged(1); // İlk sayfaya geçiş
    if (this.filterType === 'userId') {
      this.filterByUserId();
    } else if (this.filterType === 'postId') {
      this.filterByPostId();
    } else if (this.filterType === 'categoryId') {
      this.filterByCategoryId();
    }
  }

  filterByUserId(): void {
    if (this.filterValue.trim() === '') {
      this.pagedData = this.posts.slice(0, this.itemsPerPage);
    } else {
      const userId = parseInt(this.filterValue, 10);
      this.pagedData = this.posts.filter(post => post.userId === userId).slice(0, this.itemsPerPage);
    }
  }

  filterByPostId(): void {
    if (this.filterValue.trim() === '') {
      this.pagedData = this.posts.slice(0, this.itemsPerPage);
    } else {
      const postId = parseInt(this.filterValue, 10);
      this.pagedData = this.posts.filter(post => post.postId === postId).slice(0, this.itemsPerPage);
    }
  }

  filterByCategoryId(): void {
    if (this.filterValue.trim() === '') {
      this.pagedData = this.posts.slice(0, this.itemsPerPage);
    } else {
      const categoryId = parseInt(this.filterValue, 10);
      this.pagedData = this.posts.filter(post => post.categoryId === categoryId).slice(0, this.itemsPerPage);
    }
  }

}
