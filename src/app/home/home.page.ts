import { Component, OnInit } from '@angular/core';
import { ReadJsonService } from '../services/read-json.service';
import { OrderService } from '../services/order.service';
import { Category } from '../entities/category.entity';

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
    public products: Array<Category>;

    /**
     * Store the search string in the ion-searchbar
     */
    public searchTerm: string;

    /**
     * Backup Store the products
     */
    private backupProducts: Array<Category>;

    /**
     * Class constructor's
     * @param readJSON Service who reads the json files
     * @param orderService Service that stores the products to order
     */
    constructor(
        private readJSON: ReadJsonService,
        private orderService: OrderService
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
        this.readJSON.getCategories().subscribe((data: Array<Category>) => {
            for (const keyCategory of data) {
                keyCategory.selected = false;
            }
            this.categories = data;
        });
    }

    /**
     * Obtains the products
     */
    private getProducts(): void {
        this.readJSON.getProducts().subscribe(data => {
            this.backupProducts = data;
            this.products = data;
        });
    }

    /**
     * Let the user select a category
     * @param category category selected
     */
    public selectCategory(category: any): void {
        const somethingSelected = this.categories.filter(cat => cat.selected === true);
        if (somethingSelected.length > 0) {
            somethingSelected[0].selected = false;
        }
        category.selected = true;
    }

    /**
     * Let user add a product to the order
     * @param product product data
     */
    public addToOrder(product: any): void {
        this.orderService.setItemInOrder(product);
    }

    /**
     * filter products
     * @param searchTerm word/string to search
     */
    private filterProducts(searchTerm: string): Array<Category> {
        return this.backupProducts.filter((item) => {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    }

    /**
     * Assigns the new list of products once filtered
     */
    public setFilteredItems(): void {
        setTimeout(() => {
            this.products = this.filterProducts(this.searchTerm);
        }, 500);
    }
}
