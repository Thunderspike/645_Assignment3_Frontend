import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';

import { SurveyDB } from '../CommonInterfaces';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    surveys: SurveyDB[] = [];
    loaded = false;

    constructor(private surveyService: SurveyService) {}

    ngOnInit(): void {
        this.getSurveys();
        this.loaded = false;
    }

    getSurveys(): void {
        this.loaded = false;
        this.surveyService.getSurveys().subscribe((surveys) => {
            this.loaded = true;
            this.surveys = surveys;
            //   console.log(surveys);
        });
    }
}
