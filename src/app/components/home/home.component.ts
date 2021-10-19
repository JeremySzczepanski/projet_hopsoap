import { Component, OnInit } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, homeIcon, cogIcon, cloudIcon, imageGalleryIcon, videoGalleryIcon, folderOpenIcon, computerIcon} from '@cds/core/icon';
import { ProductsService } from 'src/app/services/products.service';
import { Response } from '../../models/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products!: any;
  productSub: any;

  constructor(private productServices: ProductsService) { }

  ngOnInit(): void {
      ClarityIcons.addIcons(userIcon, homeIcon, cogIcon, cloudIcon, imageGalleryIcon, videoGalleryIcon, folderOpenIcon, computerIcon  );

      this.productSub = this.productServices.getProducts().subscribe(
        (response: Response)=>{
          this.products = response.result;
          //console.log(response);
        },
        (error)=>{
          console.log(error);
        }
      )
  }

}
