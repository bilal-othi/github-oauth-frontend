import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common'; 
import { ColDef } from 'ag-grid-community';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css'; 
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [ AgGridAngular, StatsComponent, CommonModule], 
  templateUrl: 'organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  @Input() organizations: any[] = [];
  @Input() user: any = ''; 

  commitStats: any[] = []; 
  pullRequestStats: any[] = []; 
  fetchedStats: any;
  rowData = this.organizations;
  showStatsComponent: boolean = false;
  

  ngOnInit(): void {
    console.log(this.organizations); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['organizations'] && changes['organizations'].currentValue) {
      this.rowData = changes['organizations'].currentValue;
      console.log('Updated rowData:', this.rowData); 
    }
  }
  
  colDefs: ColDef[] = [
    { field: 'repoId', headerName: "Id" },
    { field: 'name' },
    {
      field: 'url',
      headerName: 'URL',
      cellRenderer: (params: any) => {
        return `<a href="${params.value}" target="_blank" rel="noopener noreferrer">${params.value}</a>`;
      }
    },
    { field: 'organizationId', headerName: "Slug" },
    {
      field: 'included',
      headerName: 'Included',
      cellRenderer: (params: any) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = params.value;
        checkbox.addEventListener('change', () => this.onIncludedChange(params.data));
        return checkbox;
      }
    }
  ];
  
  // Renderer for link column to create clickable URLs
  linkCellRenderer(cell: any, row: any) {
    return `<a href="${cell}" target="_blank">${cell}</a>`;
  }

  // Renderer for included column to show a "Yes" or "No" text
  includedCellRenderer(cell: any, row: any) {
    return cell ? 'Yes' : 'No';
  }

  onIncludedChange(repoData: any) {
    console.log("On included called ------------------> " + JSON.stringify(repoData)); 
    //if (repoData.included) {
      console.log('inside included'); 
      this.fetchRepoStats(repoData.owner, repoData.name);
    //}
  }

  async fetchRepoStats(owner: string, repoId: string) {
    try {
      const statsResponse = await axios.get(`${this.apiBaseUrl}/stats/${this.user}/${owner}/${repoId}`);
      this.handleFetchedStats(statsResponse.data);
      this.showStatsComponent = true; 
    } catch (err) {
      console.error('Error fetching repo stats:', err);
    }
  }

  // Handle the response from the backend
  handleFetchedStats(stats: any) {
    this.fetchedStats = stats;
    this.showStatsComponent = true; 
    console.log('this.fetchedStats ================================== ' + JSON.stringify(this.fetchedStats)); 
  }


}