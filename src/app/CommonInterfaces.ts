export interface dropdown {
  name: string;
}

export interface Survey {
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

export interface SurveyDB extends Survey {
  id: string;
}
