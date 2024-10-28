import { Component } from '@angular/core';
import { GithubIntegrationComponent } from './components/github-integration/github-integration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GithubIntegrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github-oauth-frontend';
}
