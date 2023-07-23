//allow user to click on an image and read the description
import { Component, OnInit } from '@angular/core';

interface Service {
  name: string;
  image: string;
  description: string;
  displayDescription: boolean;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [
    {
      name: 'Website Design',
      image: 'assets/images/Web.png',
      description: 'Our team of expert developers will craft a visually appealing and user-friendly website tailored to your small business needs. From seamless navigation to captivating designs, we ensure a captivating online presence that reflects your unique brand identity and engages your target audience.',
      displayDescription: false
    },
    {
      name: 'API',
      image: 'assets/images/API.png',
      description: 'Enhance the functionality and connectivity of your software solution with our custom API development services. Our experienced developers will design and implement robust APIs, allowing seamless integration with third-party platforms and systems, enabling smooth data exchange and unlocking new opportunities for your business.',
      displayDescription: false
    },
    {
      name: 'AI Predictive Model',
      image: 'assets/images/AI.png',
      description: 'Leverage the power of artificial intelligence to gain valuable insights and make data-driven decisions. Our skilled data scientists will develop AI predictive models that analyze patterns, trends, and customer behavior, empowering your small business to anticipate market changes, optimize operations, and deliver personalized experiences.',
      displayDescription: false
    },
    {
      name: 'Consulatation',
      image: 'assets/images/Consultation.png',
      description: 'Our seasoned experts will provide you with comprehensive technical consultation, guiding you through the complex world of software solutions. From selecting the right technologies to addressing challenges, we offer strategic advice and solutions, ensuring your software project aligns with your business goals and stays on track.',
      displayDescription: false
    },
    {
      name: 'Other',
      image: 'assets/images/Other.png',
      description: 'We understand that each small business has unique requirements. Whether you need assistance with software maintenance, troubleshooting, or expanding your existing solution, our dedicated team is ready to assist you. We prioritize open communication and are committed to finding tailored solutions that meet your specific needs, helping your business thrive in the digital landscape.',
      displayDescription: false
    }
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDescription(service: Service): void {
    service.displayDescription = !service.displayDescription;
  }
}