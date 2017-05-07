import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ShoppingCartService } from '../shared/shopping-cart.service';

@Component({
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit{
    myCart: any[];
    cartTotal: number;

    constructor(private cartSVC: ShoppingCartService, private router: Router){}

    ngOnInit(){
        this.cartSVC.getCart()
            .then(theCart=>this.myCart = theCart)
            .then(cart=>this.sumCart(cart))
            .then(sum=>this.cartTotal=sum);

    }

    sumCart(cart: any){
        return Promise.resolve(cart.reduce((total: number, item: any)=> total+item.price, 0));
    }

    removeCart(id: string){
        this.cartSVC.removeCart(id);
        this.sumCart(this.myCart)
            .then(sum=>this.cartTotal = sum);
    }

    purchase(){
        alert('Your order total is ' + this.cartTotal);
        this.router.navigate(['/shop']);
    }

    cancel(){
        this.router.navigate(['/shop']);
    }

}