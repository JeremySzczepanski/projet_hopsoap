import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fileShareIconName } from '@cds/core/icon';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit {

  @Input() product!: Product;
  @Output() finish = new EventEmitter();
  productForm!: FormGroup;
  categories!: Category[];
  categorySub!: Subscription;
  idCategory = 1;
  file!: File;
  fileService!: any;



  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required]
      }),
      illustration: fb.group({
        image: ['',Validators.required]
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
    const product = {
      ...this.productForm.get('productInfos')?.value,
      ...this.productForm.get('illustration')?.value,
      category: this.idCategory
    }
    if(this.file){
      product.image = this.file.name;
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
