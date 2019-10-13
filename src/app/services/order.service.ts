import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private order: Array<any>;

    constructor() {
        this.order = [];
    }

    public getOrder(): Array<any> {
        return this.order;
    }

    public setItemInOrder(item: any) {
        this.order.push(item);
    }
}
