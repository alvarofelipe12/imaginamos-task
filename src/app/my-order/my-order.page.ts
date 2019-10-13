import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-order',
    templateUrl: './my-order.page.html',
    styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {

    /**
     * Contains the order with the products added in home section
     */
    public order: Array<any>;

    /**
     * Show the quantity of people
     */
    public quantityPeople: number;

    /**
     * Handle the total of the order
     */
    public total: number;

    /**
     * Class constructor's
     * @param orderService Service that store the products for the order
     * @param toastController Controller to show a toast
     * @param router Angular router to navigate the app
     */
    constructor(
        private orderService: OrderService,
        private toastController: ToastController,
        private router: Router
    ) {
        this.quantityPeople = 1;
        this.total = 0;
    }

    ngOnInit() {
        this.order = this.orderService.getOrder();
        this.calculateTotal();
    }

    /**
     * Let the user increse or decrease the number of people
     * @param condition defines when increse or decrease
     */
    public modifyQuantiyPeople(condition: string): void {
        condition === 'add' ? this.quantityPeople++ : this.quantityPeople--;
    }

    /**
     * Calculate the total of the order
     */
    private calculateTotal(): void {
        this.order.forEach(product => {
            this.total += product.price;
        });
    }

    /**
     * Clear the order
     */
    public clean(): void {
        if (this.order.length > 0) {
            this.order = [];
        }
        this.presentToast('Your order is empty.');
    }

    /**
     * Shows a toast with a custom message
     * @param messageToShow mesagge to show
     */
    private async presentToast(messageToShow: string): Promise<void> {
        const toast = await this.toastController.create({
            message: messageToShow,
            duration: 2000
        });
        toast.present();
    }

    /**
     * Let the user make the order
     * and then navigates to home
     */
    public next(): void {
        if (this.order.length > 0) {
            this.order = [];
            this.presentToast('Your order is completed.');
            this.router.navigateByUrl('/home');
        }
    }

}
