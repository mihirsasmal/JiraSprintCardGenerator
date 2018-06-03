import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const jiraRestEndPoint = "/jira/rest/api/2/";
@Injectable()
export class ServiceHandler {

    public username: string; password: string;
    constructor(private http: HttpClient) { }
    public httpOptions;

    searchJql(url: string, jql: string) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(this.username + ':' + this.password), 'X-Atlassian-Token': 'no-check'})
        };        
               
        let jqlendpoint = "/proxy/?url="+ url + jiraRestEndPoint + "search?jql=" + jql;

        return this.http.get(jqlendpoint, this.httpOptions);

    }


}