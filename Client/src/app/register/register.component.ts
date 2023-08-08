import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    const fname: string = this.registerForm.value.fname || '';
    const lname: string = this.registerForm.value.lname || '';
    const email: string = this.registerForm.value.email || '';
    const password: string = this.registerForm.value.password || '';

    
    if (this.registerForm.valid) {
      this.authService.register(fname, lname, email, password)
        .subscribe(
          response => {
            // Handle successful registration and navigation here
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Registration Error:', error); // Log the full error response
          }
        );
    }
  }
  
  
}
