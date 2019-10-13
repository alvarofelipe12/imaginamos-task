import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    /**
     * Store the user's data
     */
    public user: any = {};

    constructor(
        private router: Router,
        private fireAuth: AngularFireAuth
    ) { }

    ngOnInit() {
        this.setUserData();
    }

    /**
     * Check if the user exist in the db and then assigns the data
     */
    private setUserData(): void {
        this.fireAuth.auth.onAuthStateChanged(user => {
            if (user) {
                this.user = {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    refreshToken: user.refreshToken
                };
            } else {
                this.router.navigate(['/home']);
            }
        });
    }

    /**
     * Handle logout process
     */
    public logout() {
        this.fireAuth.auth.signOut().then(() => {
            this.router.navigate(['/home']);
        });
    }
}
