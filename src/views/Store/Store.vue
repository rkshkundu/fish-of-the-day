<template>
    <div class="fish-store-wrapper">
        <section class="fish-store-menu">
            <header>
                <h1 class="fish-store-menu-heading">Fish <span>of the</span> Day</h1>
                <h2 class="fish-store-menu-subheading">
                    <span class="icon-fish left"></span> A fresh seafood market <span class="icon-fish right"></span> 
                </h2>
            </header>    
            <Fishorder :fishList="inventory" @increaseQuantity="increaseQuantity" @decreaseQuantity="decreaseQuantity" @addOrder="addOrder"/>
        </section>
        <section class="fish-store-cart">
            <header>
                <h2 class="fish-store-cart-heading">
                    <span class="icon-cart fish"></span>Cart<span class="icon-cart cart"></span>
                </h2>
            </header>
            <CartList :cart="cartList"/>
        </section>
        <section class="fish-store-inventory">
            <header>
                <button type="button" class="inventory-btn left" @click="foldView">Fold</button>
                <button type="button" class="inventory-btn right" @click="logOut">Logout</button>
                <h2 class="fish-store-inventory-heading">Inventory</h2>
            </header>
            <div class="fish-store-action">
                <button type="button" class="inventory-btn left" @click="loadSampleFish" :disabled="loadSampleDisabled">Load Sample Fishes</button>
                <button type="button" class="inventory-btn right" @click="addFish">Add Fish</button>
            </div>    
            <InventoryList :inventoryList="inventory" @removeFish="removeFish" @inventoryPropertyChange="inventoryPropertyChange" />    
        </section>    
    </div>    
</template>
<script>
import services from '../../services.js';
import Fishorder from '../../components/FishOrder/FishOrder.vue';
import InventoryList from '../../components/InventoryList/InventoryList.vue';
import CartList from '../../components/CartList/CartList.vue';

export default {
    name: 'Store',
    components: {
        Fishorder,
        InventoryList,
        CartList
    },
    data() {
        return {
            inventory: [],
            cartList: [],
            loadSampleDisabled: false
        }
    },
    methods: {
        /**
        * @function
        * @description toggle the classes to fold/infold the screen
        * @param {Object} e 
        */
        foldView(e) {
            var app = document.getElementsByClassName('fish-store-wrapper')[0];
            app.classList.toggle("folded");
            var currentText = e.target.innerText;
            e.target.innerText = currentText.toLowerCase() === 'fold' ? 'Unfold' : 'Fold'; 
            if(currentText.toLowerCase() === 'fold') {
                app.classList.add("bordered");
            }else {
                setTimeout(function() {app.classList.remove("bordered");},250);
            }
        },
        /**
        * @function
        * @description call service api to get the sample fish data
        */
        loadSampleFish() {
            var vm = this;

            vm.$toasted.clear();
            vm.$toasted.info('loading fishes...').goAway(2000);
            
            services.getInventoryItems()
            .then(function(data) {
                vm.inventory = vm.inventory.length ? vm.inventory.concat( data.inventory || [] ) : ( data.inventory || [] );
                vm.cartList = data.cart || [];
                vm.loadSampleDisabled = true;
                setTimeout(function() {vm.$toasted.clear();},1500);
            });
        },
        /**
        * @function
        * @description increase the order quantity
        * @param {Number} i 
        */
        increaseQuantity(i) {
            this.$toasted.clear();
            this.$toasted.info('Order quantity increased.').goAway(2000);
            this.$set(this.inventory[i], 'order_quantity', ( this.inventory[i].order_quantity || 0 ) + 1);
        },
        /**
        * @function
        * @description decrease the order quantity
        * @param {Number} i 
        */
        decreaseQuantity(i) {
            this.$toasted.clear();
            this.$toasted.info('Order quantity decreased.').goAway(2000);
            this.$set(this.inventory[i], 'order_quantity', this.inventory[i].order_quantity - 1);
        },
        /**
        * @function
        * @description add new order to cart
        * @param {Number} i 
        */
        addOrder(i) {
            this.$toasted.clear();
            this.$toasted.success('Order added to cart successfully.').goAway(2000);
            var orderedItem = this.inventory[i],
                cartIndex = this.cartList.findIndex(function(cart){ return cart.product_id === orderedItem.product_id});
            if(cartIndex >= 0) {
                var cart = this.cartList[cartIndex];
                cart.product_quantity = ( cart.product_quantity || 0 ) + orderedItem.order_quantity;
                cart.product_price = ( cart.product_price || 0 ) + ( orderedItem.order_quantity * orderedItem.product_price );
            }else {
                this.cartList.push({
                    product_id: orderedItem.product_id,
                    product_name:orderedItem.product_name,
                    product_price: orderedItem.product_price * orderedItem.order_quantity,
                    product_quantity: orderedItem.order_quantity
                });
            }
            this.$set(this.inventory[i], 'order_quantity', 0);
        },
        /**
        * @function
        * @description remove the fish from inventory list
        * @param {Number} i 
        */
        removeFish(i) {
            var fishId = this.inventory[i].product_id,
                cartIndex = this.cartList.findIndex(function(cart) {return cart.product_id === fishId});

            if(cartIndex >= 0) {
                this.cartList.splice(cartIndex, 1);    
            }
            this.inventory.splice(i, 1);
        },
        /**
        * @function
        * @description add new fish to inventory
        */
        addFish() {
            this.inventory = this.inventory || [];
            this.inventory.unshift(
                {
                    "product_id": "",
                    "product_name": "",
                    "product_price": null,
                    "product_status": {
                        "label": "Fresh", 
                        "value": "fresh"
                    },
                    "product_description": "",
                    "product_image": "dummy-image.png"
                }
            );
        },
        /**
        * @function
        * @description update the fish specifications in list and cart as per change in inventory
        * @param {Number} i 
        */
        inventoryPropertyChange(i) {
            var inventory = this.inventory[i],
                fishId = inventory.product_id,
                cartIndex = this.cartList.findIndex(function(cart) {return cart.product_id === fishId});

            if(cartIndex >= 0) {
                this.cartList[cartIndex].product_name = inventory.product_name;
                this.cartList[cartIndex].product_price = inventory.product_price;
            }
        },
        /**
        * @function
        * @description logout the user, clear the storage and move back to login screen
        */
        logOut() {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("storeName");
            this.$router.push({name:'Home'});
        }
    }
}
</script>
<style lang="scss">
    @import "./Store";
</style>