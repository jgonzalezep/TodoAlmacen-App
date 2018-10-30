webpackJsonp([0],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = (function () {
    function Constants() {
    }
    Constants.ADMIN_API_KEY = 'AdminApiKey';
    Constants.USER_API_KEY = 'UserApiKey';
    Constants.USER_KEY = 'UserKey';
    Constants.PRODUCT_CATEGORIES = 'ProductCategories';
    Constants.PAYMENT_GATEWAYS = 'PaymentGateways';
    Constants.SHIPPING_LINES = 'ShippingLines';
    Constants.SELECTED_ADDRESS = 'SelectedAddress';
    Constants.SELECTED_COUPON = 'SelectedCoupon';
    Constants.SELECTED_ADDRESS_LIST = 'AddressList';
    Constants.CURRENCY = 'Currency';
    return Constants;
}());

//# sourceMappingURL=constants.models.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippiningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_payment__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__code_code__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addressselect_addressselect__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_cart_item_models__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ShippiningPage = (function () {
    function ShippiningPage(modalCtrl, navCtrl, navParams, global, toastCtrl) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.editMainCart = false;
        this.total = 0;
        this.total_items = 0;
        this.total_items_html = '0';
        this.total_html = '0';
        this.deliveryPayble = '0';
        this.couponAmount = '0';
        this.addressChangeText = 'Change';
        this.currencyIcon = '';
        this.currencyText = '';
        var product = this.navParams.get('pro');
        if (product == null) {
            this.cartItems = global.getCartItems();
            this.editMainCart = true;
        }
        else {
            var cartItems = new Array();
            var cartItem = new __WEBPACK_IMPORTED_MODULE_7__models_cart_item_models__["a" /* CartItem */]();
            cartItem.product = product;
            cartItem.product_id = product.id;
            cartItem.quantity = 1;
            cartItems.push(cartItem);
            this.cartItems = cartItems;
        }
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
        }
        this.deliveryPayble = this.currencyIcon + ' ' + this.deliveryPayble;
        this.calculateTotal();
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
    }
    ShippiningPage.prototype.ionViewDidEnter = function () {
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        this.addressChangeText = this.selectedAddress == null ? 'Añadir' : 'Cambiar';
    };
    ShippiningPage.prototype.addressPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__addressselect_addressselect__["a" /* AddressSelectPage */], { action: 'Escojer' });
    };
    ShippiningPage.prototype.removeItem = function (product) {
        if (this.editMainCart) {
            this.global.removeCartItem(product);
            this.cartItems = this.global.getCartItems();
            this.calculateTotal();
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                this.cartItems.splice(pos, 1);
                this.cartItems = this.cartItems;
            }
        }
        if (this.cartItems.length == 0) {
            this.navCtrl.pop();
        }
    };
    ShippiningPage.prototype.decrementItem = function (product) {
        if (this.editMainCart) {
            var decremented = this.global.decrementCartItem(product);
            if (!decremented) {
                this.cartItems = this.global.getCartItems();
                this.calculateTotal();
            }
            else {
                this.total_items_html = this.currencyIcon + ' ' + (this.total - Number(product.sale_price));
            }
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                if (this.cartItems[pos].quantity > 1) {
                    this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
                    this.cartItems = this.cartItems;
                }
                else {
                    this.cartItems.splice(pos, 1);
                    this.cartItems = this.cartItems;
                }
                this.calculateTotal();
            }
        }
        if (this.cartItems.length == 0) {
            this.navCtrl.pop();
        }
    };
    ShippiningPage.prototype.incrementItem = function (product) {
        if (this.editMainCart) {
            var incremented = this.global.incrementCartItem(product);
            if (incremented) {
                this.calculateTotal();
            }
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
                this.cartItems = this.cartItems;
                this.calculateTotal();
            }
        }
    };
    ShippiningPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ShippiningPage.prototype.calculateTotal = function () {
        var sum = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var item = _a[_i];
            sum = sum + Number(item.product.sale_price) * item.quantity;
        }
        this.total_items = sum;
        this.total = (sum - (this.coupon ? this.coupon.discount_type == 'percent' ? (sum * Number(this.coupon.amount) / 100) : Number(this.coupon.amount) : 0));
        this.total_items_html = this.currencyIcon + ' ' + this.total_items;
        this.total_html = this.currencyIcon + ' ' + this.total;
    };
    ShippiningPage.prototype.paymentPage = function () {
        if (this.selectedAddress == null) {
            this.showToast('Por favor seleccione una dirección.');
        }
        else {
            if (!this.coupon) {
                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
            }
            if (this.total > 12000) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_payment__["a" /* PaymentPage */], { cart: this.cartItems, totalItems: this.total_items, total: this.total });
            }
            else {
                alert("Su pedido debe ser mayor a $ 12.000.");
            }
        }
    };
    ShippiningPage.prototype.codePage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__code_code__["a" /* CodePage */]);
        modal.onDidDismiss(function () {
            var coupon = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON));
            if (coupon) {
                if (coupon.discount_type == 'fixed_product') {
                    var allowed = false;
                    for (var _i = 0, _a = coupon.product_ids; _i < _a.length; _i++) {
                        var itemCA = _a[_i];
                        for (var _b = 0, _c = _this.cartItems; _b < _c.length; _b++) {
                            var item = _c[_b];
                            if (itemCA == Number(item.product_id)) {
                                allowed = true;
                                break;
                            }
                        }
                        if (allowed) {
                            break;
                        }
                    }
                    if (allowed) {
                        _this.coupon = coupon;
                        _this.couponAmount = _this.currencyIcon + ' ' + _this.coupon.amount + (_this.coupon.discount_type == 'percent' ? '%' : '');
                        _this.calculateTotal();
                    }
                }
                else {
                    _this.coupon = coupon;
                    _this.couponAmount = _this.currencyIcon + ' ' + _this.coupon.amount + (_this.coupon.discount_type == 'percent' ? '%' : '');
                    _this.calculateTotal();
                }
            }
        });
        modal.present();
    };
    ShippiningPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ShippiningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shippining ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\shippining\shippining.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton="true">\n\n        <button style="background-color:transparent;" ion-button (click)="goBack()">\n\n            <ion-icon style="color: #ffffff !important; font-size:2.4rem;" name="md-arrow-back"></ion-icon>\n\n        </button>\n\n        <ion-title>Confirmar pedido</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div class="address-section">\n\n        <ion-row text-center class="status">\n\n            <ion-col class="complate">\n\n                <ion-icon name="ios-checkmark-circle"></ion-icon>\n\n                <span>Registrarse</span>\n\n            </ion-col>\n\n            <ion-col class="processing">\n\n                <ion-icon name="md-radio-button-off"></ion-icon>\n\n                <span>Envío</span>\n\n            </ion-col>\n\n            <ion-col class="panding">\n\n                <ion-icon name="ion-record"></ion-icon>\n\n                <span>Pago</span>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-card>\n\n            <ion-card-header>\n\n                <p>\n\n                    TU DIRECCIÓN DE ENTREGA\n\n                    <span class="text-sky" (click)="addressPage()">{{addressChangeText}}\n\n                        <ion-icon name="ios-arrow-forward" class="icon"></ion-icon>\n\n                    </span>\n\n                </p>\n\n            </ion-card-header>\n\n            <ion-card-content *ngIf="!selectedAddress">\n\n                <div class="addres-detail">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>Sin dirección seleccionada\n\n                    </h3>\n\n                    <p>Añade una dirección para continuar.</p>\n\n                </div>\n\n            </ion-card-content>\n\n            <ion-card-content *ngIf="selectedAddress">\n\n                <div class="addres-detail">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{selectedAddress.first_name}}\n\n                    </h3>\n\n                    <p>{{selectedAddress.address_1}}, {{selectedAddress.address_2}}\n\n                        <br> {{selectedAddress.city}}</p>\n\n                    <p>{{selectedAddress.phone}}</p>\n\n                </div>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n    <div class="your-items">\n\n        <ion-card *ngIf="cartItems && cartItems.length">\n\n            <ion-card-header>\n\n                <p>TUS COSAS</p>\n\n            </ion-card-header>\n\n            <ion-card-content *ngFor="let item of cartItems">\n\n                <ion-row>\n\n                    <ion-col col-3>\n\n                        <div *ngIf="item.product.images && item.product.images.length" class="img-box">\n\n                            <img data-src="{{item.product.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="!item.product.images || !item.product.images.length" class="img-box">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-9>\n\n                        <h4>{{item.product.name}}</h4>\n\n                        <div class="rate">\n\n                            <div style="display: flex;" class="price-box">\n\n                                <div class="price text-light" padding-right [innerHTML]="item.product.regular_price_html">\n\n                                </div>\n\n                                <div class="price text-sky" [innerHTML]="item.product.sale_price_html">\n\n                                </div>\n\n                            </div>\n\n                            <p text-right>\n\n                                <span class="">\n\n                                    <ion-icon name="ios-add" (click)="incrementItem(item.product)"></ion-icon>\n\n                                    {{item.quantity}}\n\n                                    <ion-icon name="ios-remove" (click)="decrementItem(item.product)"></ion-icon>\n\n                                </span>\n\n                            </p>\n\n                        </div>\n\n                        <p class="card-bottom" padding-top>\n\n                            <span class="text-sky small" text-right (click)="removeItem(item.product)"> Remove</span>\n\n                        </p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n    <div class="spacebar-bottom"></div>\n\n    <div class="receipt btn-fisx-bottom">\n\n        <ion-card>\n\n            <ion-card-header>\n\n                <p>Artículos precio\n\n                    <span text-right [innerHTML]="total_items_html">\n\n                    </span>\n\n                </p>\n\n                <p>Entrega a pagar\n\n                    <span text-right [innerHTML]="deliveryPayble">\n\n                    </span>\n\n                </p>\n\n                <p *ngIf="coupon">Cupon ({{coupon.code}}) aplicado\n\n                    <span text-right [innerHTML]="couponAmount">\n\n                    </span>\n\n                </p>\n\n                <div text-center class="text-sky" (click)="codePage()">¿Tienes código promocional?</div>\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                <p>Total\n\n                    <span text-right [innerHTML]="total_html">\n\n                    </span>\n\n                </p>\n\n                <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="paymentPage()">CONTINUAR</button>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\shippining\shippining.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], ShippiningPage);
    return ShippiningPage;
}());

//# sourceMappingURL=shippining.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_order_update_request_models__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__itemdetail_itemdetail__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Myorder_2Page = (function () {
    function Myorder_2Page(modalCtrl, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.orders = new Array();
        this.pageNo = 1;
        this.currencyIcon = '';
        this.currencyText = '';
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
        this.loadMyOrders();
        this.presentLoading('Cargando compras');
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
        }
    }
    Myorder_2Page.prototype.loadMyOrders = function () {
        var _this = this;
        var subscription = this.service.myOrders(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var order = data_1[_i];
                for (var _a = 0, _b = order.line_items; _a < _b.length; _a++) {
                    var line = _b[_a];
                    line.price_html = _this.currencyIcon + ' ' + line.price;
                }
            }
            _this.dismissLoading();
            _this.orders = data;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.itemdetailPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro_id: item.product_id });
    };
    Myorder_2Page.prototype.cancelOrder = function (order) {
        var _this = this;
        this.presentLoading('Cancelling order');
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(order.id), new __WEBPACK_IMPORTED_MODULE_4__models_order_update_request_models__["a" /* OrderUpdateRequest */]('cancelled')).subscribe(function (data) {
            var orderRes = data;
            order.status = 'cancelled';
            /* for(let o of this.orders) {
                console.log(String(o.id) == String(orderRes.id));
                if(o.id == orderRes.id) {
                    o = orderRes;
                    console.log('here');
                    this.orders = this.orders;
                    break;
                }
            } */
            _this.dismissLoading();
            _this.showToast('Order cancelled');
        }, function (err) {
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.pageNo++;
        var subscription = this.service.myOrders(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(function (data) {
            var orders = data;
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var order = data_2[_i];
                for (var _a = 0, _b = order.line_items; _a < _b.length; _a++) {
                    var line = _b[_a];
                    line.price_html = _this.currencyIcon + ' ' + line.price;
                }
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    Myorder_2Page.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    Myorder_2Page.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    Myorder_2Page.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Myorder_2Page.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    Myorder_2Page.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    Myorder_2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myorder_2 ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\myorder_2\myorder_2.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Mi Orden\n\n            <span float-right> \n\n              <ion-icon class="icon" (click)="searchPage()"><img src="assets/imgs/ic_search.png" width="100%;"></ion-icon>\n\n              <ion-icon class="icon" (click)="cartPage()"><img src="assets/imgs/ic_my_cart.png" width="100%;"></ion-icon>             \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-list>\n\n        <ion-card *ngFor="let order of orders">\n\n            <ion-card-content>\n\n                <ion-row *ngFor="let item of order.line_items">\n\n                    <ion-col>\n\n                        <h4 (click)="itemdetailPage(item)">{{item.name}}</h4>\n\n                        <div class="card-btn" float-right>\n\n                            <small *ngIf="order.status == \'en espera\' || order.status == \'pendiente\'|| order.status == \'procensando\'" class="text-sky" (click)="cancelOrder(order)">Cancel order</small>\n\n                            <small class="text-green">{{order.status}}</small>\n\n                        </div>\n\n                        <div class="rate">\n\n                            <p class=text-light>Comprado el {{order.date_created}}</p>\n\n                            <div style="display: flex;">\n\n                                <!-- <div class="price text-light mr-5">\n\n                                <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{item.price}}\n\n                            </div> -->\n\n                                <div class="price text-sky" [innerHTML]="item.price_html">\n\n                                    <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">0 -->\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </ion-list>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\myorder_2\myorder_2.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], Myorder_2Page);
    return Myorder_2Page;
}());

//# sourceMappingURL=myorder_2.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_address_models__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddressPage = (function () {
    function AddressPage(navCtrl, navParams, modalCtrl, viewCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.address = new __WEBPACK_IMPORTED_MODULE_3__models_address_models__["a" /* Address */]();
        var address = this.navParams.get('address');
        if (address != null) {
            this.address = address;
        }
        else {
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY));
            this.address.id = -1;
            if (user != null) {
                this.address.first_name = user.first_name;
                this.address.last_name = user.last_name;
                this.address.email = user.email;
            }
        }
        this.addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
    }
    AddressPage.prototype.saveAddress = function () {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.address.first_name.length == 0) {
            this.showToast('Enter first name');
        }
        else if (this.address.last_name.length == 0) {
            this.showToast('Enter last name');
        }
        else if (this.address.email.length <= 5 || !reg.test(this.address.email)) {
            this.showToast('Enter valid email address');
        }
        else if (this.address.phone.length == 0) {
            this.showToast('Enter phone number');
        }
        else if (this.address.address_1.length == 0) {
            this.showToast('Enter address line one');
        }
        else if (this.address.address_2.length == 0) {
            this.showToast('Enter address line 2');
        }
        else if (this.address.city.length == 0) {
            this.showToast('Enter city');
        }
        else if (this.address.state.length == 0) {
            this.showToast('Enter state');
        }
        else if (this.address.postcode.length == 0) {
            this.showToast('Enter postcode');
        }
        else if (this.address.country.length == 0) {
            this.showToast('Enter country');
        }
        else {
            if (this.address.id == -1) {
                if (!this.addresses) {
                    this.addresses = new Array();
                }
                this.address.id = this.addresses.length + 1;
                this.addresses.push(this.address);
            }
            else {
                var index = -1;
                for (var i = 0; i < this.addresses.length; i++) {
                    if (this.address.id == this.addresses[i].id) {
                        index = i;
                        break;
                    }
                }
                if (index != -1) {
                    this.addresses[index] = this.address;
                }
            }
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST, JSON.stringify(this.addresses));
            this.navCtrl.pop();
        }
    };
    AddressPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddressPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    AddressPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    AddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-address ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\address\address.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Nueva dirección\n\n            <span float-right> \n\n                 <ion-icon class="icon" (click)="searchPage()"><img src="assets/imgs/ic_search.png" width="100%;"></ion-icon>\n\n              <ion-icon class="icon" (click)="cartPage()"><img src="assets/imgs/ic_my_cart.png" width="100%;"></ion-icon>              \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Nombre</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.first_name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Apellido</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.last_name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Email</ion-label>\n\n                <ion-input type="email" text-right placeholder="" [(ngModel)]="address.email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Telefono</ion-label>\n\n                <ion-input type="tel" text-right placeholder="" [(ngModel)]="address.phone"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Dirección 1</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.address_1"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Dirección 1</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.address_2"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Ciudad</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.city"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Region</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.state"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Pais</ion-label>\n\n                <ion-input type="text" text-right placeholder="" [(ngModel)]="address.country"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>Codigo postal</ion-label>\n\n                <ion-input type="number" text-right placeholder="" [(ngModel)]="address.postcode"></ion-input>\n\n            </ion-item>\n\n            <!--\n\n<ion-item>\n\n    <ion-label>Country</ion-label>\n\n    <ion-input type="text" text-right placeholder="Country" [(ngModel)]="address.country"></ion-input>\n\n</ion-item>\n\n-->\n\n        </ion-list>\n\n        <div class="btn-fisx-bottom">\n\n            <button ion-button full class="bg-thime btn-round btn-text" (click)="saveAddress()">Guardar Dirección</button>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\address\address.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], AddressPage);
    return AddressPage;
}());

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PasswordPage = (function () {
    function PasswordPage(toastCtrl, navCtrl, service, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
    }
    PasswordPage.prototype.resetPassword = function () {
        var _this = this;
        if (this.userLogin && this.userLogin.length) {
            this.presentLoading('Initiating reset email request.');
            var subscription = this.service.resetPassword(this.userLogin).subscribe(function (data) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            });
            this.subscriptions.push(subscription);
        }
        else {
            this.showToast('Enter valid username');
        }
    };
    PasswordPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PasswordPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PasswordPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-password ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\password\password.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Se te olvidó tu contraseña\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center>Ingrese su dirección de correo electrónico registrada o nombre de usuario\n\n            <br>para restablecer su contraseña.</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-input type="text" text-right placeholder="Enter your registered email or username" [(ngModel)]="userLogin"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="resetPassword()">Enviar</button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\password\password.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], PasswordPage);
    return PasswordPage;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateaccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_auth_credential_models__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CreateaccountPage = (function () {
    function CreateaccountPage(events, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.authError = "";
        this.subscriptions = [];
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__["a" /* RegisterRequest */]('', '', '');
        this.registerRequestPasswordConfirm = '';
    }
    CreateaccountPage.prototype.register = function () {
        var _this = this;
        this.authError = "";
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.registerRequest.username.length < 4) {
            this.showToast('Introduzca el nombre de usuario al menos 4 caracteres de largo');
        }
        else if (this.registerRequest.email.length <= 5 || !reg.test(this.registerRequest.email)) {
            this.showToast('Introduce una dirección de correo electrónico válida');
        }
        else if (this.registerRequest.password.length == 0 || !(this.registerRequest.password === this.registerRequestPasswordConfirm)) {
            this.showToast('Introduce contraseñas válidas, dos veces.');
        }
        else {
            this.presentLoading('Registrando Usuario');
            var subscription = this.service.createUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.registerRequest).subscribe(function (data) {
                var registerResponse = data;
                _this.signIn(String(registerResponse.id), _this.registerRequest.username, _this.registerRequest.password);
            }, function (err) {
                _this.authError = err.error.message;
                console.log(_this.authError);
                var pos = _this.authError.indexOf('<a');
                if (pos != -1) {
                    _this.authError = _this.authError.substr(0, pos) + '<a target="_blank" ' + _this.authError.substr(pos + 2, _this.authError.length - 1);
                }
                _this.dismissLoading();
                //this.presentErrorAlert("Unable to register with provided credentials");
            });
            this.subscriptions.push(subscription);
        }
    };
    CreateaccountPage.prototype.signIn = function (userId, username, password) {
        var _this = this;
        var credentials = new __WEBPACK_IMPORTED_MODULE_7__models_auth_credential_models__["a" /* AuthCredential */](username, password);
        var subscription = this.service.getAuthToken(credentials).subscribe(function (data) {
            var authResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
            _this.getUser(userId);
        }, function (err) {
            _this.dismissLoading();
            _this.presentErrorAlert("No se puede iniciar sesión con las credenciales proporcionadas");
        });
        this.subscriptions.push(subscription);
    };
    CreateaccountPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login');
        }, function (err) {
            _this.dismissLoading();
            _this.presentErrorAlert("No se puede iniciar sesión con las credenciales proporcionadas");
        });
        this.subscriptions.push(subscription);
    };
    CreateaccountPage.prototype.signinPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    CreateaccountPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CreateaccountPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CreateaccountPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    CreateaccountPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateaccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-createaccount',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\createaccount\createaccount.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Crear cuenta</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center padding-bottom margin-bottom>Crear cuenta para TodoAlmacen.cl</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Usuario</ion-label>\n\n                <ion-input type="text" text-right placeholder="Usuario" [(ngModel)]="registerRequest.username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Email</ion-label>\n\n                <ion-input type="email" text-right placeholder="Email" [(ngModel)]="registerRequest.email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Contraseña</ion-label>\n\n                <ion-input type="password" text-right placeholder="Crear contraseña" [(ngModel)]="registerRequest.password"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Confirmar contraseña</ion-label>\n\n                <ion-input type="password" text-right placeholder="Confirmar contraseña" [(ngModel)]="registerRequestPasswordConfirm"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <p text-center [innerHTML]="authError"></p>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="register()">Continuar</button>\n\n    </div>\n\n    <p text-center (click)="signinPage()" class="btn-fisx-bottom">\n\n        <small>\n\n            Estas registrado?\n\n            <span class="text-sky">\n\n                Inicia Sesión\n\n            </span>\n\n        </small>\n\n    </p>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\createaccount\createaccount.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], CreateaccountPage);
    return CreateaccountPage;
}());

//# sourceMappingURL=createaccount.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthCredential; });
var AuthCredential = (function () {
    function AuthCredential(username, password) {
        this.username = username;
        this.password = password;
    }
    return AuthCredential;
}());

//# sourceMappingURL=auth-credential.models.js.map

/***/ }),

/***/ 135:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 135;

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shippining_shippining__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CartPage = (function () {
    function CartPage(global, navCtrl, viewCtrl, toastCtrl) {
        this.global = global;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.cartItems = new Array();
        this.total = 0;
        this.checkoutText = 'Pasar por la caja';
        var cartItems = global.getCartItems();
        if (cartItems != null) {
            this.cartItems = this.cartItems.concat(cartItems);
        }
        this.calculateTotal();
    }
    CartPage.prototype.removeItem = function (product) {
        this.global.removeCartItem(product);
        this.cartItems = this.global.getCartItems();
        this.calculateTotal();
    };
    CartPage.prototype.decrementItem = function (product) {
        var decremented = this.global.decrementCartItem(product);
        if (!decremented) {
            this.cartItems = this.global.getCartItems();
            this.calculateTotal();
        }
        else {
            this.total = this.total - Number(product.sale_price);
        }
        this.showToast(decremented ? 'Artículo actualizado' : 'Artículo eliminado');
    };
    CartPage.prototype.incrementItem = function (product) {
        var incremented = this.global.incrementCartItem(product);
        if (incremented) {
            this.total = this.total + Number(product.sale_price);
        }
        this.showToast(incremented ? 'Artículo actualizado' : 'Artículo límite máximo alcanzado');
    };
    CartPage.prototype.calculateTotal = function () {
        var sum = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var item = _a[_i];
            sum = sum + Number(item.product.sale_price) * item.quantity;
        }
        this.total = sum;
        if (!this.cartItems || !this.cartItems.length) {
            this.checkoutText = 'Carro vacio';
        }
    };
    CartPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CartPage.prototype.proceedCheckout = function () {
        if (this.cartItems != null && this.cartItems.length > 0) {
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY));
            if (user != null) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shippining_shippining__["a" /* ShippiningPage */]);
                this.dismiss();
            }
            else {
                this.showToast('Inicia Sesión para continuar');
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
            }
        }
    };
    CartPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\cart\cart.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <!--\n\n<button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n-->\n\n        <ion-title>Carro\n\n            <span float-right>\n\n                <ion-icon class="icon" (click)="dismiss()">\n\n                    <img src="assets/imgs/ic_cross.png" width="100%;">\n\n                </ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div class="your-cart bg-thime">\n\n        <ion-card *ngFor="let item of cartItems">\n\n            <ion-card-content>\n\n                <ion-row>\n\n                    <ion-col col-3>\n\n                        <div *ngIf="item.product.images && item.product.images.length" class="img-box">\n\n                            <img data-src="{{item.product.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="!item.product.images || !item.product.images.length" class="img-box">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-9>\n\n                        <h4>{{item.product.name}}\n\n                            <span class="icon text-light">\n\n                                <img src="assets/imgs/delete.png" (click)="removeItem(item.product)">\n\n                            </span>\n\n                        </h4>\n\n                        <div class="rate">\n\n                            <div style="display: flex;" class="price-box">\n\n                                <div class="price text-light" padding-right [innerHTML]="item.product.regular_price_html">\n\n                                    <!-- <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{item.product.regular_price}} -->\n\n                                </div>\n\n                                <div class="price text-sky" [innerHTML]="item.product.sale_price_html">\n\n                                    <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{item.product.sale_price}} -->\n\n                                </div>\n\n                            </div>\n\n                            <p text-right>\n\n                                <span class="text-light">\n\n                                    <ion-icon name="ios-add" (click)="incrementItem(item.product)"></ion-icon>\n\n                                    {{item.quantity}}\n\n                                    <ion-icon name="ios-remove" (click)="decrementItem(item.product)"></ion-icon>\n\n                                </span>\n\n                            </p>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card-content>\n\n        </ion-card>\n\n\n\n\n\n        <ion-row class="checkout">\n\n            <ion-col col-6>\n\n                <h6 class="text-white">\n\n                    Total\n\n                    <span>\n\n                        {{total}}</span>\n\n                </h6>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <button ion-button full class="bg-green btn-round btn-text btn-shadow" (click)="proceedCheckout()">{{checkoutText}}</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\cart\cart.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var WordpressClient = (function () {
    function WordpressClient(config, http) {
        this.config = config;
        this.http = http;
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    WordpressClient.prototype.getUser = function (adminToken, userId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/customers/' + userId, { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.updateUser = function (adminToken, userId, userUpdateRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .put(this.config.apiBase + 'wc/v2/customers/' + userId, JSON.stringify(userUpdateRequest), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createUser = function (adminToken, credentials) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .post(this.config.apiBase + 'wp/v2/users', JSON.stringify(credentials), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getAuthToken = function (credentials) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.config.apiBase + 'mobile-ecommerce/v1/jwt/token', JSON.stringify(credentials), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.resetPassword = function (userName) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.config.apiBase + 'mobile-ecommerce/v1/password/forgot', JSON.stringify({ user_login: userName }), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createOrder = function (adminToken, createOrder) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .post(this.config.apiBase + 'wc/v2/orders/', JSON.stringify(createOrder), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.myOrders = function (adminToken, customer_id, pageNo) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/orders/' + '?customer=' + customer_id + '&page=' + pageNo, { headers: myHeaders })
            .concatMap(function (data) {
            for (var i = 0; i < data.length; i++) {
                var order = data[i];
                order.date_created = _this.formatDate(new Date(order.date_created));
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.updateOrder = function (adminToken, orderId, orderUpdateRequest) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .put(this.config.apiBase + 'wc/v2/orders/' + orderId, JSON.stringify(orderUpdateRequest), { headers: myHeaders })
            .concatMap(function (data) {
            var order = data;
            order.date_created = _this.formatDate(new Date(order.date_created));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingLines = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/shipping_methods/', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getCouponByCode = function (adminToken, cCode) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/coupons?code=' + cCode, { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.applyCouponCode = function (adminToken, orderId, cCode) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'mobile-ecommerce/v1/coupon/order/' + orderId + '/apply-coupon?code=' + cCode, { headers: myHeaders })
            .concatMap(function (data) {
            var order = data;
            order.date_created = _this.formatDate(new Date(order.date_created));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.categories = function (adminToken, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/categories/?per_page=20&order=desc&orderby=count&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productVariations = function (adminToken, productId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + productId + '/variations/', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsReviews = function (adminToken, productId) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + productId + '/reviews/', { headers: myHeaders })
            .concatMap(function (data) {
            for (var i = 0; i < data.length; i++) {
                var review = data[i];
                review.date_created = _this.formatDate(new Date(review.date_created));
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.banners = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'mobile-ecommerce/v1/banners/list', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsAll = function (adminToken, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + '?per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productById = function (adminToken, proId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + proId, { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsByQuery = function (adminToken, query, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + '?search=' + query + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsByCategory = function (adminToken, catId, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + '?category=' + catId + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.currencies = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/settings/general/woocommerce_currency', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.paymentGateways = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/payment_gateways/', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.formatDate = function (date) {
        return this.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    };
    WordpressClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], WordpressClient);
    return WordpressClient;
}());

//# sourceMappingURL=wordpress-client.service.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchPage = (function () {
    function SearchPage(navParams, viewCtrl, modalCtrl, toastCtrl, navCtrl, service, global, loadingCtrl, alertCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.subscriptions = [];
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.queryHistory = new Array();
        this.queryHistory = global.getSearchHistory();
    }
    SearchPage.prototype.doSearch = function () {
        var _this = this;
        var subscription = this.service.productsByQuery(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.query, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            var productsAll = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                productsAll.push(proSplit);
            }
            _this.productsAll = productsAll;
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    SearchPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsByQuery(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.query, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    SearchPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    SearchPage.prototype.clearHistory = function () {
        this.global.clearSearchHistory();
        this.queryHistory = new Array();
    };
    SearchPage.prototype.search = function (q) {
        this.query = q;
        this.productsAllPage = 1;
        this.doSearch();
        this.global.addInSearchHistory(q);
        this.showToast('Searching...');
    };
    SearchPage.prototype.getItems = function (searchbar) {
        var q = searchbar.srcElement.value;
        if (!q) {
            return;
        }
        this.search(q);
    };
    SearchPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SearchPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\search\search.html"*/'<ion-content class="bg-light">\n\n    <div class="d-flex searchbar-section">\n\n        <ion-searchbar (ionInput)="getItems($event)" placeholder="Search Brand of product"></ion-searchbar>\n\n        <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>\n\n    </div>\n\n\n\n    <div class="recent-search">\n\n        <ion-card *ngIf="queryHistory && queryHistory.length">\n\n            <ion-card-header>\n\n                Recent Search\n\n                <span text-right class="right" (click)="clearHistory()">Clear History</span>\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                <p *ngFor="let query of queryHistory" (click)="search(query)">\n\n                    <ion-icon name="ios-time-outline"></ion-icon>{{query}}\n\n                </p>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n\n\n    <div class="trending-search">\n\n        <p class="small">Search results for {{query}}</p>\n\n        <div>\n\n            <ion-list>\n\n                <ion-row *ngFor="let products of productsAll">\n\n                    <ion-col col-6 *ngFor="let pro of products">\n\n                        <ion-card>\n\n                            <ion-card-header>\n\n                                <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                                    <img data-src="{{pro.images[0].src}}">\n\n                                </div>\n\n                                <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                                    <img src="assets/imgs/suit_PNG8132.png">\n\n                                </div>\n\n                                <ion-icon name="md-heart" class="text-light icon"></ion-icon>\n\n                            </ion-card-header>\n\n                            <ion-card-content (click)="itemdetailPage(pro)">\n\n                                <h5>{{pro.name}}</h5>\n\n                                <div class="rateing">\n\n                                    <div class="btn-star">\n\n                                        <span class="text-white bg-green small-text">{{pro.average_rating}}\n\n                                            <ion-icon name="md-star"></ion-icon>\n\n                                        </span>\n\n                                        <span class="text-light bold"> ({{pro.rating_count}})</span>\n\n                                    </div>\n\n                                    <div style="width: 70%;" float-right>\n\n                                        <div *ngIf="pro.type ==\'simple\'" class="price text-sky" [innerHTML]="pro.sale_price_html" style="float: right;">\n\n                                            <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                        </div>\n\n                                        <div *ngIf="pro.type ==\'variable\'" class="price text-sky" [innerHTML]="pro.price_html" style="float: right;">\n\n                                            <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                        </div>\n\n                                        <div *ngIf="pro.type ==\'simple\' && pro.regular_price!=pro.sale_price" class="price text-light mr-5" [innerHTML]="pro.regular_price_html"\n\n                                            style="float: right;">\n\n                                            <!-- <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{pro.regular_price}} -->\n\n                                        </div>\n\n                                    </div>\n\n                                </div>\n\n                            </ion-card-content>\n\n                        </ion-card>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-list>\n\n            <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n                <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n            </ion-infinite-scroll>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\search\search.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartItem; });
var CartItem = (function () {
    function CartItem() {
    }
    return CartItem;
}());

//# sourceMappingURL=cart-item.models.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__placed_placed__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_order_request_models__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_order_update_request_models__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_paypal__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_js_sha512__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_js_sha512___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_js_sha512__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_app_config__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_home__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var PaymentPage = (function () {
    function PaymentPage(config, iab, payPal, toastCtrl, navCtrl, navParams, service, loadingCtrl, alertCtrl) {
        this.config = config;
        this.iab = iab;
        this.payPal = payPal;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.placedPagePushed = false;
        this.paymentDone = false;
        this.paymentFailAlerted = false;
        this.subscriptions = [];
        this.paymentGateways = new Array();
        this.totalItems = 0;
        this.total = 0;
        this.couponApplied = false;
        this.cartItems = this.navParams.get('cart');
        this.totalItems = this.navParams.get('totalItems');
        this.total = this.navParams.get('total');
        var paymentGateways = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].PAYMENT_GATEWAYS));
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        if (paymentGateways != null) {
            for (var _i = 0, paymentGateways_1 = paymentGateways; _i < paymentGateways_1.length; _i++) {
                var pg = paymentGateways_1[_i];
                if (pg.enabled) {
                    this.paymentGateways.push(pg);
                }
            }
        }
    }
    PaymentPage.prototype.paymentMethod = function (paymentGateway) {
        this.selectedPaymentGateway = paymentGateway;
    };
    PaymentPage.prototype.placedPage = function () {
        var _this = this;
        if (this.selectedPaymentGateway == null) {
            this.showToast('Elige el método de pagO.');
        }
        else {
            this.orderRequest = new __WEBPACK_IMPORTED_MODULE_5__models_order_request_models__["a" /* OrderRequest */]();
            this.orderRequest.payment_method = this.selectedPaymentGateway.id;
            this.orderRequest.payment_method_title = this.selectedPaymentGateway.title;
            this.orderRequest.set_paid = false;
            this.orderRequest.billing = this.selectedAddress;
            this.orderRequest.shipping = this.selectedAddress;
            this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
            this.orderRequest.customer_id = String(this.user.id);
            this.orderRequest.line_items = this.cartItems;
            for (var _i = 0, _a = this.orderRequest.line_items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.product = null;
            }
            this.presentLoading('Creando orden');
            var subscription = this.service.createOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.orderRequest).subscribe(function (data) {
                _this.orderResponse = data;
                var coupon = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON));
                if (coupon) {
                    var couponSubs = _this.service.applyCouponCode(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(_this.orderResponse.id), coupon.code).subscribe(function (data) {
                        _this.couponApplied = true;
                        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                        _this.showToast('Cupón aplicado.');
                        _this.orderPlaced();
                    }, function (err) {
                        console.log(err);
                        _this.dismissLoading();
                    });
                    _this.subscriptions.push(couponSubs);
                }
                else {
                    _this.orderPlaced();
                }
            }, function (err) {
                _this.dismissLoading();
            });
            this.subscriptions.push(subscription);
        }
    };
    PaymentPage.prototype.orderPlaced = function () {
        this.dismissLoading();
        if (this.selectedPaymentGateway.id === "paypal") {
            this.initPayPal();
        }
        else if (this.selectedPaymentGateway.id === "ppec_paypal") {
            this.initPayPal();
        }
        else if (this.selectedPaymentGateway.id === "flow" || this.selectedPaymentGateway.id === "payuindia") {
            this.initPayUMoney();
        }
        else if (this.selectedPaymentGateway.id === "cod") {
            this.showToast('Procesado vía efectivo contra entrega');
            this.clearCart();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
    };
    // Example sandbox response
    //
    // {
    //   "client": {
    //     "environment": "sandbox",
    //     "product_name": "PayPal iOS SDK",
    //     "paypal_sdk_version": "2.16.0",
    //     "platform": "iOS"
    //   },
    //   "response_type": "payment",
    //   "response": {
    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
    //     "state": "approved",
    //     "create_time": "2016-10-03T13:33:33Z",
    //     "intent": "sale"
    //   }
    // }
    PaymentPage.prototype.initPayPal = function () {
        var _this = this;
        this.payPal.init({ PayPalEnvironmentProduction: this.config.paypalProduction, PayPalEnvironmentSandbox: this.config.paypalSandbox }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_7__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].CURRENCY));
                var payment = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_paypal__["c" /* PayPalPayment */](String(_this.couponApplied ? _this.total : _this.totalItems), currency.value, 'Description', 'sale');
                _this.payPal.renderSinglePaymentUI(payment).then(function () {
                    _this.paymentSuccess();
                    // Successfully paid
                }, function () {
                    _this.paymentFailure();
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    };
    PaymentPage.prototype.initPayUMoney = function () {
        var _this = this;
        var name = this.user.username;
        var email = this.user.email;
        var bookingId = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(this.orderResponse.id);
        var productinfo = this.orderResponse.order_key;
        var salt = this.config.payuSalt;
        var key = this.config.payuKey;
        var amt = this.couponApplied ? this.total : this.totalItems;
        var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
        var encrypttext = __WEBPACK_IMPORTED_MODULE_9_js_sha512__(string);
        var url = "https://www.todoalmacen.cl/flow/examples/payments/create.php?" + "bokingid=" + bookingId + "&" + "compra=" + productinfo + "&" + "total=" + amt + "&" + "correo=" + email;
        var options = {
            location: 'no',
            clearcache: 'yes',
            zoom: 'no',
            toolbar: 'no',
            closebuttoncaption: 'back'
        };
        var browser = this.iab.create(url, '_blank', options);
        browser.on('loadstart').subscribe(function (event) {
            if (event.url == "https://webpay3gint.transbank.cl/webpayserver/voucher.cgi") {
                _this.paymentSuccess();
                browser.close();
            }
            if (event.url == "https://www.todoalmacen.cl/flow/examples/payments/result.php") {
                _this.paymentFailure();
                browser.close();
            }
        });
        browser.on('exit').subscribe(function (event) {
            if (!_this.paymentDone && !_this.paymentFailAlerted) {
                _this.paymentFailure();
            }
        });
        browser.on('loaderror').subscribe(function (event) {
            _this.showToast('Something went wrong');
        });
    };
    PaymentPage.prototype.paymentFailure = function () {
        var _this = this;
        this.paymentFailAlerted = true;
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.orderResponse.id), new __WEBPACK_IMPORTED_MODULE_6__models_order_update_request_models__["a" /* OrderUpdateRequest */]('cancelled')).subscribe(function (data) {
        }, function (err) {
            console.log(err);
        });
        this.subscriptions.push(subscription);
        var alert = this.alertCtrl.create({
            title: 'Payment failure',
            message: 'Lamentablemente el pago ha fallado, por lo tanto, el pedido ha sido cancelado. El artículo (s) todavía existe en su carrito, puede volver a intentarlo más tarde.',
            buttons: [{
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                        _this.done();
                        console.log('Okay clicked');
                    }
                }]
        });
        alert.present();
    };
    PaymentPage.prototype.paymentSuccess = function () {
        var _this = this;
        this.paymentDone = true;
        this.clearCart();
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.orderResponse.id), { set_paid: true }).subscribe(function (data) {
            _this.done();
        }, function (err) {
            _this.done();
            _this.paymentSuccess();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    PaymentPage.prototype.done = function () {
        if (!this.placedPagePushed) {
            this.placedPagePushed = true;
            this.dismissLoading();
            this.navCtrl.setRoot(this.paymentFailAlerted ? __WEBPACK_IMPORTED_MODULE_11__home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
    };
    PaymentPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PaymentPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PaymentPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    PaymentPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PaymentPage.prototype.clearCart = function () {
        var cartItems = new Array();
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-payment ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\payment\payment.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Pague ahora</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content radio-group class="bg-light">\n\n    <ion-row text-center class="status">\n\n        <ion-col class="complate">\n\n            <ion-icon name="ios-checkmark-circle"></ion-icon>\n\n            <span>Registrarse</span>\n\n        </ion-col>\n\n        <ion-col class="processing">\n\n            <ion-icon name="ios-checkmark-circle"></ion-icon>\n\n            <span>Envío</span>\n\n        </ion-col>\n\n        <ion-col class="panding">\n\n            <ion-icon name="md-radio-button-off"></ion-icon>\n\n            <span>Pago</span>\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-card>\n\n        <p class="heading">MÉTODO DE PAGO</p>\n\n        <ion-card-content>\n\n            <label ion-item *ngFor="let item of paymentGateways">\n\n                <ion-label>{{item.title}}</ion-label>\n\n                <ion-radio value="{{item.title}}" (click)="paymentMethod(item)"></ion-radio>\n\n            </label>\n\n        </ion-card-content>\n\n        <!--\n\n        <ion-card-content>\n\n            <ion-item>\n\n                <ion-label>Credit/Debit Card</ion-label>\n\n                <ion-radio checked="true" value="card"></ion-radio>\n\n            </ion-item>\n\n            <div class="form">\n\n                <ion-list>\n\n                    <ion-item>\n\n                        <ion-label>Card Type</ion-label>\n\n                        <ion-select [(ngModel)]="notifications" interface="action-sheet">\n\n                            <ion-option selected value="visa">Visa Express</ion-option>\n\n                            <ion-option value="debit">Debit Card</ion-option>\n\n                            <ion-option value="master">Master Card</ion-option>\n\n                            <ion-option value="credit">Credit Card </ion-option>\n\n                        </ion-select>\n\n                    </ion-item>\n\n                    <ion-item>\n\n                        <ion-label>Card Number</ion-label>\n\n                        <ion-input type="text" text-right value="1234-1234-1234-5678"></ion-input>\n\n                    </ion-item>\n\n                    <ion-item>\n\n                        <ion-label>Name on Card</ion-label>\n\n                        <ion-input type="text" text-right value="Jhon Smith"></ion-input>\n\n                    </ion-item>\n\n                    <ion-row>\n\n                        <ion-col col-8 class="">\n\n                            <div class="d-flex mr-5">\n\n                                <ion-item>\n\n                                    <ion-label>Expiry Date</ion-label>\n\n                                    <ion-input type="text" text-right value="11/20"></ion-input>\n\n                                </ion-item>\n\n                                <ion-icon name="md-calendar" class="text-light calendar-icon"></ion-icon>\n\n                            </div>\n\n                        </ion-col>\n\n                        <ion-col col-4>\n\n                            <ion-item>\n\n                                <ion-label>cvv</ion-label>\n\n                                <ion-input type="text" text-right value="244"></ion-input>\n\n                            </ion-item>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <ion-item>\n\n                        <ion-label text-right>Save my card details</ion-label>\n\n                        <ion-toggle color="secondary" checked="true"></ion-toggle>\n\n                    </ion-item>\n\n                </ion-list>\n\n            </div>\n\n        </ion-card-content>\n\n		-->\n\n    </ion-card>\n\n    <div class="spacebar"></div>\n\n    <div class="btn-padding btn-fisx-bottom">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="placedPage()">Continuar\n\n        </button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\payment\payment.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_10__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_paypal__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlacedPage = (function () {
    function PlacedPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PlacedPage.prototype.ordersPage = function () {
        this.homePage();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    PlacedPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    PlacedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-placed ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\placed\placed.html"*/'<ion-header>\n\n    <ion-navbar>\n\n		<ion-title><p text-center style="width:100%">Orden colocada!</p></ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="img-box">\n\n        <img src="assets/imgs/order-placed.jpg">\n\n    </div>\n\n    <h3 class="text-sky" text-center>Su pedido se ha realizado !!</h3>\n\n    <h4 class="" text-center>Su pedido se hizo con éxito.<br>porfavor visita <strong (click)="ordersPage()">"Mi Orden"</strong> para revisar<br>El progreso y espere ser contactado por correo para más detalles.</h4>\n\n    <div class="btn-padding btn-fisx-bottom ">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="homePage()">SEGUIR COMPRANDO</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\placed\placed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], PlacedPage);
    return PlacedPage;
}());

//# sourceMappingURL=placed.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderUpdateRequest; });
var OrderUpdateRequest = (function () {
    function OrderUpdateRequest(status) {
        this.status = status;
    }
    return OrderUpdateRequest;
}());

//# sourceMappingURL=order-update-request.models.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CodePage = (function () {
    function CodePage(service, loadingCtrl, toastCtrl, navParams, viewCtrl) {
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cCode = "";
        this.loadingShown = false;
        this.subscriptions = [];
    }
    CodePage.prototype.checkCode = function () {
        var _this = this;
        if (!this.cCode.length) {
            this.showToast('Enter valid coupon code.');
        }
        else {
            this.presentLoading('just a moment');
            var subscription = this.service.getCouponByCode(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.cCode).subscribe(function (data) {
                _this.dismissLoading();
                var coupons = data;
                if (!coupons.length) {
                    _this.showToast('Invalid coupon code');
                }
                else {
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON, JSON.stringify(coupons[0]));
                    _this.dismiss();
                }
            }, function (err) {
                _this.dismissLoading();
                _this.showToast('Invalid coupon code');
            });
            this.subscriptions.push(subscription);
        }
    };
    CodePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CodePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CodePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CodePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-code ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\code\code.html"*/'<ion-content class="bg-light">\n\n    <div class="code">\n\n        <h2>Añadir código de promoción</h2>\n\n        <ion-input type="text" value="" [(ngModel)]="cCode" placeholder="Enter promo code here"></ion-input>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="checkCode()">Enviar</button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\code\code.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], CodePage);
    return CodePage;
}());

//# sourceMappingURL=code.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShortPage = (function () {
    function ShortPage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
    }
    ShortPage.prototype.sort = function (si) {
        this.dismiss();
    };
    ShortPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ShortPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-short',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\short\short.html"*/'<ion-content (click)="dismiss()">\n\n    <div class="group">\n\n        <ion-list radio-group>\n\n            <ion-list-header class="d-flex">\n\n                SORT BY\n\n                <ion-icon name="ios-arrow-down"></ion-icon>\n\n            </ion-list-header>\n\n            <!-- <ion-item>\n\n                <ion-label>Popularity</ion-label>\n\n                <ion-radio checked="true" value="popularity"></ion-radio>\n\n            </ion-item> -->\n\n            <ion-item (click)="sort(0)">\n\n                <ion-label>Newest First</ion-label>\n\n                <ion-radio checked="true" value="newest"></ion-radio>\n\n            </ion-item>\n\n            <ion-item (click)="sort(1)">\n\n                <ion-label>Price - High to Low</ion-label>\n\n                <ion-radio value="price_h_l"></ion-radio>\n\n            </ion-item>\n\n            <ion-item (click)="sort(2)">\n\n                <ion-label>Price - Low to High</ion-label>\n\n                <ion-radio value="price_l_h"></ion-radio>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\short\short.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], ShortPage);
    return ShortPage;
}());

//# sourceMappingURL=short.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterPage = (function () {
    function FilterPage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
    }
    FilterPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-filter ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\filter\filter.html"*/'<ion-content>\n\n    <div class="group">\n\n        <div class="size-filter">\n\n            <div class="slid-container">\n\n                <span>2XS</span>\n\n                <span>XS</span>\n\n                <span class="active">S</span>\n\n                <span>M</span>\n\n                <span class="active">L</span>\n\n                <span>XL</span>\n\n                <span>XX</span>\n\n                <span>XXX</span>\n\n            </div>\n\n        </div>\n\n        <div class="type-filter">\n\n            <div class="slid-container">\n\n                <span>Brand</span>\n\n                <span class="active">Size</span>\n\n                <span>Color</span>\n\n                <span>Wear</span>\n\n                <span>Outfit</span>\n\n            </div>\n\n        </div>\n\n        <ion-row text-center class="    action">\n\n            <ion-col col-5>\n\n                <p>Reset</p>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <p>\n\n                    <ion-icon name="ios-close-outline" (click)="dismiss()"></ion-icon>\n\n                </p>\n\n            </ion-col>\n\n            <ion-col col-5>\n\n                <p class="active">Apply</p>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\filter\filter.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], FilterPage);
    return FilterPage;
}());

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_accountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__addressselect_addressselect__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__address_address__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var My_accountPage = (function () {
    function My_accountPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.account = "profile";
        this.addressChangeText = 'Change';
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY));
    }
    My_accountPage.prototype.ionViewDidEnter = function () {
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        this.addressChangeText = this.selectedAddress == null ? 'Add' : 'Change';
    };
    My_accountPage.prototype.addressPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__addressselect_addressselect__["a" /* AddressSelectPage */], { action: 'choose' });
    };
    My_accountPage.prototype.address = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__address_address__["a" /* AddressPage */]);
    };
    My_accountPage.prototype.isReadonly = function () {
        return true;
    };
    My_accountPage.prototype.addressNew = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__address_address__["a" /* AddressPage */]);
    };
    My_accountPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    My_accountPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    My_accountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my_account ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\my_account\my_account.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Cuenta\n\n            <span float-right> \n\n                 <ion-icon class="icon" (click)="searchPage()"><img src="assets/imgs/ic_search.png" width="100%;"></ion-icon>\n\n              <ion-icon class="icon" (click)="cartPage()"><img src="assets/imgs/ic_my_cart.png" width="100%;"></ion-icon>              \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <!--\n\n<ion-list padding-left>\n\n    <ion-item padding-left padding-right>\n\n        <h2 class="">{{user.username}}\n\n            <small class=""> Edit profile</small>\n\n        </h2>\n\n        <p class="text-dark">{{user.email}}\n\n        </p>\n\n    </ion-item>\n\n</ion-list>\n\n-->\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="account">\n\n            <ion-segment-button value="profile">\n\n                Pefil\n\n            </ion-segment-button>\n\n            <!--\n\n            <ion-segment-button value="card">\n\n                My Cards\n\n            </ion-segment-button>\n\n			-->\n\n            <ion-segment-button value="address">\n\n                Mi Dirección\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div [ngSwitch]="account">\n\n        <div *ngSwitchCase="\'profile\'" class="profile-section">\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-label floating>Usuario</ion-label>\n\n                    <ion-input type="text" [readonly]="isReadonly()" [(ngModel)]="user.username"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label floating>Email</ion-label>\n\n                    <ion-input type="text" [readonly]="isReadonly()" [(ngModel)]="user.email"></ion-input>\n\n                </ion-item>\n\n                <ion-item *ngIf="selectedAddress">\n\n                    <ion-label floating>Telefono</ion-label>\n\n                    <ion-input type="text" [readonly]="isReadonly()" [(ngModel)]="selectedAddress.phone"></ion-input>\n\n                </ion-item>\n\n            </ion-list>\n\n            <div class="btn-fisx-bottom">\n\n                <button ion-button full class="bg-white btn-round text-sky btn-text">Actualizar</button>\n\n            </div>\n\n        </div>\n\n\n\n        <!--\n\n        <div *ngSwitchCase="\'card\'" class="card-section bg-light">\n\n            <ion-card>\n\n                <ion-card-content>\n\n                    <div class="card-row">XXXX XXXX XXXX 5887<img src="assets/imgs/visa.png"></div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-card-content>\n\n                    <div class="card-row">XXXX XXXX XXXX 5887<img src="assets/imgs/master-card.png"></div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n            <ion-card>\n\n                <div class="form" padding-left padding-right>\n\n                    <p padding-bottom margin-bottom>\n\n                        <ion-icon name="ios-add-circle-outline"></ion-icon>ADD NEW CARD <span>Save</span></p>\n\n                    <ion-list>\n\n                        <ion-item>\n\n                            <ion-label>Card Type</ion-label>\n\n                            <ion-input type="text" text-right value="Visa Express"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Card Number</ion-label>\n\n                            <ion-input type="text" text-right value="1234-1234-1234-1234"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Name on Card</ion-label>\n\n                            <ion-input type="text" text-right value="Jhon Smith"></ion-input>\n\n                        </ion-item>\n\n                        <div class="date-cvc-row">\n\n                            <div class="date">\n\n                                <ion-item>\n\n                                    <ion-label>Expiry Date</ion-label>\n\n                                    <ion-input type="text" text-right value="10/23"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                            <div class="cvc">\n\n                                <ion-item>\n\n                                    <ion-label>CVV</ion-label>\n\n                                    <ion-input type="text" text-right value="234"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                        </div>\n\n                        <ion-item class="border-none">\n\n                            <ion-label text-right> Save my card details</ion-label>\n\n                            <ion-toggle checked="false"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </div>\n\n            </ion-card>\n\n        </div>\n\n-->\n\n\n\n        <div *ngSwitchCase="\'address\'" class="address-section bg-light">\n\n            <ion-card>\n\n                <p class="text-sky d-flex" (click)="addressPage()" float-right style="margin: 1rem;"><span>{{addressChangeText}}\n\n                            &nbsp;&nbsp;<ion-icon name="ios-arrow-forward" class="icon"></ion-icon></span>\n\n                </p>\n\n                <ion-card-content *ngIf="!selectedAddress">\n\n                    <div class="addres-detail">\n\n                        <h3>\n\n                            <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>No hay direccion seleccionada\n\n                        </h3>\n\n                        <p>Añadir dirección para continuar.</p>\n\n                    </div>\n\n                </ion-card-content>\n\n                <ion-card-content *ngIf="selectedAddress">\n\n                    <div class="addres-detail">\n\n                        <h3>\n\n                            <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{selectedAddress.first_name}}\n\n                        </h3>\n\n                        <p>{{selectedAddress.address_1}}<br> {{selectedAddress.city}}</p>\n\n                        <p>{{selectedAddress.phone}}</p>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n\n\n            <ion-card>\n\n                <ion-card-content>\n\n                    <div class="new-addres" (click)="address()">\n\n                        <h3>\n\n                            <ion-icon ios="ios-add-circle-outline" md="ios-add-circle-outline"></ion-icon>Añadir nueva dirección\n\n                        </h3>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n            <!--\n\n            <ion-card>\n\n                <div class="form" padding-left padding-right>\n\n                    <p padding-bottom margin-bottom>\n\n                        <ion-icon name="ios-add-circle-outline"></ion-icon>ADD NEW CARD <span>Save</span></p>\n\n                    <ion-list>\n\n                        <ion-item>\n\n                            <ion-label>Pincode</ion-label>\n\n                            <ion-input type="text" text-right value="110092"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Address</ion-label>\n\n                            <ion-input type="text" text-right value="DE234 Mapleridge Drive Plano"></ion-input>\n\n                        </ion-item>\n\n                        <ion-item>\n\n                            <ion-label>Phone Number</ion-label>\n\n                            <ion-input type="text" text-right value="+91 908 765 4321"></ion-input>\n\n                        </ion-item>\n\n                        <div class="date-cvc-row">\n\n                            <div class="city">\n\n                                <ion-item>\n\n                                    <ion-label>City</ion-label>\n\n                                    <ion-input type="text" text-right value="Delhi"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                            <div class="State">\n\n                                <ion-item>\n\n                                    <ion-label>State</ion-label>\n\n                                    <ion-input type="text" text-right value="Delhi"></ion-input>\n\n                                </ion-item>\n\n                            </div>\n\n                        </div>\n\n                        <ion-item class="border-none">\n\n                            <ion-label text-right>Make this my default address</ion-label>\n\n                            <ion-toggle checked="true"></ion-toggle>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </div>\n\n            </ion-card>\n\n			-->\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\my_account\my_account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], My_accountPage);
    return My_accountPage;
}());

//# sourceMappingURL=my_account.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wishlist_wishlist__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HelpPage = (function () {
    function HelpPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    HelpPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    HelpPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HelpPage.prototype.wishlistPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__wishlist_wishlist__["a" /* WishlistPage */]);
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\help\help.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Help Center\n\n            <span float-right>\n\n                  <ion-icon class="icon" (click)="wishlistPage()"><img src="assets/imgs/ic_my_wishlist.png" width="100%;"></ion-icon>\n\n              <ion-icon class="icon" (click)="cartPage()"><img src="assets/imgs/ic_my_cart.png" width="100%;"></ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <!-- <ion-searchbar (ionInput)="getItems($event)" (click)="searchPage()"></ion-searchbar> -->\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <h6 padding-left>FAQ</h6>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Order tracking and Delivery\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Refund\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Cancellation of orders\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Seller Support\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            Payments\n\n            <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content class="text-light">\n\n            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\help\help.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReviewPage = (function () {
    function ReviewPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\review\review.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Agregar una opinión</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-card>\n\n        <ion-card-header style="padding-bottom: 0;">\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n\n\n        <ion-card-content>\n\n            <div class="form">\n\n                <ion-list>\n\n                    <ion-item class="write-reveiw">\n\n                        <ion-textarea type="text" placeholder="Escribe tu reseña"></ion-textarea>\n\n                    </ion-item>\n\n                    <ion-item>\n\n                        <ion-input type="text" placeholder="Heading four your review"></ion-input>\n\n                    </ion-item>\n\n                </ion-list>\n\n            </div>\n\n            <button ion-button full class="bg-green btn-round btn-text">ENVIAR</button>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <h5>Previous orders</h5>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/bag.jpg">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Skybags Leo 26 ltrs Red Casual Backpack</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n    </ion-card>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/wach.jpg">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Skmei Analog-Digital Multicolor Dil Men\'s Watch</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\review\review.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MySplashPage = (function () {
    function MySplashPage(events, navCtrl) {
        var _this = this;
        this.events = events;
        this.navCtrl = navCtrl;
        var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES));
        if (categories) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }
        else {
            events.subscribe('category:setup', function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            });
        }
    }
    MySplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mysplash',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\mysplash\mysplash.html"*/'<ion-content>\n\n    <img src="assets/imgs/splash.png">\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\mysplash\mysplash.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], MySplashPage);
    return MySplashPage;
}());

//# sourceMappingURL=mysplash.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(257);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_phonenumber_phonenumber__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_password_password__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_verification_verification__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_createaccount_createaccount__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_category_category__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_shirts_shirts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_itemdetail_itemdetail__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_shippining_shippining__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_payment_payment__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_placed_placed__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_wishlist_wishlist__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_my_account_my_account__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_myorder_1_myorder_1__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_myorder_2_myorder_2__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_help_help__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_code_code__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_review_review__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_short_short__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_addressselect_addressselect__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_filter_filter__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_address_address__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_paypal__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_social_sharing__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_in_app_browser__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_mysplash_mysplash__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_onesignal__ = __webpack_require__(238);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_password_password__["a" /* PasswordPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_verification_verification__["a" /* VerificationPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_createaccount_createaccount__["a" /* CreateaccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_shirts_shirts__["a" /* ShirtsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_code_code__["a" /* CodePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */],
                __WEBPACK_IMPORTED_MODULE_20__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_21__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_short_short__["a" /* ShortPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_filter_filter__["a" /* FilterPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_addressselect_addressselect__["a" /* AddressSelectPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_mysplash_mysplash__["a" /* MySplashPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_password_password__["a" /* PasswordPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_verification_verification__["a" /* VerificationPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_createaccount_createaccount__["a" /* CreateaccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_shirts_shirts__["a" /* ShirtsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_code_code__["a" /* CodePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */],
                __WEBPACK_IMPORTED_MODULE_20__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_21__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_short_short__["a" /* ShortPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_filter_filter__["a" /* FilterPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_addressselect_addressselect__["a" /* AddressSelectPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_mysplash_mysplash__["a" /* MySplashPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_paypal__["a" /* PayPal */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_onesignal__["a" /* OneSignal */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_4__app_config__["b" /* BaseAppConfig */] },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__category_category__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wishlist_wishlist__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__itemdetail_itemdetail__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shirts_shirts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_category_models__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_app_config__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var HomePage = (function () {
    function HomePage(config, modalCtrl, toastCtrl, navCtrl, service, menu, global, loadingCtrl, alertCtrl) {
        this.config = config;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.menu = menu;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.banners = new Array();
        this.categoriesAll = new Array();
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.slides = [
            {
                title: "Under Rs. 699",
                description: "Tops & Tunics",
                smalltext: "fashion wear of the weeks",
                image: "assets/imgs/slider-1.jpg",
            },
            {
                title: "Under Rs. 699",
                description: "Tops & Tunics",
                smalltext: "fashion wear of the weeks",
                image: "assets/imgs/slider-2.jpg",
            },
            {
                title: "Under Rs. 699",
                description: "Tops & Tunics",
                smalltext: "fashion wear of the weeks",
                image: "assets/imgs/slider-3.jpg",
            }
        ];
        this.appTitle = config.appName;
        var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES));
        var cats = new Array();
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var cat = categories_1[_i];
            if (cats.length == 4) {
                break;
            }
            if (Number(cat.parent) == 0) {
                cats.push(cat);
            }
        }
        var more = new __WEBPACK_IMPORTED_MODULE_10__models_category_models__["a" /* Category */]();
        more.name = 'Mas';
        more.id = '-1';
        cats.push(more);
        this.categoriesAll = cats;
        this.loadBanners();
        this.loadProducts();
        this.presentLoading('Cargando productos');
    }
    HomePage.prototype.ionViewWillLeave = function () {
        window.localStorage.setItem('productsAll', JSON.stringify(this.productsAll));
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.menu.enable(true);
        this.productsAll = JSON.parse(window.localStorage.getItem('productsAll'));
        if (!this.productsAll) {
            this.productsAll = new Array();
        }
        else {
            this.dismissLoading();
        }
    };
    HomePage.prototype.loadBanners = function () {
        var _this = this;
        var savedBanners = JSON.parse(window.localStorage.getItem('banners'));
        if (savedBanners && savedBanners.length) {
            this.banners = savedBanners;
        }
        var subscription = this.service.banners(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var banners = data;
            var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES));
            for (var _i = 0, banners_1 = banners; _i < banners_1.length; _i++) {
                var ban = banners_1[_i];
                for (var _a = 0, categories_2 = categories; _a < categories_2.length; _a++) {
                    var cat = categories_2[_a];
                    if (cat.id == ban.category) {
                        ban.catObj = cat;
                        break;
                    }
                }
            }
            _this.banners = banners;
            window.localStorage.setItem('banners', JSON.stringify(_this.banners));
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    HomePage.prototype.loadProducts = function () {
        var _this = this;
        var subscription = this.service.productsAll(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.productsAllPage)).subscribe(function (data) {
            _this.dismissLoading();
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            var productsAll = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    productsAll.push(proSplit);
                    proSplit = new Array();
                }
                pro.favorite = _this.global.isFavorite(pro);
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                productsAll.push(proSplit);
            }
            _this.productsAll = productsAll;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsAll(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    HomePage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    HomePage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    HomePage.prototype.categoryPage = function (cat) {
        if (cat && cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__category_category__["a" /* CategoryPage */]);
        }
    };
    HomePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    HomePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    HomePage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HomePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage.prototype.wishlistPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__wishlist_wishlist__["a" /* WishlistPage */]);
    };
    HomePage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HomePage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\home\home.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle style="display: block !important;">\n\n            <ion-icon class="menu-icon">\n\n                <img src="assets/imgs/ic_menu.png">\n\n            </ion-icon>\n\n        </button>\n\n        <ion-title>\n\n            {{appTitle}}\n\n            <span float-right>\n\n                <ion-icon class="icon" (click)="wishlistPage()">\n\n                    <img src="assets/imgs/ic_my_wishlist.png" width="100%;">\n\n                </ion-icon>\n\n                <ion-icon class="icon" (click)="cartPage()">\n\n                    <img src="assets/imgs/ic_my_cart.png" width="100%;">\n\n                </ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-searchbar (ionInput)="getItems($event)" placeholder="Buscar productos..." (click)="searchPage()"></ion-searchbar>\n\n    <ion-list>\n\n        <ion-item *ngFor="let item of items">\n\n        </ion-item>\n\n    </ion-list>\n\n    <div class="tab-row">\n\n        <ion-row>\n\n            <ion-col *ngFor="let cat of categoriesAll" (click)="categoryPage(cat)">\n\n                <div class="img-box" text-center>\n\n                    <figure>\n\n                        <img *ngIf="cat.image" data-src="{{cat.image.src}}">\n\n                        <img *ngIf="!cat.image" src="assets/imgs/placeholder_cat.png">\n\n                        <img *ngIf="cat.id == -1" src="assets/imgs/more.png">\n\n                    </figure>\n\n                    <small class="text-white">{{cat.name}}</small>\n\n                </div>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-slides pager *ngIf="banners && banners.length">\n\n        <ion-slide *ngFor="let slide of banners">\n\n            <img [src]="slide.img_src" class="slide-image" (click)="categoryPage(slide.catObj)" />\n\n            <!-- <div class="banner-text">\n\n                <p [innerHTML]="slide.description"></p>\n\n                <small [innerHTML]="slide.smalltext"></small>\n\n                <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n\n            </div> -->\n\n        </ion-slide>\n\n    </ion-slides>\n\n\n\n    <p>Ultimas novedades\n\n        <!-- 2<small class="bg-thime btn-round text-white" float-right>View all</small> -->\n\n    </p>\n\n    <ion-list>\n\n        <ion-row *ngFor="let products of productsAll">\n\n            <ion-col *ngFor="let pro of products">\n\n                <ion-card>\n\n                    <ion-card-header>\n\n                        <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img data-src="{{pro.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                        <ion-icon *ngIf="pro.favorite" name="ios-heart" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n\n                        <ion-icon *ngIf="!pro.favorite" name="ios-heart-outline" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n\n                    </ion-card-header>\n\n                    <ion-card-content (click)="itemdetailPage(pro)">\n\n                        <h5>{{pro.name}}</h5>\n\n                        <div class="rateing">\n\n                            <div class="card-btn">\n\n                                <p class="" float-left>\n\n                                    <span class="text-white bg-green small-text">{{pro.average_rating}}\n\n                                        <ion-icon name="md-star"></ion-icon>\n\n                                    </span>\n\n                                    <span class="text-light bold"> ({{pro.rating_count}})</span>\n\n                                </p>\n\n                                <div style="width: 70%;" float-right>\n\n                                    <div *ngIf="pro.type ==\'simple\'" class="price text-sky" [innerHTML]="pro.sale_price_html" style="float: right;">\n\n                                    </div>\n\n                                    <div *ngIf="pro.type ==\'variable\'" class="price text-sky d-flex" [innerHTML]="pro.price_html" style="float: right;">\n\n                                    </div>\n\n                                    <div *ngIf="pro.type ==\'simple\' && pro.regular_price!=pro.sale_price" class="price text-light mr-5" [innerHTML]="pro.regular_price_html"\n\n                                        style="float: right;">\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-list>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_12__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_category_category__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_wishlist_wishlist__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_my_account_my_account__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_myorder_2_myorder_2__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_addressselect_addressselect__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_help_help__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_review_review__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_auth_credential_models__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_config__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_mysplash_mysplash__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_onesignal__ = __webpack_require__(238);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




















var MyApp = (function () {
    function MyApp(config, events, alertCtrl, service, platform, statusBar, splashScreen, oneSignal) {
        var _this = this;
        this.config = config;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.oneSignal = oneSignal;
        this.subscriptions = [];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_18__pages_mysplash_mysplash__["a" /* MySplashPage */];
        this.pageCategory = 1;
        this.categoriesAll = new Array();
        var superAuth = "";
        if (config.apiBase && config.apiBase.startsWith('https') && config.consumerKey && config.consumerKey.length && config.consumerSecret && config.consumerSecret.length) {
            superAuth = ("Basic " + btoa(config.consumerKey + ":" + config.consumerSecret));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].ADMIN_API_KEY, superAuth);
            this.onSuperAuthSetup(superAuth);
        }
        else if (config.apiBase && config.apiBase.startsWith('http:') && config.adminUsername && config.adminUsername.length && config.adminPassword && config.adminPassword.length) {
            var subscription = service.getAuthToken(new __WEBPACK_IMPORTED_MODULE_15__models_auth_credential_models__["a" /* AuthCredential */](config.adminUsername, config.adminPassword)).subscribe(function (data) {
                var authResponse = data;
                superAuth = ("Bearer " + authResponse.token);
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].ADMIN_API_KEY, superAuth);
                _this.onSuperAuthSetup(superAuth);
            }, function (err) {
                console.log('auth setup error');
            });
            this.subscriptions.push(subscription);
        }
        else {
            console.log('auth setup error');
        }
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].USER_KEY));
        this.initializeApp();
        this.handlerNotifications();
        this.listenToLoginEvents();
    }
    MyApp.prototype.onSuperAuthSetup = function (superAuth) {
        console.log('auth setup success: ' + superAuth);
        this.loadCategories();
        this.loadCurrency();
        this.loadPaymentGateways();
        this.loadShippingLines();
    };
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function () {
            _this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].USER_KEY));
        });
    };
    MyApp.prototype.loadCurrency = function () {
        var subscription = this.service.currencies(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var currency = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].CURRENCY, JSON.stringify(currency));
            console.log('currency setup success');
        }, function (err) {
            console.log('currency setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadShippingLines = function () {
        var subscription = this.service.shippingLines(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var shippingLines = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].SHIPPING_LINES, JSON.stringify(shippingLines));
            console.log('shippingLines setup success');
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadPaymentGateways = function () {
        var subscription = this.service.paymentGateways(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var paymentGateway = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].PAYMENT_GATEWAYS, JSON.stringify(paymentGateway));
            console.log('payment-gateway setup success');
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadCategories = function () {
        var _this = this;
        var subscription = this.service.categories(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.pageCategory)).subscribe(function (data) {
            var categories = data;
            if (categories.length == 0) {
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES, JSON.stringify(_this.categoriesAll));
                console.log('categories setup success');
                _this.events.publish('category:setup');
            }
            else {
                _this.categoriesAll = _this.categoriesAll.concat(categories);
                _this.pageCategory++;
                _this.loadCategories();
            }
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.handlerNotifications = function () {
        var _this = this;
        this.oneSignal.startInit('105c6ed7-f553-4ee2-b3d2-7b2de2ac5022', '574100114164');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationOpened()
            .subscribe(function (jsonData) {
            var alert = _this.alertCtrl.create({
                title: jsonData.notification.payload.title,
                subTitle: jsonData.notification.payload.body,
                buttons: ['OK']
            });
            alert.present();
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });
        this.oneSignal.endInit();
    };
    MyApp.prototype.addressPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_addressselect_addressselect__["a" /* AddressSelectPage */]);
    };
    MyApp.prototype.myorder_1Page = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    MyApp.prototype.myorder_2Page = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    MyApp.prototype.my_accountPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_my_account_my_account__["a" /* My_accountPage */]);
    };
    MyApp.prototype.categoryPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_category_category__["a" /* CategoryPage */]);
    };
    MyApp.prototype.homePage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.reviewPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_review_review__["a" /* ReviewPage */]);
    };
    MyApp.prototype.wishlistPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_wishlist_wishlist__["a" /* WishlistPage */]);
    };
    MyApp.prototype.cartPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_cart_cart__["a" /* CartPage */]);
    };
    MyApp.prototype.helpPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_help_help__["a" /* HelpPage */]);
    };
    MyApp.prototype.categoriesPage = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_category_category__["a" /* CategoryPage */]);
    };
    MyApp.prototype.actionNavHeader = function () {
        if (this.user) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_my_account_my_account__["a" /* My_accountPage */]);
        }
        else {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
        }
    };
    MyApp.prototype.phonenumberPage = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_16__models_constants_models__["a" /* Constants */].USER_KEY, null);
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                    }
                }]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-list>\n\n                <ion-item menuClose (click)="actionNavHeader()">\n\n                    <ion-avatar item-start>\n\n                        <img src="assets/imgs/icon.png">\n\n                    </ion-avatar>\n\n                    <h2 *ngIf="user">Hola {{user.username}}\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </h2>\n\n                    <h2 *ngIf="!user">Hola Invitado\n\n                        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                    </h2>\n\n                    <p *ngIf="user">{{user.email}}</p>\n\n                </ion-item>\n\n            </ion-list>\n\n        </ion-toolbar>\n\n        <div *ngIf="user" class="menu-tabs" padding text-center>\n\n            <ion-row>\n\n                <ion-col menuClose (click)="myorder_1Page()">\n\n                    <img src="assets/imgs/my_order.png">\n\n                    <p>Mi orden</p>\n\n                </ion-col>\n\n                <!-- <ion-col col-4 menuClose (click)="my_accountPage()">\n\n                    <img src="assets/imgs/my-card.png">\n\n                    <p>My Card</p>\n\n                </ion-col> -->\n\n                <ion-col menuClose (click)="addressPage()">\n\n                    <img src="assets/imgs/my_location.png">\n\n                    <p>Mi Dirección</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <div class="menu-title">\n\n            <ion-list>\n\n                <button ion-item menuClose (click)="homePage()">\n\n                    <img src="assets/imgs/ic_home.png ">\n\n                        Inicio\n\n                </button>\n\n                <button ion-item menuClose (click)="categoriesPage()">\n\n                    <img src="assets/imgs/ic_categories.png ">\n\n                        Categorias\n\n                </button>\n\n                <!--\n\n                <button ion-item menuClose (click)="myorder_2Page()">\n\n                    <img src="assets/imgs/ic_my_cart.png ">\n\n                        My Cart\n\n                </button>\n\n-->\n\n                <button ion-item menuClose (click)="wishlistPage()">\n\n                    <img src="assets/imgs/ic_my_wishlist.png ">\n\n                        Mis Favoritos\n\n                </button>\n\n                <button *ngIf="user" ion-item menuClose (click)="my_accountPage()">\n\n                    <img src="assets/imgs/ic_my_account.png ">\n\n                        Mi Cuenta\n\n                </button>\n\n                <button ion-item menuClose (click)="helpPage()">\n\n                    <img src="assets/imgs/ic_help.png ">\n\n                        Centro de ayuda\n\n                </button>\n\n                <button *ngIf="user" ion-item menuClose (click)="phonenumberPage()">\n\n                    <img src="assets/imgs/ic_logout.png ">\n\n                        Logout\n\n                </button>\n\n                <!--\n\n                <button ion-item menuClose (click)="reviewPage()">\n\n                    <img src="assets/imgs/ic_more.png ">\n\n                        Add Reviews\n\n                </button>\n\n				-->\n\n            </ion-list>\n\n        </div>\n\n    </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage " #content swipeBackEnabled="false "></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_14__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_17__app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_14__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_19__ionic_native_onesignal__["a" /* OneSignal */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderRequest; });
var OrderRequest = (function () {
    function OrderRequest() {
    }
    return OrderRequest;
}());

//# sourceMappingURL=order-request.models.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = (function () {
    function Address() {
    }
    return Address;
}());

//# sourceMappingURL=address.models.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterRequest; });
var RegisterRequest = (function () {
    function RegisterRequest(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = 'contributor';
    }
    return RegisterRequest;
}());

//# sourceMappingURL=register-request.models.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = (function () {
    function Category() {
    }
    return Category;
}());

//# sourceMappingURL=category.models.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonenumberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__password_password__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PhonenumberPage = (function () {
    function PhonenumberPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PhonenumberPage.prototype.homePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    PhonenumberPage.prototype.passwordPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__password_password__["a" /* PasswordPage */]);
    };
    PhonenumberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-phonenumber ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\phonenumber\phonenumber.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title><img src="assets/imgs/logo-header.png"><span (click)="homePage()">Skip</span></ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <p>Heart</p>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center>Por favor proporcione su número de móvil<br> Iniciar sesión / Registrarse en TODOALMACEN.CL</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Número de teléfono</ion-label>\n\n                <ion-input type="text" text-right value="+91 9876543210"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="passwordPage()">Continuar</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\phonenumber\phonenumber.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], PhonenumberPage);
    return PhonenumberPage;
}());

//# sourceMappingURL=phonenumber.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createaccount_createaccount__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VerificationPage = (function () {
    function VerificationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    VerificationPage.prototype.createaccountPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__createaccount_createaccount__["a" /* CreateaccountPage */]);
    };
    VerificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-verification ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\verification\verification.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Verification Code</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center>Please enter Verification code <br>sent on +91 903 335 6708</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Verification code</ion-label>\n\n                <ion-input type="text" text-right value="______"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="createaccountPage()">Verify</button>\n\n        <p text-center>\n\n            <span float-left class="text-sky">Resend</span>\n\n            <span float-right>1:32 min left</span>\n\n        </p>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\verification\verification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], VerificationPage);
    return VerificationPage;
}());

//# sourceMappingURL=verification.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Myorder_1Page = (function () {
    function Myorder_1Page(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    Myorder_1Page.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    Myorder_1Page.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    Myorder_1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myorder_1 ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\myorder_1\myorder_1.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>Mi Orden\n\n            <span float-right> \n\n               <ion-icon class="icon" (click)="searchPage()"><img src="assets/imgs/ic_search.png" width="100%;"></ion-icon>\n\n              <ion-icon class="icon" (click)="cartPage()"><img src="assets/imgs/ic_my_cart.png" width="100%;"></ion-icon>            \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-card class="border-bottom-none border" style="position: relative;">\n\n        <ion-card-header>\n\n            <p class="left-side">\n\n                <span class="text-light">Ordered ID</span> 2513254112\n\n                <br>\n\n                <span class="text-light">Placed on</span> 17-march-17\n\n            </p>\n\n            <p class="right-side text-sky">\n\n                Cancelar orden\n\n            </p>\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <ion-row>\n\n                <ion-col col-7>\n\n                    <h4>Unique For Men Black Formal Slim Fit Shirt</h4>\n\n                    <small><span class="text-light">Quantity:</span> 1</small>\n\n                    <p>\n\n                        <img src="assets/imgs/rupee-black.png"> 380\n\n                        <small class="text-light">via COD</small>\n\n                    </p>\n\n                    <small><span class="text-light">Tracking Status on</span> 15-March\'17</small>\n\n                    <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,US  <ion-icon name="ios-arrow-down-outline"></ion-icon></button>\n\n                </ion-col>\n\n                <ion-col col-5>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/shirt-2.jpg">\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <div class="order-info border-top-none border">\n\n        <div class="order-container">\n\n            <div class="status active">\n\n                <p padding-left padding-right>Order<br>Placed</p>\n\n                <ion-icon name="md-radio-button-on"></ion-icon>\n\n                <p style="color: #555">12:05pm<br>12 May 17</p>\n\n            </div>\n\n            <div class="status active">\n\n                <p>\n\n                    Dispatched<br>from Bangalore\n\n                </p>\n\n                <ion-icon name="md-radio-button-on"></ion-icon>\n\n                <p style="color: #555">12:05pm<br>12 May 17</p>\n\n            </div>\n\n            <div class="status active">\n\n                <p>\n\n                    Reached Hub <br>New Delhi\n\n                </p>\n\n                <ion-icon name="md-radio-button-on"></ion-icon>\n\n                <p>12:05pm<br>12 May 17</p>\n\n            </div>\n\n            <div class="status">\n\n                <p>\n\n                    Out for<br>Delivery\n\n                </p>\n\n                <ion-icon name="md-radio-button-on"></ion-icon>\n\n                <p style="color: #555">12:05pm<br>12 May 17</p>\n\n            </div>\n\n            <div class="status">\n\n                <p>\n\n                    Item<br>Delivery\n\n                </p>\n\n                <ion-icon name="md-radio-button-on"></ion-icon>\n\n                <p style="color: #555">12:05pm<br>12 May 17</p>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <p class="left-side">\n\n                <span class="text-light">Ordered ID</span> 2513254112\n\n                <br>\n\n                <span class="text-light">Placed on</span> 17-march-17\n\n            </p>\n\n            <p class="right-side text-sky">\n\n                Return Product\n\n            </p>\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <ion-row>\n\n                <ion-col col-7>\n\n                    <h4>Unique For Men Black Formal Slim Fit Shirt</h4>\n\n                    <small><span class="text-light">Quantity:</span> 1</small>\n\n                    <p>\n\n                        <img src="assets/imgs/rupee-black.png"> 880\n\n                        <small class="text-light">via Credit Card</small>\n\n                    </p>\n\n                    <small><span class="text-light">Delivered on </span> 05-May\'17</small>\n\n                    <button ion-button full class="bg-thime btn-round  btn-text">Rate Now<ion-icon name="ios-arrow-forward"></ion-icon></button>\n\n                </ion-col>\n\n                <ion-col col-5>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/bag.jpg">\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\myorder_1\myorder_1.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], Myorder_1Page);
    return Myorder_1Page;
}());

//# sourceMappingURL=myorder_1.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_item_models__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Global = (function () {
    function Global() {
    }
    Global.prototype.decrementCartItem = function (pro) {
        this.checkCartItems();
        var decrement = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            if (this.cartItems[pos].quantity > 1) {
                this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
                decrement = true;
            }
            else {
                this.cartItems.splice(pos, 1);
            }
            window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
        return decrement;
    };
    Global.prototype.incrementCartItem = function (pro) {
        this.checkCartItems();
        var increment = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
            increment = true;
            window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
        return increment;
    };
    Global.prototype.removeCartItem = function (pro) {
        this.checkCartItems();
        var removed = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems.splice(pos, 1);
            window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            removed = true;
        }
        return removed;
    };
    Global.prototype.addCartItem = function (pro) {
        this.checkCartItems();
        var added = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
        }
        else {
            var cartItem = new __WEBPACK_IMPORTED_MODULE_1__models_cart_item_models__["a" /* CartItem */]();
            cartItem.product = pro;
            cartItem.product_id = pro.id;
            cartItem.quantity = 1;
            this.cartItems.push(cartItem);
            added = true;
        }
        console.log(this.cartItems);
        window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        return added;
    };
    Global.prototype.toggleFavorite = function (pro) {
        this.checkFavorites();
        var toggleResult = false;
        var pos = -1;
        for (var i = 0; i < this.favorites.length; i++) {
            if (pro.id == this.favorites[i].id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.favorites.splice(pos, 1);
            window.localStorage.setItem('favoriteProducts', JSON.stringify(this.favorites));
            console.log('saving remove');
            toggleResult = false;
        }
        else {
            this.favorites.push(pro);
            window.localStorage.setItem('favoriteProducts', JSON.stringify(this.favorites));
            console.log('saving save');
            toggleResult = true;
        }
        return toggleResult;
    };
    Global.prototype.removeFavorite = function (pro) {
        this.checkFavorites();
        var removed = false;
        var pos = -1;
        for (var i = 0; i < this.favorites.length; i++) {
            if (pro.id == this.favorites[i].id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.favorites.splice(pos, 1);
            window.localStorage.setItem('favoriteProducts', JSON.stringify(this.favorites));
            removed = true;
        }
        return removed;
    };
    Global.prototype.isFavorite = function (pro) {
        this.checkFavorites();
        var fav = false;
        for (var _i = 0, _a = this.favorites; _i < _a.length; _i++) {
            var product = _a[_i];
            if (pro.id == product.id) {
                fav = true;
                break;
            }
        }
        return fav;
    };
    Global.prototype.addInSearchHistory = function (query) {
        this.checkSearchHistory();
        var index = this.searchHistory.indexOf(query);
        if (index == -1) {
            if (this.searchHistory.length == 5) {
                this.searchHistory.splice(0, 1);
            }
            this.searchHistory.push(query);
            window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
    };
    Global.prototype.clearCart = function () {
        this.cartItems = new Array();
        window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    };
    Global.prototype.clearSearchHistory = function () {
        this.searchHistory = new Array();
        window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    };
    Global.prototype.checkCartItems = function () {
        if (this.cartItems == null) {
            var cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
            if (cartItems != null) {
                this.cartItems = cartItems;
            }
            else {
                this.cartItems = new Array();
            }
        }
    };
    Global.prototype.checkFavorites = function () {
        if (this.favorites == null) {
            var favProducts = JSON.parse(window.localStorage.getItem('favoriteProducts'));
            if (favProducts != null) {
                this.favorites = favProducts;
            }
            else {
                this.favorites = new Array();
            }
        }
    };
    Global.prototype.checkSearchHistory = function () {
        if (this.searchHistory == null) {
            var history_1 = JSON.parse(window.localStorage.getItem('searchHistory'));
            if (history_1 != null) {
                this.searchHistory = history_1;
            }
            else {
                this.searchHistory = new Array();
            }
        }
    };
    Global.prototype.refreshCartItems = function () {
        var cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
        if (cartItems != null) {
            this.cartItems = cartItems;
        }
        else {
            this.cartItems = new Array();
        }
    };
    Global.prototype.getSearchHistory = function () {
        this.checkSearchHistory();
        return this.searchHistory;
    };
    Global.prototype.getFavorites = function () {
        this.checkFavorites();
        return this.favorites;
    };
    Global.prototype.getCartItems = function () {
        this.checkCartItems();
        return this.cartItems;
    };
    Global = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Global);
    return Global;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shippining_shippining__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shirts_shirts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__category_category__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ItemdetailPage = (function () {
    function ItemdetailPage(socialSharing, navCtrl, toastCtrl, modalCtrl, global, navParams, service, loadingCtrl, alertCtrl) {
        this.socialSharing = socialSharing;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.details = false;
        this.productsResponse = new Array();
        this.productVariations = new Array();
        this.product = this.navParams.get('pro');
        if (this.product) {
            this.product.favorite = global.isFavorite(this.product);
            var productsResponse = this.navParams.get('pros');
            for (var _i = 0, productsResponse_1 = productsResponse; _i < productsResponse_1.length; _i++) {
                var pro = productsResponse_1[_i];
                if (pro.id != this.product.id) {
                    pro.favorite = global.isFavorite(pro);
                    this.productsResponse.push(pro);
                }
            }
            if (this.product.images && this.product.images.length) {
                this.imageToDisplay = this.product.images[0].src;
            }
            this.loadReviews();
            if (this.product.type == 'variable') {
                this.loadVariations();
            }
        }
        else {
            this.loadProductById(this.navParams.get('pro_id'));
        }
    }
    ItemdetailPage_1 = ItemdetailPage;
    ItemdetailPage.prototype.loadProductById = function (proId) {
        var _this = this;
        this.presentLoading('loading product');
        var subscription = this.service.productById(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), proId).subscribe(function (data) {
            _this.product = data;
            _this.product.favorite = _this.global.isFavorite(_this.product);
            if (_this.product.images && _this.product.images.length) {
                _this.imageToDisplay = _this.product.images[0].src;
            }
            _this.loadReviews();
            if (_this.product.type == 'variable') {
                _this.loadVariations();
            }
            _this.dismissLoading();
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.loadVariations = function () {
        var _this = this;
        this.presentLoading('loading variations');
        var subscription = this.service.productVariations(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.product.id).subscribe(function (data) {
            var variations = data;
            for (var _i = 0, variations_1 = variations; _i < variations_1.length; _i++) {
                var vari = variations_1[_i];
                var variAttris = '';
                for (var i = 0; i < vari.attributes.length; i++) {
                    var attri = vari.attributes[i].name + ' ' + vari.attributes[i].option + (i < vari.attributes.length - 1 ? ', ' : '');
                    variAttris = variAttris + attri;
                }
                vari.name = _this.product.name + ' - ' + variAttris;
                vari.type = 'variable';
                vari.images = new Array();
                vari.images.push(vari.image);
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!vari.sale_price) {
                    vari.sale_price = vari.regular_price;
                }
                if (_this.currencyIcon) {
                    vari.regular_price_html = _this.currencyIcon + ' ' + vari.regular_price;
                    vari.sale_price_html = _this.currencyIcon + ' ' + vari.sale_price;
                }
                else if (_this.currencyText) {
                    vari.regular_price_html = _this.currencyText + ' ' + vari.regular_price;
                    vari.sale_price_html = _this.currencyText + ' ' + vari.sale_price;
                }
            }
            _this.productVariations = variations;
            _this.dismissLoading();
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.showImage = function (src) {
        this.imageToDisplay = src;
    };
    ItemdetailPage.prototype.loadReviews = function () {
        var _this = this;
        var subscription = this.service.productsReviews(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.product.id).subscribe(function (data) {
            var reviews = data;
            var approved = new Array();
            for (var _i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
                var rev = reviews_1[_i];
                if (rev.verified) {
                    approved.push(rev);
                }
            }
            _this.reviews = approved;
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.viewMoreSimilar = function () {
        var cat = this.product && this.product.categories.length ? this.product.categories[0] : null;
        if (cat && cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__category_category__["a" /* CategoryPage */]);
        }
    };
    ItemdetailPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(ItemdetailPage_1, { pro: pro, pros: this.productsResponse });
    };
    ItemdetailPage.prototype.viewMore = function () {
        this.details = true;
    };
    ItemdetailPage.prototype.viewLess = function () {
        this.details = false;
    };
    ItemdetailPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    ItemdetailPage.prototype.shareProduct = function (pro) {
        this.socialSharing.share('Found this product on Mobimall', pro.name, null, pro.permalink).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ItemdetailPage.prototype.addVariation = function (variation) {
        if (variation.in_stock && variation.purchasable) {
            var added = this.global.addCartItem(variation);
            this.showToast(added ? 'Added in cart' : 'Updated in cart');
        }
        else {
            this.showToast('Item unavailable to buy.');
        }
    };
    ItemdetailPage.prototype.buyVariation = function (variation) {
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__shippining_shippining__["a" /* ShippiningPage */], { pro: variation });
        }
        else {
            this.showToast('Sign in to continue');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
        }
    };
    ItemdetailPage.prototype.addToCart = function () {
        if (this.product.in_stock && this.product.purchasable) {
            var added = this.global.addCartItem(this.product);
            this.showToast(added ? 'Added in cart' : 'Updated in cart');
        }
        else {
            this.showToast('Item unavailable to buy.');
        }
    };
    ItemdetailPage.prototype.buyNow = function () {
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__shippining_shippining__["a" /* ShippiningPage */], { pro: this.product });
        }
        else {
            this.showToast('Sign in to continue');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
        }
    };
    ItemdetailPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ItemdetailPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ItemdetailPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ItemdetailPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ItemdetailPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ItemdetailPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () { _this.global.refreshCartItems(); });
        modal.present();
    };
    ItemdetailPage = ItemdetailPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-itemdetail ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\itemdetail\itemdetail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon class="menu-icon">\n\n                <img src="assets/imgs/ic_menu.png">\n\n            </ion-icon>\n\n        </button>\n\n        <ion-title class="text-white" *ngIf="product">{{product.categories[0].name}}\n\n            <span float-right>\n\n                <ion-icon class="icon" (click)="searchPage()">\n\n                    <img src="assets/imgs/ic_search.png" width="100%;">\n\n                </ion-icon>\n\n                <ion-icon class="icon" (click)="cartPage()">\n\n                    <img src="assets/imgs/ic_my_cart.png" width="100%;">\n\n                </ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<!--<select size & color>-->\n\n<ion-content class="bg-light">\n\n    <div *ngIf="product" class="img-section shadow-bottom" text-center>\n\n        <figure class="img-box">\n\n            <img *ngIf="imageToDisplay" data-src="{{imageToDisplay}}">\n\n            <img *ngIf="!imageToDisplay" src="assets/imgs/item-img.png">\n\n        </figure>\n\n\n\n        <div *ngIf="product.images && product.images.length" class="tab-btn-box">\n\n            <div class="tab-btn">\n\n                <img data-src="{{product.images[0].src}}" (click)="showImage(product.images[0].src)">\n\n            </div>\n\n            <div *ngIf="product.images.length > 1" class="tab-btn">\n\n                <img data-src="{{product.images[1].src}}" (click)="showImage(product.images[1].src)">\n\n            </div>\n\n            <div *ngIf="product.images.length > 2" class="tab-btn">\n\n                <img data-src="{{product.images[2].src}}" (click)="showImage(product.images[2].src)">\n\n            </div>\n\n            <!--\n\n			<div *ngIf="product.images.length > 3" class="tab-btn">\n\n                <img data-src="{{product.images[3].src}}" (click)="showImage(product.images[3].src)">\n\n            </div>\n\n			-->\n\n        </div>\n\n        <div class="d-flex" style="align-items: start;">\n\n            <span>{{product.name}}</span>\n\n            <span class="icon">\n\n                <ion-icon name="share-alt" (click)="shareProduct(product)"></ion-icon>\n\n                <ion-icon *ngIf="product.favorite" name="ios-heart" class="text-light icon" (click)="toggleFavorite(product)"></ion-icon>\n\n                <ion-icon *ngIf="!product.favorite" name="ios-heart-outline" class="text-light icon" (click)="toggleFavorite(product)"></ion-icon>\n\n            </span>\n\n        </div>\n\n        <div class="card-btn">\n\n            <div class="d-flex" style="padding: 1rem">\n\n                <div style="margin-right:  auto;">\n\n                    <small class="text-white bg-green" float-left>{{product.average_rating}}\n\n                        <ion-icon name="md-star"></ion-icon>\n\n                    </small>\n\n                    <span *ngIf="product.rating_count > 0" class="text-sky small-text ">Read all {{product.rating_count}} Review</span>\n\n                </div>\n\n                <div *ngIf="product.type==simple" style="width: 70%;" float-right>\n\n                    <div class="price text-sky" [innerHTML]="product.sale_price_html" style="float: right;">\n\n                        <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                    </div>\n\n                    <div *ngIf="product.regular_price!=product.sale_price" class="price text-light mr-5" [innerHTML]="product.regular_price_html"\n\n                        style="float: right;">\n\n                        <!-- <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{pro.regular_price}} -->\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n    <!--\n\n	<div class="select-section shadow-bottom">\n\n        <ion-row>\n\n            <ion-col col-6>\n\n                <div class="size">\n\n                    <ion-item>\n\n                        <ion-label>Size</ion-label>\n\n                        <ion-select [(ngModel)]="notifications" interface="action-sheet">\n\n                            <ion-option value="enable">Small</ion-option>\n\n                            <ion-option selected value="mute">Medium</ion-option>\n\n                            <ion-option value="mute_week"> large</ion-option>\n\n                        </ion-select>\n\n                    </ion-item>\n\n                </div>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <div class="color">\n\n                    <ion-item>\n\n                        <ion-label>Color</ion-label>\n\n                        <ion-select [(ngModel)]="notifications" interface="action-sheet">\n\n                            <ion-option selected value="enable">Black</ion-option>\n\n                            <ion-option value="mute">White</ion-option>\n\n                            <ion-option value="mute_week">Red</ion-option>\n\n                        </ion-select>\n\n                    </ion-item>\n\n                </div>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n    -->\n\n\n\n    <!-- Variations start -->\n\n    <div *ngIf="productVariations && productVariations.length" class="your-items" padding-top>\n\n        <ion-card-header>\n\n            <p>Variaciones de producto</p>\n\n        </ion-card-header>\n\n        <ion-card-content *ngFor="let item of productVariations">\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div *ngIf="item.images && item.images.length" class="img-box">\n\n                        <img data-src="{{item.images[0].src}}">\n\n                    </div>\n\n                    <div *ngIf="!item.images || !item.images.length" class="img-box">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>{{item.name}}</h4>\n\n                    <div class="rate">\n\n                        <div style="display: flex;" class="price-box">\n\n                            <div class="price text-light" padding-right [innerHTML]="item.regular_price_html">\n\n                            </div>\n\n                            <div class="price text-sky" [innerHTML]="item.sale_price_html">\n\n                            </div>\n\n                        </div>\n\n                        <p text-right class="card-bottom">\n\n                            <button ion-button class="small button btn-round bg-green" text-right (click)="buyVariation(item)">Compra ahora</button>\n\n                        </p>\n\n                    </div>\n\n                    <p class="card-bottom">\n\n                        <button ion-button class="small button btn-round" text-right (click)="addVariation(item)">Añadir al carro</button>\n\n                    </p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n        <!-- <ion-scroll scrollX="true" style="height:205px;white-space: nowrap;">\n\n            <ion-card *ngFor="let pro of productVariations" class="products-item">\n\n                <ion-card-header>\n\n                    <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img data-src="{{pro.images[0].src}}">\n\n                    </div>\n\n                    <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <h5>{{pro.name}}</h5>\n\n                    <div class="rateing">\n\n                        <div class="card-bottom">\n\n                            <p class="" float-left>\n\n                                <span class="text-white bg-green small-text" (click)="addVariation(pro)">Add</span>\n\n                                <span class="text-white bg-green small-text" (click)="buyVariation(pro)">Buy</span>\n\n                            </p>\n\n                            <div class="d-flex" float-right>\n\n                                <div class="price text-light mr-5" [innerHTML]="pro.regular_price_html">\n\n                                </div>\n\n                                <div class="price text-sky" [innerHTML]="pro.sale_price_html">\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </ion-scroll> -->\n\n    </div>\n\n    <!-- Variations end -->\n\n\n\n    <!--    <Key features>-->\n\n    <div style="height: 36px;"></div>\n\n    <div *ngIf="product" class="features bg-white shadow-bottom" padding>\n\n        <h6 class="heading">Descripción</h6>\n\n        <div *ngIf="!details" [innerHTML]="product.short_description"></div>\n\n        <div *ngIf="details" [innerHTML]="product.description"></div>\n\n        <span *ngIf="!details" text-right class="text-sky" (click)="viewMore()">Ver más\n\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n        </span>\n\n        <span *ngIf="details" text-right class="text-sky" (click)="viewLess()">Ver menos\n\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n        </span>\n\n    </div>\n\n    <!--  <Key features end>-->\n\n\n\n    <!--\n\n    <div class="pincod bg-white shadow-bottom" padding>\n\n        <h6 class="heading">Check Delivery</h6>\n\n        <ion-row>\n\n            <ion-col col-8>\n\n                <ion-list>\n\n                    <ion-item>\n\n                        <ion-input type="text" placeholder="Username"></ion-input>\n\n                    </ion-item>\n\n                </ion-list>\n\n            </ion-col>\n\n            <ion-col col-4>\n\n                <button ion-button full class="bg-sky btn-round btn-text">Submit</button>\n\n            </ion-col>\n\n        </ion-row>\n\n        <p>\n\n            <span>Cash on Delivery</span>\n\n            <span text-center>Free Sheeping</span>\n\n            <span text-right>Delivery in 3-6 Days</span>\n\n        </p>\n\n    </div>\n\n    -->\n\n\n\n    <div *ngIf="reviews && reviews.length" class="reating-review bg-white" padding>\n\n        <!--\n\n        <div class="reating">\n\n            <div class="rated">\n\n                <ion-badge class="badges bg-green text-white">\n\n                    4.2\n\n                    <ion-icon name="md-star"></ion-icon>\n\n                </ion-badge>\n\n                <p class="text-light">\n\n                    <span text-center>\n\n                        Rated by<br>125 poeple\n\n                    </span>\n\n                </p>\n\n            </div>\n\n\n\n            <div class="reating-box">\n\n                <div class="rating">\n\n                    <div class="text-1">5\n\n                        <ion-icon name="md-star"></ion-icon>\n\n                    </div>\n\n                    <div class="progres-bar rate-5"><span style="width: 90%"></span></div>\n\n                    <div class="text-2">88\n\n                        <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n                    </div>\n\n                </div>\n\n                <div class="rating">\n\n                    <div class="text-1">4\n\n                        <ion-icon name="md-star"></ion-icon>\n\n                    </div>\n\n                    <div class="progres-bar rate-4"><span style="width: 70%"></span></div>\n\n                    <div class="text-2">88\n\n                        <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n                    </div>\n\n                </div>\n\n                <div class="rating">\n\n                    <div class="text-1">3\n\n                        <ion-icon name="md-star"></ion-icon>\n\n                    </div>\n\n                    <div class="progres-bar rate-3"><span style="width: 50%"></span></div>\n\n                    <div class="text-2">88\n\n                        <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n                    </div>\n\n                </div>\n\n                <div class="rating">\n\n                    <div class="text-1">2\n\n                        <ion-icon name="md-star"></ion-icon>\n\n                    </div>\n\n                    <div class="progres-bar rate-2"><span style="width: 35%"></span></div>\n\n                    <div class="text-2">88\n\n                        <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n                    </div>\n\n                </div>\n\n                <div class="rating">\n\n                    <div class="text-1">1\n\n                        <ion-icon name="md-star"></ion-icon>\n\n                    </div>\n\n                    <div class="progres-bar rate-1"><span style="width: 20%"></span></div>\n\n                    <div class="text-2">88\n\n                        <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>\n\n		-->\n\n\n\n        <div class="lick">\n\n            <div *ngFor="let review of reviews">\n\n                <p padding-top>\n\n                    <span class="left-side">\n\n                        <ion-badge class="badges bg-green text-white">{{review.rating}}\n\n                            <ion-icon name="md-star"></ion-icon>\n\n                        </ion-badge>\n\n                        <span class="bold">{{review.name}}</span>\n\n                    </span>\n\n                    <span class="right-side">\n\n                        <span class="text-light">{{review.date_created}}</span>\n\n                    </span>\n\n                </p>\n\n\n\n                <h5 style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">\n\n                    {{review.review}}\n\n                </h5>\n\n            </div>\n\n            <h4 class="text-sky" text-right>\n\n                Read all reviews\n\n                <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n            </h4>\n\n            <div class="btn review">Write your review now</div>\n\n        </div>\n\n    </div>\n\n    <!--    <reating & review end>-->\n\n\n\n    <!--    <similar Products>-->\n\n    <div *ngIf="productsResponse && productsResponse.length" class="products" padding-top>\n\n        <h6 class="heading">Productos similares\n\n            <span text-right class="text-sky" (click)="viewMoreSimilar()">Ver más\n\n                <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n            </span>\n\n        </h6>\n\n        <ion-scroll scrollX="true" style="height:205px;white-space: nowrap;">\n\n            <ion-card *ngFor="let pro of productsResponse" class="products-item">\n\n                <ion-card-header>\n\n                    <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img data-src="{{pro.images[0].src}}">\n\n                    </div>\n\n                    <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                    <ion-icon *ngIf="pro.favorite" name="ios-heart" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n\n                    <ion-icon *ngIf="!pro.favorite" name="ios-heart-outline" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <h5>{{pro.name}}</h5>\n\n                    <div class="rateing">\n\n                        <div class="card-bottom">\n\n                            <p class="" float-left>\n\n                                <span class="text-white bg-green small-text">{{pro.average_rating}}\n\n                                    <ion-icon name="md-star"></ion-icon>\n\n                                </span>\n\n                                <span class="text-light bold"> ({{pro.rating_count}})</span>\n\n                            </p>\n\n                            <div class="d-flex" float-right>\n\n                                <div class="price text-light mr-5" [innerHTML]="pro.regular_price_html">\n\n                                    <!-- <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{pro.regular_price}} -->\n\n                                </div>\n\n                                <div class="price text-sky" [innerHTML]="pro.sale_price_html">\n\n                                    <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </ion-scroll>\n\n    </div>\n\n    <!--    <similar Products end>-->\n\n    <div style="height: 65px;"></div>\n\n    <div *ngIf="product && product.type==\'simple\'" class="receipt btn-fisx-bottom">\n\n        <ion-row>\n\n            <ion-col>\n\n                <button ion-button full class="btn-round green-shadow btn-text" style="background: #fff;color: #4dd711;" (click)="addToCart()">AÑADIR AL CARRO</button>\n\n            </ion-col>\n\n            <ion-col>\n\n                <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="buyNow()">COMPRAR AHORA</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n\n\n    <!--    <reating & review end>-->\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\itemdetail\itemdetail.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ItemdetailPage);
    return ItemdetailPage;
    var ItemdetailPage_1;
}());

//# sourceMappingURL=itemdetail.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BaseAppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]("app.config");
var BaseAppConfig = {
    appName: "TODOALMACEN.CL",
    apiBase: "http://todoalmacen.cl/wp-json/",
    perPage: "5",
    consumerKey: "ck_32fc047d4c021e74c4837256f495c537dfebd125",
    consumerSecret: "cs_9ec141e33d6dd66fc6c8511c0928157524e8d3cc",
    adminUsername: "admin",
    adminPassword: "qwertyuiop",
    paypalSandbox: "",
    APIURL: "https://flow.tuxpan.com/api",
    APIKEY: "1F1B8561-E21E-4DC8-AB2B-23LE2FC1DF14",
    SECRETKEY: "42b4e3846b0cf08c2e89406db3bfe72ad1e6787a",
    paypalProduction: "https://www.flow.cl/api",
    payuSalt: "5C486FFD-CBD9-4406-B99C-1L2D94617D82",
    payuKey: "d9e1f4069d3d8a40fc92e03663848d3721893b35"
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__password_password__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createaccount_createaccount__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_auth_credential_models__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(events, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.authError = "";
        this.subscriptions = [];
        this.credentials = new __WEBPACK_IMPORTED_MODULE_6__models_auth_credential_models__["a" /* AuthCredential */]('', '');
        if (this.userLoggedIn()) {
            navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
    }
    LoginPage.prototype.userLoggedIn = function () {
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        return user != null;
    };
    LoginPage.prototype.singIn = function () {
        var _this = this;
        this.authError = "";
        if (this.credentials.username.length == 0 || this.credentials.password.length == 0) {
            this.showToast('Username or Password cannot be empty!');
        }
        else {
            this.presentLoading('Iniciando Sesión');
            var subscription = this.service.getAuthToken(this.credentials).subscribe(function (data) {
                var authResponse = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
                _this.getUser(_this.getUserIdFromToken(authResponse.token));
            }, function (err) {
                _this.authError = err.error.message;
                console.log(_this.authError);
                var pos = _this.authError.indexOf('<a');
                if (pos != -1) {
                    _this.authError = _this.authError.substr(0, pos) + '<a target="_blank" ' + _this.authError.substr(pos + 2, _this.authError.length - 1);
                }
                console.log(_this.authError);
                _this.dismissLoading();
                //this.presentErrorAlert("Unable to login with provided credentials");
            });
            this.subscriptions.push(subscription);
        }
    };
    LoginPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            if (userResponse.billing) {
                userResponse.billing.id = -100;
                var addresses = new Array();
                addresses.push(userResponse.billing);
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(userResponse.billing));
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST, JSON.stringify(addresses));
            }
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login');
        }, function (err) {
            _this.dismissLoading();
            _this.presentErrorAlert("No se puede iniciar sesión con las credenciales proporcionadas");
        });
        this.subscriptions.push(subscription);
    };
    LoginPage.prototype.getUserIdFromToken = function (token) {
        var decodedString = window.atob(token.split(".")[1]);
        return JSON.parse(decodedString).data.user.id;
    };
    LoginPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    LoginPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    LoginPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    LoginPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage.prototype.signupPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__createaccount_createaccount__["a" /* CreateaccountPage */]);
    };
    LoginPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.passwordPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__password_password__["a" /* PasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\login\login.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title><img src="assets/imgs/logo-header.png"><span (click)="homePage()">Volver</span></ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form bg-white" padding-left padding-right padding-bottom>\n\n        <p text-center padding-bottom margin-bottom>Iniciar Sesión en TodoAlmacen.cl</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Usuario</ion-label>\n\n                <ion-input type="text" text-right placeholder="Usuario" [(ngModel)]="credentials.username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Contraseña</ion-label>\n\n                <ion-input type="password" text-right placeholder="Contraseña" [(ngModel)]="credentials.password"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="singIn()">Ingresar</button>\n\n        <br>\n\n        <p text-center [innerHTML]="authError"></p>\n\n        <p text-center (click)="passwordPage()">\n\n            Recuperar contraseña?\n\n        </p>\n\n    </div>\n\n    <div class="btn-fisx-bottom">\n\n        <p text-center>No estas registrado?</p>\n\n        <button ion-button full class="bg-white btn-round text-sky btn-text" (click)="signupPage()">Registrate</button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\login\login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WishlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WishlistPage = (function () {
    function WishlistPage(navCtrl, modalCtrl, global) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.productsAll = new Array();
        this.favorites = new Array();
        this.favorites = global.getFavorites();
        var proSplit = new Array();
        var productsAll = new Array();
        for (var _i = 0, _a = this.favorites; _i < _a.length; _i++) {
            var pro = _a[_i];
            if (proSplit.length == 2) {
                productsAll.push(proSplit);
                proSplit = new Array();
            }
            pro.favorite = true;
            proSplit.push(pro);
        }
        if (proSplit.length > 0) {
            productsAll.push(proSplit);
        }
        this.productsAll = productsAll;
    }
    WishlistPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    WishlistPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.favorites });
    };
    WishlistPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    WishlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wishlist ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\wishlist\wishlist.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon class="menu-icon">\n\n                <img src="assets/imgs/ic_menu.png">\n\n            </ion-icon>\n\n        </button>\n\n        <ion-title>Favoritos\n\n            <span float-right>\n\n                <ion-icon class="icon" (click)="cartPage()">\n\n                    <img src="assets/imgs/ic_my_cart.png" width="100%;">\n\n                </ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-card *ngIf="!favorites.length">\n\n        <ion-card-content>\n\n            <h3>No hay productos favoritos añadidos</h3>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-list>\n\n        <ion-row *ngFor="let products of productsAll">\n\n            <ion-col *ngFor="let pro of products">\n\n                <ion-card>\n\n                    <ion-card-header>\n\n                        <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img data-src="{{pro.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                        <ion-icon *ngIf="pro.favorite" name="ios-heart" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n\n                        <ion-icon *ngIf="!pro.favorite" name="ios-heart-outline" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n\n                    </ion-card-header>\n\n                    <ion-card-content (click)="itemdetailPage(pro)">\n\n                        <h5>{{pro.name}}</h5>\n\n                        <div class="rateing">\n\n                            <div class="card-btn">\n\n                                <p class="" float-left>\n\n                                    <span class="text-white bg-green small-text">{{pro.average_rating}}\n\n                                        <ion-icon name="md-star"></ion-icon>\n\n                                    </span>\n\n                                    <span class="text-light bold"> ({{pro.rating_count}})</span>\n\n                                </p>\n\n                                <div style="width: 70%;" float-right>\n\n                                    <div *ngIf="pro.type ==\'simple\'" class="price text-sky" [innerHTML]="pro.sale_price_html" style="float: right;">\n\n                                        <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                    </div>\n\n                                    <div *ngIf="pro.type ==\'variable\'" class="price text-sky d-flex" [innerHTML]="pro.price_html" style="float: right;">\n\n                                        <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                    </div>\n\n                                    <div *ngIf="pro.type ==\'simple\' && pro.regular_price!=pro.sale_price" class="price text-light mr-5" [innerHTML]="pro.regular_price_html"\n\n                                        style="float: right;">\n\n                                        <!-- <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{pro.regular_price}} -->\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-list>\n\n\n\n    <!-- <ion-card *ngFor="let fav of favorites">\n\n        <ion-card-content>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div *ngIf="fav.images && fav.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img data-src="{{fav.images[0].src}}">\n\n                    </div>\n\n                    <div *ngIf="fav.images == null || fav.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>{{fav.name}}\n\n                        <span class="icon text-light">\n\n                            <img src="assets/imgs/delete.png" (click)="removeFavorite(pro)">\n\n                        </span>\n\n                    </h4>\n\n                    <div class="rateing">\n\n                        <p class=text-light>{{fav.categories[0].name}}</p>\n\n                        <div class="card-btn" padding-top>\n\n                            <div class="">\n\n                                <div float-left>\n\n                                    <small class="text-white bg-green" float-left>{{fav.average_rating}}\n\n                                        <ion-icon name="md-star"></ion-icon>\n\n                                    </small>\n\n                                    <span class="text-light small-text">({{fav.rating_count}} reviews)</span>\n\n                                </div>\n\n                                <div style="display: flex;" float-right>\n\n                                    <div class="price text-light mr-5" [innerHTML]="fav.regular_price_html">\n\n    </div>\n\n    <div class="price text-sky" [innerHTML]="fav.sale_price_html">\n\n    </div>\n\n    </div>\n\n    </div>\n\n    </div>\n\n    </div>\n\n    </ion-col>\n\n    </ion-row>\n\n    </ion-card-content>\n\n    </ion-card> -->\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\wishlist\wishlist.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]])
    ], WishlistPage);
    return WishlistPage;
}());

//# sourceMappingURL=wishlist.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shirts_shirts__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CategoryPage = (function () {
    function CategoryPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.categoriesAll = new Array();
        var categoriesAll = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES));
        var parentWithChild;
        for (var _i = 0, categoriesAll_1 = categoriesAll; _i < categoriesAll_1.length; _i++) {
            var catP = categoriesAll_1[_i];
            if (Number(catP.parent) == 0) {
                parentWithChild = new Array();
                parentWithChild.push(catP);
                for (var _a = 0, categoriesAll_2 = categoriesAll; _a < categoriesAll_2.length; _a++) {
                    var catC = categoriesAll_2[_a];
                    if (Number(catP.id) == Number(catC.parent)) {
                        parentWithChild.push(catC);
                    }
                }
                this.categoriesAll.push(parentWithChild);
            }
        }
    }
    CategoryPage.prototype.shirtsPage = function (cat) {
        if (cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
    };
    CategoryPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    CategoryPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\category\category.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png" style="width: 100%"></ion-icon>\n\n    </button>\n\n        <ion-title>Categorías\n\n            <span float-right> \n\n              <ion-icon class="icon" (click)="searchPage()"><img src="assets/imgs/ic_search.png" width="100%;"></ion-icon>\n\n              <ion-icon class="icon" (click)="cartPage()"><img src="assets/imgs/ic_my_cart.png" width="100%;"></ion-icon>     \n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div *ngFor="let cats of categoriesAll" class="man-fashion">\n\n        <ion-row>\n\n            <ion-col col-6>\n\n                <figure><img *ngIf="cats[0].image != null" data-src="{{cats[0].image.src}}">\n\n                    <img *ngIf="cats[0].image == null" src="assets/imgs/man-fashion.png"></figure>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <h6 class="text-white">{{cats[0].name}}</h6>\n\n                <div style="height: 150px;overflow: hidden;overflow-y: auto">\n\n                    <div *ngFor="let cat of cats">\n\n                        <p *ngIf="cat.parent != 0" class="text-white" (click)="shirtsPage(cat)">{{cat.name}}\n\n                            <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                        </p>\n\n                    </div>\n\n                </div>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n\n\n    <!--\n\n\n\n    <div class="girl-fashion">\n\n        <ion-row>\n\n            <ion-col col-6>\n\n                <img src="assets/imgs/girl-fashion.png">\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <h6 class="text-white">WOMEN\'S FASHION</h6>\n\n                <p class="text-white">Western Wear\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n                <p class="text-white">Sarees\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n                <p class="text-white">Kurtis\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n                <p class="text-white">Lingerie\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n\n\n    <div class="kids-fashion">\n\n        <ion-row>\n\n            <ion-col col-6>\n\n                <img src="assets/imgs/kid-fashion.png">\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <h6 class="text-white">KIDS\'S FASHION</h6>\n\n                <p class="text-white">Boy\'s Wear\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n                <p class="text-white">Girl\'s Wear\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n                <p class="text-white">Baby Wear\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n                <p class="text-white">Baby Girl\n\n                    <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                </p>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n	-->\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\category\category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__address_address__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_wordpress_client_service__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddressSelectPage = (function () {
    function AddressSelectPage(navParams, navCtrl, modalCtrl, viewCtrl, toastCtrl, service, loadingCtrl) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.addresses = new Array();
        this.loadingShown = false;
        this.subscriptions = [];
        this.select = (navParams.get('action') != null);
    }
    AddressSelectPage.prototype.ionViewDidEnter = function () {
        var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
        if (addresses != null) {
            this.addresses = addresses;
        }
    };
    AddressSelectPage.prototype.addressNew = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__address_address__["a" /* AddressPage */]);
    };
    AddressSelectPage.prototype.addressEditSelect = function (address) {
        var _this = this;
        if (this.select) {
            for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
                var add = _a[_i];
                if (add.id == -100) {
                    add.id = address.id;
                    break;
                }
            }
            address.id = -100;
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY));
            user.billing = address;
            user.shipping = address;
            user.first_name = address.first_name;
            user.last_name = address.last_name;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(user));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(address));
            this.presentLoading('Just a moment');
            var subscription = this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(user.id), user).subscribe(function (data) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            });
            this.subscriptions.push(subscription);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__address_address__["a" /* AddressPage */], { address: address });
        }
    };
    AddressSelectPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    AddressSelectPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    AddressSelectPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddressSelectPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    AddressSelectPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    AddressSelectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addressselect ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\addressselect\addressselect.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon class="menu-icon">\n\n                <img src="assets/imgs/ic_menu.png">\n\n            </ion-icon>\n\n        </button>\n\n        <ion-title>Añadir nueva dirección\n\n            <span float-right>\n\n                <ion-icon class="icon" (click)="searchPage()">\n\n                    <img src="assets/imgs/ic_search.png" width="100%;">\n\n                </ion-icon>\n\n                <ion-icon class="icon" (click)="cartPage()">\n\n                    <img src="assets/imgs/ic_my_cart.png" width="100%;">\n\n                </ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="bg-light">\n\n    <div class="address-section">\n\n        <p text-center padding-bottom margin-bottom>\n\n            Editar/Seleccionar dirección</p>\n\n        <ion-card>\n\n            <ion-card-content *ngIf="!addresses || !addresses.length">\n\n                <div class="addres-detail">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>No hay dirección para mostrar\n\n                    </h3>\n\n                    <p>Añadir una dirección.</p>\n\n                </div>\n\n            </ion-card-content>\n\n            <ion-card-content *ngIf="addresses && addresses.length">\n\n                <div *ngFor="let address of addresses" class="addres-detail" (click)="addressEditSelect(address)">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{address.first_name}}\n\n                    </h3>\n\n                    <p>{{address.address_1}}, {{address.address_2}}\n\n                        <br> {{address.city}}</p>\n\n                    <p>{{address.phone}}</p>\n\n                </div>\n\n            </ion-card-content>\n\n        </ion-card>\n\n\n\n    </div>\n\n    <ion-card>\n\n        <ion-card-content>\n\n            <div class="new-addres" (click)="addressNew()">\n\n                <h3>\n\n                    <ion-icon ios="ios-add-circle-outline" md="ios-add-circle-outline"></ion-icon>Agregar nueva dirección\n\n                </h3>\n\n            </div>\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\addressselect\addressselect.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], AddressSelectPage);
    return AddressSelectPage;
}());

//# sourceMappingURL=addressselect.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShirtsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__short_short__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filter_filter__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_search__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__itemdetail_itemdetail__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wishlist_wishlist__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_constants_models__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ShirtsPage = (function () {
    function ShirtsPage(navParams, modalCtrl, global, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.category = navParams.get('cat');
        this.loadProducts();
        this.presentLoading('loading products');
    }
    ShirtsPage.prototype.loadProducts = function () {
        var _this = this;
        var subscription = this.service.productsByCategory(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_10__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.category.id, String(this.productsAllPage)).subscribe(function (data) {
            _this.dismissLoading();
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_10__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            _this.productsAll = _this.productsAll;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    ShirtsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsByCategory(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_10__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.category.id, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_10__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    ShirtsPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    ShirtsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ShirtsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ShirtsPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ShirtsPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ShirtsPage.prototype.sortPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__short_short__["a" /* ShortPage */]);
        modal.onDidDismiss(function () { });
        modal.present();
    };
    ShirtsPage.prototype.filterPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__filter_filter__["a" /* FilterPage */]);
        modal.present();
    };
    ShirtsPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ShirtsPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    ShirtsPage.prototype.wishlistPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__wishlist_wishlist__["a" /* WishlistPage */]);
    };
    ShirtsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shirts ',template:/*ion-inline-start:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\shirts\shirts.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <ion-title>{{category.name}}\n\n            <span float-right>\n\n                <ion-icon class="icon" (click)="wishlistPage()">\n\n                    <img src="assets/imgs/ic_my_wishlist.png" width="100%;">\n\n                </ion-icon>\n\n                <ion-icon class="icon" (click)="cartPage()">\n\n                    <img src="assets/imgs/ic_my_cart.png" width="100%;">\n\n                </ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <div class="d-flex icon-box">\n\n        <ion-searchbar (ionInput)="getItems($event)" placeholder="Search" (click)="searchPage()" style="margin-right: 7px;"></ion-searchbar>\n\n        <!-- <ion-icon class="icon" (click)="sortPage()">\n\n            <img src="assets/imgs/ic_short.png" width="100%;">\n\n        </ion-icon>\n\n        <ion-icon class="icon" (click)="filterPage()" style="margin-right: 7px;">\n\n            <img src="assets/imgs/ic_filter.png" width="100%;">\n\n        </ion-icon> -->\n\n    </div>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="bg-light">\n\n    <ion-list>\n\n        <ion-row *ngFor="let products of productsAll">\n\n            <ion-col *ngFor="let pro of products">\n\n                <ion-card>\n\n                    <ion-card-header>\n\n                        <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img data-src="{{pro.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                        <ion-icon name="md-heart" class="text-light icon"></ion-icon>\n\n                    </ion-card-header>\n\n                    <ion-card-content (click)="itemdetailPage(pro)">\n\n                        <h5>{{pro.name}}</h5>\n\n                        <div class="rateing">\n\n                            <div class="card-btn">\n\n                                <p class="" float-left>\n\n                                    <span class="text-white bg-green small-text">{{pro.average_rating}}\n\n                                        <ion-icon name="md-star"></ion-icon>\n\n                                    </span>\n\n                                    <span class="text-light bold"> ({{pro.rating_count}})</span>\n\n                                </p>\n\n                                <div style="width: 70%;" float-right>\n\n                                    <div *ngIf="pro.type ==\'simple\'" class="price text-sky" [innerHTML]="pro.sale_price_html" style="float: right;">\n\n                                        <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                    </div>\n\n                                    <div *ngIf="pro.type ==\'variable\'" class="price text-sky" [innerHTML]="pro.price_html" style="float: right;">\n\n                                        <!-- <img src="assets/imgs/rupee-sky.png" class="rupee-icon">{{pro.sale_price}} -->\n\n                                    </div>\n\n                                    <div *ngIf="pro.type ==\'simple\' && pro.regular_price!=pro.sale_price" class="price text-light mr-5" [innerHTML]="pro.regular_price_html"\n\n                                        style="float: right;">\n\n                                        <!-- <img src="assets/imgs/rupee-light.png" class="rupee-icon">{{pro.regular_price}} -->\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-list>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Jonathan\Desktop\Repo\TodoAlmacen-App\src\pages\shirts\shirts.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ShirtsPage);
    return ShirtsPage;
}());

//# sourceMappingURL=shirts.js.map

/***/ })

},[239]);
//# sourceMappingURL=main.js.map