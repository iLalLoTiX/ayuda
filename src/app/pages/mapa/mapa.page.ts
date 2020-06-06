import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { Marker } from '../../interfaces/marcadores.interface';
import { environment } from '../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { AyudaService } from '../../servicios/ayuda.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  public mapa = Mapboxgl.Map;
  public marcadores;
  public nuevoMarcador;
  public marcas = new Array();
  public currentMarkers = new Array();

  constructor(public loginServices: LoginService, private router: Router, public ayudaServices: AyudaService,
              private geolocation: Geolocation, public alertController: AlertController) {

                this.ayudaServices.obtenerMarcas().subscribe( a => {
                  this.marcas = new Array();
                  this.marcas = a;
                  this.mapa = new Mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-89.426114, 20.3052052], // starting position
                    zoom: 12 // starting zoom
                    });
                
                  this.mapa.addControl(new Mapboxgl.NavigationControl());
                  this.marcas.forEach( b => 
                    {
                    this.cargarMarcadores(b.payload.doc.data()['lng'], b.payload.doc.data()['lat']);
                    });
                });
  }
  

  ngOnInit() {
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-89.426114, 20.3052052], // starting position
    zoom: 12 // starting zoom
    });

    this.mapa.addControl(new Mapboxgl.NavigationControl());
  }

  agregarUbicacion(){

    this.geolocation.getCurrentPosition().then((data: Geoposition) => {


      this.crearMarcador(-89.4189625, 20.3048229);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  // async presentAlert(resp) {
  //   let a = 1;
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert',
  //     subHeader: 'Subtitle',
  //     message: 'This is an alert message.' + resp,
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // } 

  cargarMarcadores(lng: number, lat: number){
    const popup = new Mapboxgl.Popup({ offset: 25 }).setHTML('<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>');

    // create DOM element for the marker
    const el = document.createElement('div');
    
    el.id = 'marker';

    this.marcadores = new Mapboxgl.Marker({el})
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(this.mapa);
      // create the popup

    this.currentMarkers.push(this.marcadores);
  }

  crearMarcador(lng: number, lat: number){
    this.nuevoMarcador = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }
  

  agregarMarcador(){

    // console.log(this.currentMarkers);
    // // remove markers
    // if (this.currentMarkers !== null) {
    //   console.log('uwu');
    //   for (let i = 0; i < this.currentMarkers.length; i++)
    //   {
    //     this.currentMarkers[i].remove();
    //   }
    // }

    // this.ayudaServices.agregarAyuda(this.nuevoMarcador._lngLat);

    this.presentAlertPrompt();
    
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    // this.loginServices.logout();
    this.router.navigateByUrl('/mapa');
  }

}
