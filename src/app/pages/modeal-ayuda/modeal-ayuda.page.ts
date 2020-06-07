import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AyudaTipo } from 'src/app/interfaces/ayudaTipo.interface';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AyudaService } from 'src/app/servicios/ayuda.service';
import { Marker } from '../../interfaces/marcadores.interface';
@Component({
  selector: 'app-modeal-ayuda',
  templateUrl: './modeal-ayuda.page.html',
  styleUrls: ['./modeal-ayuda.page.scss'],
})
export class ModealAyudaPage implements OnInit {
  
  @Output() ProveedorSeleccionado: EventEmitter<any>  = new EventEmitter();
  
  @Input() _lngLat;
  @Input() usuario;
  
  public ayuda: Marker = new Marker();

  public ayudaForm: FormGroup;

  constructor(public ayudaServices: AyudaService, public modalCtrl: ModalController, 
              private fb: FormBuilder, public alertController: AlertController) {
    this.crearFormulario();
    
   }

  crearFormulario(){
    
    this.ayudaForm = this.fb.group({
      medicamentos: [false],
      ropas: [false],
      viveres: [false],
      accidente: [false],
      situacionRiesgo: [false],
      inundacion: [false],
      telefono: [null, [Validators.required]],
      descripcion: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
      'terminado' : false
    });
  }

  Terminado() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
      'terminado' : true
    });
  }

  get validarDescripcion(){
    return this.ayudaForm.get('descripcion').valid;
  }

  get validarTelefono(){
    return this.ayudaForm.get('telefono').valid;
  }

  async altaMarcador() {
    if (this.validarDescripcion === true || this.validarTelefono === true){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmación',
        message: 'Confirmar ayuda',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.ayuda.idUsuario = this.usuario.uid;
              this.ayuda.nombreUsuario = this.usuario.displayName;
              this.ayuda.resuelto = false;
              this.ayuda.lng = this._lngLat._lngLat.lng;
              this.ayuda.lat = this._lngLat._lngLat.lat;
              this.ayuda.descripcion = this.ayudaForm.get('descripcion').value;
              this.ayudaServices.agregarAyuda(this.ayudaForm.value, this.ayuda);
              this._lngLat.remove();
              this.Terminado();
            }
          }
        ]
      });
  
      await alert.present();
    }else{
      if (this.validarDescripcion){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '¡Atención!',
          message: 'Escribe una descripcion',
        });
    
        await alert.present();
      }
      if (this.validarTelefono){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Ingresa tu telefono',
          message: '10 digitos',
        });
    
        await alert.present();
      }
      
    }
    
  }

  async salir() {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cancelar',
        message: '¿Quieres Cancelar la operacion?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this._lngLat.remove();
              this.Terminado();
            }
          }
        ]
      });
      await alert.present();
    }
}
