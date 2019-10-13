import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    /**
     * Handle the loading
     */
    private loading: any;

    /**
     * Class constructor's
     * @param router Angular router to navigate the app
     * @param fb Facebook library
     * @param loadingController Controller to show a loading
     * @param fireAuth Firebase library
     */
    constructor(
        private router: Router,
        private fb: Facebook,
        public loadingController: LoadingController,
        private fireAuth: AngularFireAuth
    ) { }

    async ngOnInit() {
        this.loading = await this.loadingController.create({
            message: 'Processing data...'
        });
    }

    /**
     * Present a loading while the user is login in
     * @param loading loading object
     */
    async presentLoading(loading: any) {
        await loading.present();
    }

    public async login() {

        this.fb.login(['email'])
            .then((response: FacebookLoginResponse) => {
                this.presentLoading(this.loading);
                this.onLoginSuccess(response);
            }).catch((error) => {
                console.error(error);
                alert('error:' + error);
            });
    }

    private onLoginSuccess(res: FacebookLoginResponse) {
        const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.fireAuth.auth.signInWithCredential(credential)
            .then((response) => {
                this.router.navigate(['/profile']);
                this.loading.dismiss();
            });

    }
}
