import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() products!: Product[];
  productModalOpen = false;
  selectedProduct!: Product;


  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  onEdit(product: Product):void {
    this.productModalOpen = true;
    this.selectedProduct = product;

  }

  onDelete(product: Product):void {

  }

  addProduct(): void {
    this.productModalOpen = true;
  }

  handleFinish(product: Product){
    if(product){

      console.log(product);  //affichage dans la console du dernier product ajouté
      if(this.selectedProduct){
        //EDIT PRODUCT
      }else{
        //ADD PRODUCT
        this.productService.addProduct(product).subscribe(
          (data)=>{
            //UPDATE FRONTEND
            //console.log(data);
            if(data.status == 200){
              product.idProduct = data.args.lastInsertId;  //On recherche le dernier Id inséré en DB, et le stocke dans l'idProduct
              this.products.push(product);   //On va insérer dans le template d'affichage ("products") le product que l'on vient d'ajouter en DB
            }
          }
        )
      }
    }
    this.productModalOpen = false;
  }


}
