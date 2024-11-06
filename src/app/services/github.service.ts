import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private baseUrl = 'http://localhost:3000/api/github';  // Update this to match your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all organizations associated with the authenticated user
  getOrganizations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organizations`);
  }

  // Fetch all repositories for a specific organization
  getRepositories(orgId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/organizations/${orgId}/repos`);
  }

  // Fetch details for a specific repository (commits, pull requests, issues)
  getRepoDetails(repoId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repos/${repoId}/details`);
  }

  // Fetch all repositories (if needed for global display)
  getRepos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/repos`);
  }

  // Fetch aggregated stats (user, total commits, total PRs, total issues)
  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }
}
