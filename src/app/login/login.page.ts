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

    private loading: any;

    constructor(
        private router: Router,
        private fb: Facebook,
        public loadingController: LoadingController,
        private fireAuth: AngularFireAuth
    ) { }

    async ngOnInit() {
        this.loading = await this.loadingController.create({
            message: 'Connecting ...'
        });
    }

    async presentLoading(loading: any) {
        await loading.present();
    }

    public async login() {

        this.fb.login(['email'])
            .then((response: FacebookLoginResponse) => {
                this.onLoginSuccess(response);
                console.log(response.authResponse.accessToken);
            }).catch((error) => {
                console.log(error)
                alert('error:' + error)
            });
    }

    private onLoginSuccess(res: FacebookLoginResponse) {
        // const { token, secret } = res;
        const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.fireAuth.auth.signInWithCredential(credential)
            .then((response) => {
                this.router.navigate(["/profile"]);
                this.loading.dismiss();
            })

    }

    private onLoginError(err) {
        console.log(err);
    }
}
