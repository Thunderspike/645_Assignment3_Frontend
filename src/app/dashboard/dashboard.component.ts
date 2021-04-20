import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';

import { Survey } from '../CommonInterfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  surveys: Survey[] = [];

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(): void {
    this.surveyService.getSurveys().subscribe((surveys) => {
      this.surveys = surveys;
      console.log(surveys);
    });
  }
}
