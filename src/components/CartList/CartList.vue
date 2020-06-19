<template>
    <div class="fish-cart">
        <div class="fish-cart-wrapper" v-for="item in cart" :key="item.product_id">
            <div class="fish-cart-title">
                <h2>{{item.product_name}}</h2>
                <span>( {{item.product_quantity}} Pounds )</span>
            </div>
            <div class="fish-cart-price">
                <span> $ {{item.product_price || 0}}</span>
            </div>        
        </div>
        <footer class="fish-cart-total">
            <span class="fish-cart-total-heading">Total</span>
            <span class="fish-cart-total-price">$ {{cartTotalPrice}}</span>
        </footer>        
    </div>
</template>
<script>
export default {
    name: "CartList",
    props: {
        cart: {
            type: Array,
            required: true,
            default: function() {
                return [];
            }
        }
    },
    computed: {
        /**
        * @function
        * @description to get the total sum for cart items
        */
        cartTotalPrice() {
            var total =  this.cart.reduce( function( a, b ){ return parseFloat(a || 0) + parseFloat(b.product_price || 0) }, 0 );
            return total.toFixed(2);
        }
    }
}
</script>
<style lang="scss">
    @import './CartList';
</style>