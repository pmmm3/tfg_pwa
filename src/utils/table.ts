import {autoserializeAs} from "dcerialize";

export class ListParams {
    @autoserializeAs(() => Number) page?: number;
    @autoserializeAs(() => Number, "per_page") perPage?: number;
    @autoserializeAs(() => String) sort?: string;
    @autoserializeAs(() => Object) filter?: any;


    constructor(page?: number, limit?: number, sort?: string, filter?: any) {
        this.page = page;
        this.sort = sort;
        this.filter = filter;
    }
}
