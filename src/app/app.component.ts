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
            // this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.statusBar.hide();
            // El statusbar es la barra de notificaciones
            // Color para el statusbar
            this.statusBar.backgroundColorByHexString('#000000');
            // Evitamos el solapamiento del header con la statusbar
            this.statusBar.show()
        });
    }
}
