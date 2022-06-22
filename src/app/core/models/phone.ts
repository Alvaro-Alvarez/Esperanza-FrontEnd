import { Entity } from './entity';

export class Phone extends Entity{
    CountryCode?: string;
    CityCode?: string;
    PhoneNumber?: string;
}