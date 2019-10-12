import { Component, OnInit } from '@angular/core';
import { ReadJsonService } from '../services/read-json.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    /**
     * Stores the categories
     */
    public categories: Array<any>;

    /**
     * Store the products
     */
    public products: Array<any>;

    constructor(
        private readJSON: ReadJsonService
    ) { }

    ngOnInit(): void {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.getCategories();
        this.getProducts();
    }

    /**
     * Obtains the categories
     */
    private getCategories(): void {
        this.readJSON.getCategories().subscribe(data => {
            for (const keyCategory of data) {
                keyCategory['selected'] = false;
            }
            this.categories = data;
        });
    }

    /**
     * Obtains the products
     */
    private getProducts(): void {
        this.readJSON.getProducts().subscribe(data => {
            this.products = data;
        });
    }

    /**
     * Let the user select a category
     * @param category category selected
     */
    public selectCategory(category: any): void {
        const somethingSelected = this.categories.filter(cat => cat['selected'] === true);
        if (somethingSelected.length > 0) {
            somethingSelected[0]['selected'] = false;
        }
        category['selected'] = true;
    }
}
