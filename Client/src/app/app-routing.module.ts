import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//routing to navigate between different pages
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';

//define the routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
