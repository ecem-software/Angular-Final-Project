import { Component, OnInit, Inject,Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {

  constructor(@Inject(Router) private router: Router) { }

  ngOnInit(): void {
  }
// Redirects to the userlist page
  redirectToUserList() {
    this.router.navigate(['/userlist']);
  }

}