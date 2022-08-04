import { Entity } from "./entity";

export class PrincipalImage extends Entity{
    imagePath?: string;
    imageName?: string;
    fullName?: string;
    extension?: string;
    base64Image?: string;
}