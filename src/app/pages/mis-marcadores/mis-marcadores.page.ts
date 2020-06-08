import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { Marker } from '../../interfaces/marcadores.interface';
import { environment } from '../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';

import { AlertController } from '@ionic/angular';
import { AyudaService } from '../../servicios/ayuda.service';

// Modal
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModealAyudaPage } from '../modeal-ayuda/modeal-ayuda.page';

@Component({
  selector: 'app-mis-marcadores',
  templateUrl: './mis-marcadores.page.html',
  styleUrls: ['./mis-marcadores.page.scss'],
})
export class MisMarcadoresPage implements OnInit {

  
  public mapa = Mapboxgl.Map;
  public marcadores;
  public nuevoMarcador;
  public marcas = new Array();
  public currentMarkers = new Array();
  public usuario;

  constructor(public loginServices: LoginService, private router: Router, public ayudaServices: AyudaService,
              public modalController: ModalController, public alertController: AlertController, public afAuth: AngularFireAuth) {

                this.ayudaServices.obtenerMarcas().subscribe( a => {
                  this.marcas = new Array();
                  this.marcas = a;
                  this.crearMapa();
                  this.marcas.forEach( b => 
                    {
                    this.cargarMarcadores(b.payload.doc.data()['lng'], b.payload.doc.data()['lat'], b.payload.doc.data()['descripcion']);
                    });
                });

                this.afAuth.authState.subscribe( a => {
                  this.usuario = a;
                  console.log(this.usuario);
                  });
  }
  

  ngOnInit() {
    this.crearMapa();
  }

  crearMapa(){
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

    this.crearMarcador(-89.4189625, 20.3048229);
    // this.geolocation.getCurrentPosition().then((data: Geoposition) => {



    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

  }

  cargarMarcadores(lng: number, lat: number, descripcion: string){
    const popup = new Mapboxgl.Popup({ offset: 25 }).setText(descripcion);

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

  async agregarMarcador() {
    
    const modal = await this.modalController.create({
      component: ModealAyudaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        '_lngLat': this.nuevoMarcador,
        'usuario': this.usuario
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(a => { 
      if (a.data.terminado === true ){
        this.nuevoMarcador.remove();
        this.nuevoMarcador = null;
      }
    });
  }

  async cancelarOpeeacion(){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Atencion! ¿Quieres cancerlar la operacion?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log(data);
              console.log('Confirm Ok');
              this.nuevoMarcador.remove();
              this.nuevoMarcador = null;
            }
          }
        ]
      });
  
      await alert.present();
  }

  logout() {
    this.loginServices.logout();
  }

}
