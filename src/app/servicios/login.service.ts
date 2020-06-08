import { Injectable } from '@angular/core';

// Facebook
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

// Angular FireStore
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario: any = {};

  constructor(private afAuth: AngularFireAuth, private fb: Facebook) {

   }

  login() {
    return this.fb.login(['email', 'public_profile']).then( (resp: FacebookLoginResponse) => {
     const credenciaFb = auth.FacebookAuthProvider.credential(resp.authResponse.accessToken);
     return this.afAuth.auth.signInWithCredential(credenciaFb);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
