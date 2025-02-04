import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateComponent } from "./components/create/create.component";
import { ViewComponent } from "./components/view/view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CreateComponent, ViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { 
  title = 'on-boarding-project-frontend';


  constructor() {
    console.log('AppComponent constructor');
  }

  public view(){
    console.log('view');
  }
}
