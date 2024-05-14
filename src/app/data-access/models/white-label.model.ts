import { Domain } from "./domain.model";

export interface WhiteLabel extends Domain {}

export interface WhiteLabelFormData {
  bodyColour: string;
  footerColour: string;
  headerColour: string;
  sideBarColor: string;
  headerFontColour:string
  formColor:string
  footerFontColour:string
  formFontType:string
  formFontColor:string
}

export interface WhiteLabelDirectory {
  companyId: string;
  companyName: string;
  companyUrl: string;
  subdomain: string;
}
