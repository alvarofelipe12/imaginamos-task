import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReadJsonService {

    constructor(
        private http: HttpClient
    ) {}

    public getCategories(): Observable<any> {
        return this.http.get("./assets/categories.json");
    }

    public getProducts(): Observable<any> {
        return this.http.get("./assets/products.json");
    }
}
