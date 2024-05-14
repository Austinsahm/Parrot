export interface City {
    cityId: string;
    cityName: string;
}

export interface CityDirectory extends City {
    description?: string;
    stateid: string;
    stateName: string;
}

export interface State {
    stateid: string;
    stateName: string;
}

export interface StateDirectory {
    stateId: string;
    stateName: string;
    description: string;
    countryId: string;
    countryName: string;
}

export interface Country {
    countryId: string;
    countryName: string;
    description: string;
}

export interface CountryDetail extends Country {
    currency: string;
    currencySymbol: string;
    usExchangeRate: number;
    ukExchangeRate: number;
    euExchangeRate: number;
}

export interface CorporateLocation{
    locationId: string,
    locationAddress1: string,
    locationAddress2: string,
    locationName: string,
    locationDesc: string,
    statusId: string,
    stateId: string,
    cityId: string,
    companyId: string,
    companyName: string,
    stateName: string,
    cityName: string,
    statusName: string
}

export interface CountryFormData extends CountryDetail {}

export interface LocationFormData {
    locationId?: string,
    locationName: string,
    locationDesc: string,
    locAddress1: string,
    locAddress2: string,
    createdBy?: string,
    stateId: string,
    cityId: string,
    companyId: string,
    postalCode?: string,
}