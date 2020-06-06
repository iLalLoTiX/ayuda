import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marker } from '../interfaces/marcadores.interface';

@Injectable({
  providedIn: 'root'
})
export class AyudaService {

  public marcas: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {

  }

  obtenerAyuda(){
    this.marcas = this.db.collection('ayuda').valueChanges();
    console.log(this.marcas);
  }

  agregarAyuda(marca: Marker)
  {
    const enviarMarcador: Marker = {
      ...marca
    }
    return this.db.collection('ayuda').add(enviarMarcador);
  }
  
  obtenerMarcas(){
    this.itemsCollection = this.db.collection<any>('ayuda');
    return this.itemsCollection.snapshotChanges().pipe(map(actions => {

      return actions.map(a => {

        return a;

        });

      }));
  }
}
