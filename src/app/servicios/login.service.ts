import { Injectable } from '@angular/core';

// Angular FireStore
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario: any = {};

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( a => {
      this.usuario = a;
      console.log(this.usuario);
      });
   }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}