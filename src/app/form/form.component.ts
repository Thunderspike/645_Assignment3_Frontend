import { Component, OnInit } from '@angular/core';
import { Survey, SurveyDB, dropdown } from '../CommonInterfaces';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StateService } from './stateservice';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [StateService],
})
export class FormComponent implements OnInit {
  isNewSurvey: boolean = false;
  formTitle: string;

  showValidate: boolean = false;
  originalPhoneNum: string;
  originalEmail: string;
  usedPhoneNumbers: string[] = [];
  usedEmails: string[] = [];

  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  zipcodeRegex: RegExp = /(^\d{5}$)/;
  numberRegex: RegExp = /^\d{10}$/;
  phoneRegex: RegExp = /\(\d{3}\)\s\d{3}-\d{4}/;
  numberPattern: RegExp = /\d+/g;

  states: dropdown[];
  selectedState: string = 'Virginia';

  recommendations = [
    { name: 'Very Likely', value: 'veryLikely' },
    { name: 'Likely', value: 'likely' },
    { name: 'Unlikely', value: 'unlikely' },
  ];

  form?: SurveyDB;
  formDate?: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private surveyService: SurveyService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.stateService.getStates().then((states) => {
      this.states = states;
    });
    this.getExistingPhonesAndEmails();
    this.determineCase();
  }

  getExistingPhonesAndEmails(): void {
    this.surveyService.getSurveys().subscribe((surveys) => {
      this.usedPhoneNumbers = surveys.map((survey) => survey.phone);
      this.usedEmails = surveys.map((survey) => survey.email);
      console.log({
        existingPhoneNums: this.usedPhoneNumbers,
        existingEmails: this.usedEmails,
      });
    });
  }

  getFormPhoneAsString() {
    const numberMatch = this.form.phone.match(this.numberPattern)?.join('');
    const phoneNumber = Array.isArray(numberMatch)
      ? numberMatch[0]
      : numberMatch;
    return phoneNumber;
  }

  isFormPhoneValid(): boolean {
    const phoneNum = this.getFormPhoneAsString();
    return phoneNum && this.numberRegex.test(phoneNum);
  }

  numberAlreadyExists(): boolean {
    const phoneNumber = this.getFormPhoneAsString();
    if (!this.isNewSurvey) {
      console.log({
        numberAlreadyExists: phoneNumber,
        originalPhoneNum: this.originalPhoneNum,
      });
      return (
        phoneNumber != this.originalPhoneNum &&
        this.usedPhoneNumbers.includes(phoneNumber)
      );
    }
    return this.usedPhoneNumbers.includes(phoneNumber);
  }

  emailAlreadyExists(): boolean {
    const formEmail = this.form.email.toLocaleLowerCase();
    if (!this.isNewSurvey) {
      return (
        formEmail != this.originalEmail && this.usedEmails.includes(formEmail)
      );
    }
    return this.usedEmails.includes(formEmail);
  }

  determineCase(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId == null) {
      this.isNewSurvey = true;
      this.formTitle = 'New Student Survey';
      this.form = this.surveyService.getNewSurvey();
      this.formDate = new Date(+this.form.date);
    } else {
      this.surveyService.getSurvey(routeId).subscribe((form) => {
        if (!form.fname) {
          this.returnToDashboard();
        } else {
          this.isNewSurvey = false;
          this.formTitle = `Edit Survey #${form.id} - ${form.fname} ${form.lname}`;
          this.form = form;
          this.formDate = new Date(+form.date);
          this.originalPhoneNum = form.phone;
          this.originalEmail = form.email.toLocaleLowerCase();
          console.log(this.form);
        }
      });
    }
  }

  isFormValid(): boolean {
    console.log({
      numberAlreadyExists: this.numberAlreadyExists(),
      emailAlreadyExists: this.emailAlreadyExists(),
      isFormValid: Object.keys(this.form).filter((formVal) => {
        if (formVal == 'campusPref') return !this.form[formVal].length;
        return !this.form[formVal];
      }).length,
    });
    return (
      !this.numberAlreadyExists() &&
      !this.emailAlreadyExists() &&
      !Object.keys(this.form).filter((formVal) => {
        //discard id field
        if (formVal == 'id') return false;
        else if (formVal == 'campusPref') return !this.form[formVal].length;
        return !this.form[formVal];
      }).length
    );
  }

  submit(): void {
    if (!this.isFormValid()) {
      this.showValidate = true;
      console.log({
        invalidForm: this.form,
        existingNumbers: this.usedPhoneNumbers,
      });

      this.notifyInvalidForm();
    } else if (this.isNewSurvey)
      this.surveyService
        .addSurvey({ ...this.cleanseFormData(), id: null })
        .subscribe((_) => this.returnToDashboard());
    else {
      this.surveyService
        .updateSurvey(this.cleanseFormData())
        .subscribe((_) => this.returnToDashboard());
    }
  }

  notifyInvalidForm(): void {
    window.scrollTo(0, 0);
    this.surveyService.log({
      severity: 'warn',
      detail: 'Missing or invalid fields',
    });
  }

  cleanseFormData(): SurveyDB {
    const form = this.form;
    const phoneNumber = this.getFormPhoneAsString();
    const survey = {
      ...form,
      email: form.email.toLocaleLowerCase(),
      phone: phoneNumber,
      date: this.formDate.getTime().toString(),
    };

    return survey;
  }

  returnToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
