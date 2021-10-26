import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() product!: Product;
  @Output() finish = new EventEmitter();
  productForm!: FormGroup;
  categories!: Category[];
  categorySub!: Subscription;
  idCategory = 1;
  file!: File;
  fileService!: any;



  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, private productService: ProductsService) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required]
      }),
      illustration: fb.group({
        image: [null,Validators.required]
      })
    })
   }

  selectCategory(id: number){
    this.idCategory = id;
  }

  get isProductInfosInvalid(){
    return this.productForm.get('productInfos')!.invalid;
  }

  get isIllustrationInvalid(){
    if(this.product){
      return false;}
    return this.productForm.get('illustration')!.invalid;
  }

  close(){
    this.productForm.reset();
    this.idCategory = 1;
  }

  handleCancel(){
    this.finish.emit();
    this.close();
  }

  handleFinish(){
    let product = {
      ...this.productForm.get('productInfos')?.value,
      ...this.productForm.get('illustration')?.value,
      category: this.idCategory,
      oldImage: null
    }

    if(this.product){
      product.oldImage = this.product.oldImage;
    }

    if(this.file){                                      //permet de voir si on a choisi une image
      product.image = this.file.name;
    }else{
      product.image = this.product.oldImage;
    }

    this.finish.emit({product: product, file: this.file ? this.file : null});
    this.close();
  }

  detectFiles(event: Event){
    const input = event.target as HTMLInputElement;

    if (!input.files?.length){
      return
    }
    this.file = input.files[0];
  }

  updateForm(product: Product){
    this.productForm.patchValue({
      productInfos:{
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      }
    });
    //console.log(product);
    product.oldImage = product.image;
    this.selectCategory(product.Category);
  }

  ngOnChanges(): void{
    if(this.product){
      this.updateForm(this.product);
    }
  }



  ngOnInit(): void {
    this.categorySub = this.categoriesService.getCategory().subscribe(
      (response)=>{
        this.categories = response.result;
        //console.log(this.categories);
      }
    )
  }

  ngOnDestroy(): void{
    this.categorySub.unsubscribe();
  }

}
