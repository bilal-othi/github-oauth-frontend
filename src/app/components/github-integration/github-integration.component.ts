import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-github-integration',
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css'],
  imports: [CommonModule, FontAwesomeModule],
  providers: [DatePipe],
  standalone: true
})
export class GithubIntegrationComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  isConnected = false;
  username = '';
  connectedAt = '';
  isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private datePipe: DatePipe) {}

  async ngOnInit() {
    const response = await axios.get(`${this.apiBaseUrl}/status/bilal-othi`);
    if (response.data) {
      this.isConnected = true;
      this.username = response.data.username;
      const transformedDate = this.datePipe.transform(response.data.connectedAt, 'yyyy-MM-dd hh:mm a');
        this.connectedAt = transformedDate ? transformedDate : 'N/A'; 
    }
    else {
      console.log('github status is not ok'); 
    }
  }

  connectToGitHub() {
    console.log('inside connect To Github'); 
    window.location.href = `${this.apiBaseUrl}/login`;
  }

  async removeIntegration() {
    await axios.delete(`${this.apiBaseUrl}/remove/${this.username}`);
    this.isConnected = false;
  }
}
