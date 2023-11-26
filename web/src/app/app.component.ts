import { Component } from '@angular/core';
import { Product } from './product/product.model';
import { ProductService } from './product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  products$ = this.productService.getProducts();
  newProduct: Product = { name: '', quantity: 0 };
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  addProduct(): void {
    this.productService.addProduct(this.newProduct);
    this.newProduct = { name: '', quantity: 0 };
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
  }

  updateProduct(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct);
      this.editingProduct = null;
    }
  }
}
