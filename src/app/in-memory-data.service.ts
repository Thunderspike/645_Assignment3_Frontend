import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SurveyDB } from './CommonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const surveys: SurveyDB[] = [
      {
        id: '2024898714',
        fname: 'Pol',
        lname: 'Ajazi',
        address: '2676 Centennial Ct',
        city: 'Alexandria',
        state: 'Virginia',
        zip: '22311',
        phone: '2024898714',
        email: 'pol.ajazi@yahoo.com',
        date: new Date().toString(),
        campusPref: ['students', 'dorms'],
        referencedThru: 'friends',
        recommendToOthers: 'Very Likely',
      },
      {
        id: '2022763782',
        fname: 'Meli',
        lname: 'Ajazi',
        address: '2727 Adams Mill Rd NW Apt. 303',
        city: 'Washington',
        state: 'District Of Columbia',
        zip: '20009',
        phone: '2022763782',
        email: 'meliajazi@yahoo.com',
        date: new Date().toString(),
        campusPref: ['atmosphere'],
        referencedThru: 'internet',
        recommendToOthers: 'Very Likely',
      },
    ];

    const states = {
      states: [
        { name: 'Utah' },
        { name: 'Vermont' },
        { name: 'Virgin Islands' },
        { name: 'Virginia' },
        { name: 'Washington' },
      ],
    };

    return { surveys, states };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  //   genId(heroes: Hero[]): number {
  //     return heroes.length > 0
  //       ? Math.max(...heroes.map((hero) => hero.id)) + 1
  //       : 11;
  //   }
}
