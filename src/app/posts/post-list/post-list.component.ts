import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute,Router } from '@angular/router';


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

  constructor(private postService: PostService, private router: Router,private route: ActivatedRoute) {
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts();
    this.posts = this.postService.getPosts()

  }
  // Handles the delete button click event for a post
  handleDeleteClick($event: number): void {
    this.postService.deletePost($event);
    this.posts = this.postService.getPosts();
    this.pageChanged(this.currentPage);
  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/postlist/", $event]);
  }
// Filters are created
  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      this.filterValue = params.get('filterValue') || '';
      this.filterType = params.get('filterType') || 'userId';
      this.pageChanged(1);
      this.applyFilter();
    });
  }
 // Updates the paged data when the page changes
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
// Calculates the total number of pages based on the items per page
  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }

  // Handles the filter change event
  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilter();
    const queryParams = {
      filterType: this.filterType,
      filterValue: this.filterValue
    };
    this.router.navigate([], { queryParams: queryParams });
  }

  applyFilter(): void {
    if (this.filterType === 'userId') {
      this.filterByUserId();
    } else if (this.filterType === 'postId') {
      this.filterByPostId();
    } else if (this.filterType === 'categoryId') {
      this.filterByCategoryId();
    }
  }
//  Functions are created for 3 type of filter 
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
