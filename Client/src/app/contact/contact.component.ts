import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      inquiryTitle: ['', Validators.required],
      inquiryType: ['', Validators.required],
      budget: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const url = 'http://localhost:8080/api/contact';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post(url, this.contactForm.value, httpOptions).subscribe(
        (response: any) => {
          console.log('Contact data submitted successfully:', response);
          // Handle successful submission, e.g., show a success message
        },
        (error) => {
          console.error('Error submitting contact data:', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.log('Form is invalid. Please fill all required fields.');
    }
  }
}
