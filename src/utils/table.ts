import {autoserializeAs, autoserializeAsJson} from "dcerialize";

export class ListParams {
    @autoserializeAs(() => Number) page?: number;
    @autoserializeAs(() => Number, "per_page") perPage?: number;
    @autoserializeAs(() => String) sort?: string;
    @autoserializeAsJson() filters?;


    constructor(page?: number, limit?: number, sort?: string, filters?: any) {
        this.page = page;
        this.sort = sort;
        this.filters = filters;
    }
}
