import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common'; 
import { ColDef } from 'ag-grid-community';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css'; 

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnChanges {

  @Input() stats: any[] = [];
  rowData: any[] = [];

  ngOnInit(): void {
    this.rowData = Array.isArray(this.stats) ? this.stats : [];
    console.log('inside on Init of stats component ' + JSON.stringify(this.stats));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] && changes['stats'].currentValue) {

      this.rowData = Array.isArray(changes['stats'].currentValue) ? changes['stats'].currentValue : [];
    }
  }

  colDefs: ColDef[] = [
    { field: 'user', headerName: "User" },
    { field: 'totalCommits', headerName: 'Total Commits' },
    { field: 'totalPullRequests', headerName: 'Total Pull Requests' },
    { field: 'totalIssues', headerName: 'Total Issues' },
  ];
  
}
