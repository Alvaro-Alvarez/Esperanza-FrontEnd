import { Entity } from './entity';

export class Phone extends Entity{
    countryCode?: string;
    cityCode?: string;
    phoneNumber?: string;
}