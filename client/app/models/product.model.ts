export class Product {
    _id?:           string;
    name:           string;
    description:    string;
    productType_id: number;
    active:         boolean;
    created_at:     string;
    updated_at:     string;

    /**
     *
     */
    constructor() {
        this.name           = "";
        this.description    = "";
        this.productType_id = 1;
        this.active         = true;
        this.created_at     = '10-01-2017';
        this.updated_at     = '10-01-2017';
    }
}