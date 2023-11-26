import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }

  addProduct(product: Product): void {
    this.productsCollection.add(product);
  }

  updateProduct(product: Product): void {
    const productId = product.id; // Supondo que cada produto tenha um ID único no banco de dados
    delete product.id; // Removendo o ID para evitar a sobreposição no banco de dados

    this.productsCollection.doc(productId).update(product);
  }
}
