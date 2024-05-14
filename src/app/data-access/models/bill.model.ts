export interface Bills{
    planCode:string;
    planName: string;
    devicePrice: number;
    platformAccessFee:number;

    planId: number;
    priceId: 1;
    devVolumeDiscnt: number;
    contrDuratnDiscnt: number;
    deviceStartDate: number;
    deviceEndDate: number;

    messagePrice: number;
    messageStartDate: number;
    messageEndDate: number;      
    
    
}


export interface BillsData{
    planId: number,
    planCode: string,
    planName: string,
    subscrYearNumber: number,
    devVolumeDiscnt: number,
    contrDuratnDiscnt: number,
    platformAccessFee: number,
    devicePrice: number,
    smsPrice: number,
    phonCallPrice: number,
    dollarRate: number
}

export interface CurrencyData{
    currencyId: string,
    currencyName: string
}