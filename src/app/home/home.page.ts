import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, public loginServices: LoginService){

    
  }

  login(){
    this.loginServices.login().then( (resp) => { 
      console.log('uwu');
      console.log(JSON.stringify(resp))
      this.home();
    }).catch( err => {
      console.log('chingaste a tu madre');
    });
  }

  home(){
    this.router.navigateByUrl('/mapa');
  }

}
