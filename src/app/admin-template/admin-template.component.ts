import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  errorMessage! : string;

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  public handleLogout() {
    this.authService.logout().subscribe({
      next: (data) => {
        if(data) this.router.navigateByUrl("/login");
      },
      error: (err)=> {
        this.errorMessage = err;
      }
    });

  }

}
