import { Entity } from "./entity";

export class GalleryImage extends Entity{
    productGuid?: string;
    imagePath?: string;
    imageName?: string;
    fullName?: string;
    extension?: string;
}