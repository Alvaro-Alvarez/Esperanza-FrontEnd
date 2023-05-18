import { Entity } from "./entity";
import { Option } from "./option";
import { Person } from "./person";

export class User extends Entity{
    personGuid?: string;
    roleGuid?: string;
    email?: string;
    pass?: string;
    verified?: boolean;
    enabled?: boolean;
    basClientCode?: string;
    person?: Person;
    userRole?: Option;
}