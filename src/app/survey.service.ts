import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Survey, SurveyDB } from './CommonInterfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    private surveyURL = environment.apiUrl; // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    private emptySurvey: SurveyDB = {
        id: undefined,
        fname: '',
        lname: '',
        address: '',
        city: '',
        state: 'Virginia',
        zip: '',
        phone: '',
        email: '',
        date: new Date().getTime().toString(),
        campusPref: [],
        referencedThru: undefined,
        recommendToOthers: '',
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getNewSurvey(): SurveyDB {
        return this.emptySurvey;
    }

    /** GET survey by id. Will 404 if id not found */
    getSurvey(id: string): Observable<SurveyDB> {
        const url = `${this.surveyURL}/survey/${id}`;
        return this.http.get<SurveyDB>(url).pipe(
            tap((response) => {
                this.log({
                    severity: 'info',
                    detail: `Successfully fetched survey #${id}`,
                });
            }),
            catchError(
                this.handleError<SurveyDB>(
                    `getSurvey id #${id}`,
                    this.emptySurvey
                )
            )
        );
    }

    /** GET all surveys */
    getSurveys(): Observable<SurveyDB[]> {
        return this.http
            .get<SurveyDB[]>(`${this.surveyURL}/surveys`, this.httpOptions)
            .pipe(
                retry(3),
                // tap((_) =>
                //   this.log({
                //     severity: 'info',
                //     detail: 'Successfully fetched surveys',
                //   })
                // ),
                catchError(this.handleError<SurveyDB[]>('getSurveys', []))
            );
    }

    /** POST: add a new survey to the server */
    addSurvey(survey: SurveyDB): Observable<SurveyDB> {
        // console.log({ postingWith: survey });
        return this.http
            .post<SurveyDB>(
                `${this.surveyURL}/survey`,
                survey,
                this.httpOptions
            )
            .pipe(
                tap((addedSurvey: SurveyDB) => {
                    this.log({
                        severity: 'success',
                        detail: `Successfully added survey #${addedSurvey.id}`,
                    });
                }),
                catchError(
                    this.handleError<SurveyDB>('addSurvey', this.emptySurvey)
                )
            );
    }

    /** PUT: update survey on the server */
    updateSurvey(survey: SurveyDB): Observable<any> {
        // console.log({ putSurvey: survey });
        return this.http
            .put(
                `${this.surveyURL}/survey/${survey.id}`,
                survey,
                this.httpOptions
            )
            .pipe(
                tap((_) =>
                    this.log({
                        severity: 'success',
                        detail: `Successfully updated survey ${survey.id}`,
                    })
                ),
                catchError(
                    this.handleError<any>(`updateSurvey #${survey.id}`, survey)
                )
            );
    }

    public log(message: any) {
        this.messageService.add({
            ...message,
        });
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            if (error.status == 404) {
                this.log({
                    severity: 'warn',
                    detail:
                        error?.error?.error ||
                        error?.body?.error ||
                        `Not found`,
                });
            } else
                this.log({
                    severity: 'error',
                    //   summary: `${operation} failed`,
                    //   detail: error.message,
                    detail: `${operation} failed`,
                });

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
