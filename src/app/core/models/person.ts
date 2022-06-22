import { Entity } from "./entity";
import { Option } from "./option";
import { Phone } from "./phone";

export class Person extends Entity{
    documentTypeGuid?: string;
    phoneGuid?: string;
    sexGuid?: string;
    names?: string;
    surnames?: string;
    dateOfBirth?: Date;
    age?: number;
    documentNumber?: string;
    documentType?: Option;
    sex?: Option;
    phone?: Phone;
}