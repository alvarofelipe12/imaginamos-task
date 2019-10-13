import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Social Login',
            url: '/login',
            icon: 'logo-facebook'
        },
        {
            title: 'My order',
            url: '/my-order',
            icon: 'cart'
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: 'person'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.statusBar.hide();
            // Color para el statusbar
            this.statusBar.backgroundColorByHexString('#e7a61a');
            // Evitamos el solapamiento del header con la statusbar
            this.statusBar.show();
        });
    }
}
