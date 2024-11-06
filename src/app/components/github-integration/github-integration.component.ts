import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { AgGridModule } from 'ag-grid-angular';
import { OrganizationComponent } from '../organization/organization.component';
import { StatsComponent } from '../stats/stats.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-github-integration',
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css'],
  imports: [CommonModule, FontAwesomeModule, AgGridModule, OrganizationComponent, StatsComponent],
  providers: [DatePipe],
  standalone: true,
})
export class GithubIntegrationComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  isConnected = false;
  username = '';
  accessToken = '';
  connectedAt = '';
  isExpanded = false;
  organizations: any[] = []; 
  repositories: any[] = [];  

  constructor(private datePipe: DatePipe) {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  
  async ngOnInit() {
    await this.checkConnectionStatus();
    if (this.isConnected) {
      await this.fetchOrganizationsAndRepositories();
    }
  }

   // Check connection status
   async checkConnectionStatus() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/status/bilal-othi`);
      if (response.data) {
        this.isConnected = true;
        this.username = response.data.username;

        console.log(JSON.stringify(response.data)); 
        this.accessToken = response.data.accessToken; 
        const transformedDate = this.datePipe.transform(response.data.connectedAt, 'yyyy-MM-dd hh:mm a');
        this.connectedAt = transformedDate ? transformedDate : 'N/A'; 
      } else {
        console.log('GitHub status is not ok');
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    }
  }

  // Fetch organizations
  async fetchOrganizations() {
    try {
      console.log('this.accessTocken : ' + this.accessToken); 
      const response = await axios.get(`${this.apiBaseUrl}/organizations`, {
        params: {
          token: this.accessToken,
        },
      });
      this.organizations = response.data || [];
      
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  }

  // Fetch repositories for each organization
  async fetchAllRepositories() {
    try {
      for (const org of this.organizations) {
        const response = await axios.get(`${this.apiBaseUrl}/organizations/${org.id}/repos`);
        this.repositories = [...this.repositories, ...response.data];
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }

  async fetchOrganizationsAndRepositories() {
    try {
      console.log('this.accessTocken : ' + this.accessToken); 
      const response = await axios.get(`${this.apiBaseUrl}/repos-all-orgs`, {
        params: {
          token: this.accessToken,
        },
      });
      this.organizations = response.data || [];
      
    } catch (error) {
      console.error('Error fetching organizations:', error);
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
