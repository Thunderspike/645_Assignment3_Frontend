export interface dropdown {
    name: string;
}

export interface SurveyDB {
    id: string;
    fname: string;
    lname: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    date: string;
    campusPref: string[];
    referencedThru: string;
    recommendToOthers: string;
}
