import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marker } from '../interfaces/marcadores.interface';
import { AyudaTipo } from '../interfaces/ayudaTipo.interface';

@Injectable({
  providedIn: 'root'
})
export class AyudaService {

  public marcas: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {

  }

  obtenerAyuda(){
    this.marcas = this.db.collection('peticionUsuario').valueChanges();
  }

  agregarAyuda(peticionUsuario: AyudaTipo, marca: Marker)
  {
    const enviarMarcador: Marker = {
      ...marca
    };
    return this.db.collection('peticionUsuario').add(enviarMarcador).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.db.collection('peticionUsuario').doc(ref.id).collection('descripcion').add(peticionUsuario);
    });
  }
  
  obtenerMarcas(){
    this.itemsCollection = this.db.collection<any>('peticionUsuario');
    return this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        return a;
        });
      }));
  }
}
