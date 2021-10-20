import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
  file!: File;
  progress = 0;


  constructor(private productService: ProductsService, private fileService: FileUploadService) { }

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

  handleFinish(event: any){
    let product = event.product ? event.product : null;
    this.file = event.file ? event.file : null;
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
              if(this.file){
                this.fileService.uploadImage(this.file).subscribe(
                  (event: HttpEvent<any>)=>{
                      switch (event.type) {
                        case HttpEventType.Sent:
                            console.log("Requete envoyée avec succès");
                        break;
                        case HttpEventType.UploadProgress:
                            this.progress = Math.round(event.loaded / event.total! * 100)
                        break;
                        case HttpEventType.Response:
                            console.log(event.body);
                            setTimeout(()=> {
                              this.progress = 0;
                            }, 1500);
                      }
                  }
                )
              }
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
