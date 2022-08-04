import { Entity } from "./entity";
import { Product } from "./product";

export class UpSelling extends Entity{
    withAlgorithm?: boolean;
    priorityInAlgorithm?: boolean;
    productsToShow?: number;
    products?: Product[];
}