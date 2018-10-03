import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';
import { Global } from '../../providers/global';
import { CartItem } from "../../models/cart-item.models";
import { ShippiningPage } from '../shippining/shippining';
import { UserResponse } from '../../models/user-response.models';
import { Constants } from '../../models/constants.models';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-cart ',
	templateUrl: 'cart.html',
	providers: [Global]
})
export class CartPage {
	private cartItems = new Array<CartItem>();
	private total: number = 0;
	private checkoutText = 'Pasar por la caja';

	constructor(private global: Global, public navCtrl: NavController, public viewCtrl: ViewController, private toastCtrl: ToastController) {
		let cartItems: Array<CartItem> = global.getCartItems();
		if (cartItems != null) {
			this.cartItems = this.cartItems.concat(cartItems);
		}
		this.calculateTotal();
	}

	removeItem(product) {
		this.global.removeCartItem(product);
		this.cartItems = this.global.getCartItems();
		this.calculateTotal();
	}

	decrementItem(product) {
		var decremented: boolean = this.global.decrementCartItem(product);
		if (!decremented) {
			this.cartItems = this.global.getCartItems();
			this.calculateTotal();
		} else {
			this.total = this.total - Number(product.sale_price);
		}
		this.showToast(decremented ? 'Artículo actualizado' : 'Artículo eliminado');
	}

	incrementItem(product) {
		var incremented: boolean = this.global.incrementCartItem(product);
		if (incremented) {
			this.total = this.total + Number(product.sale_price);
		}
		this.showToast(incremented ? 'Artículo actualizado' : 'Artículo límite máximo alcanzado');
	}

	calculateTotal() {
		let sum: number = 0;
		for (let item of this.cartItems) {
			sum = sum + Number(item.product.sale_price) * item.quantity;
		}
		this.total = sum;
		if (!this.cartItems || !this.cartItems.length) {
			this.checkoutText = 'Carro vacio';
		}
	}

	showToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});
		toast.present();
	}

	proceedCheckout() {
		if (this.cartItems != null && this.cartItems.length > 0) {
			let user: UserResponse = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
			if (user != null) {
				this.navCtrl.push(ShippiningPage);
				this.dismiss();
			} else {
				this.showToast('Inicia Sesión para continuar');
				this.navCtrl.push(LoginPage);
			}
		}
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
