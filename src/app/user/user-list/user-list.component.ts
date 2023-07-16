import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { PostService } from 'src/app/posts/post.service';
import { CommentService } from 'src/app/comments/comment.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  alphabeticalSort: boolean = false;

  //Define the variables in the forms part.
  username: string= "";
  email: string= "";
  creationDate: string="";
  isActive: boolean=false;
  editMode: boolean=false;
  userId: number=0;

  // This function is used for alphabeticalSort.
  onCheckboxChange() {
    if (this.alphabeticalSort) {
      this.users.sort((a, b) => a.username.localeCompare(b.username));
    } else {
      this.users.sort((a, b) => a.userId - b.userId);
    }
  }  filterTerm: string = '';

// This function provides filter according to username.
  onFilterChange() {
    if (this.filterTerm.trim() === '') {
      this.users = this.userService.getUsers();
    } else {
      this.users = this.userService.getUsers().filter(user =>
        user.username.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }
  }


  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService) {
    if (this.userService.getUsers().length === 0)
      this.userService.setUsers();
   
      this.users = this.userService.getUsers();
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts();
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments();
  }

  //It was made to give an error if the last user remains.
  handleDeleteClick($event: number) {
    if(this.userService.userCount() === 1)
      alert("You can not delete last users.")
    else if (this.checkPostsAndComments($event) === true)
      alert("You cannot delete a user with post or comment");
    else {
      this.userService.deleteUser($event);
      this.users = this.userService.getUsers();
    }
  }

  checkPostsAndComments(id: number): boolean {
    if (this.postService.getPosts().filter((post) => Number(post.userId) === id).length !== 0)
      return true;
    else if (this.commentService.getComments().filter((comment) => Number(comment.userId) === id).length !== 0)
      return true;
    else
      return false;
  }


  handleSaveClick() {
    if(this.username == '' || this.email == '' || this.creationDate == '')
      alert("All the empty spaces must be filled.");
    else if(this.userService.checkUnique(this.username,this.email,this.userId) === false)
      alert("Username and email must be unique from others.");
    else {
      const user: User = {
        userId: this.userId,
        username: this.username ,
        email: this.email ,
        creationDate: this.creationDate ,
        isActive: this.isActive
      }
      this.userService.editUser(user, this.userId);
      this.users = this.userService.getUsers();
      this.handleCancelClick();
    }
  }

  handleEditClick($event: number): void {
    this.editMode = true;
    this.userId = $event;
  }

  handleCancelClick(): void {
    this.editMode= false;
    this.username = "";
    this.email = "";
    this.creationDate = "";
    this.userId= 0;

  }
}

