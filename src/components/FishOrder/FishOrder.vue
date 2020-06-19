<template>
    <div>
        <section class="fishorder-wrapper" v-for="( fish, index ) in fishList" :key="fish.product_id" :class="{'sold': fish.product_status.value == 'sold_out'}"  v-show="fish.product_id">
            <div class="fishorder-image">
                <img :src="'/images/'+fish.product_image" alt="Fish order image"/>
            </div>
            <div class="fishorder-details">
                <h2 class="fishorder-details-name">{{fish.product_name}}</h2>
                <p class="fishorder-details-description">
                    {{fish.product_description}}
                </p>
                <div class="fishorder-count">
                    <button type="button" class="fishorder-count-changebtn" @click="decreaseQuantity( index )">
                        <span class="icon-minus"> </span>
                    </button>
                    <span class="fishorder-count-number"> {{fish.order_quantity || 0}} </span>
                    <button type="button" class="fishorder-count-changebtn" @click="increaseQuantity( index )">
                        <span class="icon-plus"> </span>
                    </button>
                    <button type="button" class="fishorder-count-orderbtn" @click="addOrder( index )">Order</button>
                </div>    
            </div>  
            <div class="fishorder-price">
                <span>$ {{fish.product_price || 0}}</span>
            </div>
            <div class="fishorder-soldout"></div>
        </section>              
    </div>    
</template>
<script>
export default {
    name: 'Fishorder',
    props: {
        fishList: {
            type: Array,
            required: true,
            default: function (){
                return [];
            }
        }
    },
    methods: {
        /**
        * @function
        * @description emit the event to increase order quantity
        */
        increaseQuantity(i) {
            this.$emit('increaseQuantity', i);
        },
        /**
        * @function
        * @description emit the event to decrease order quantity
        */
        decreaseQuantity(i) {
            if(this.fishList[i].order_quantity) {
                this.$emit('decreaseQuantity', i);
            }
        },
        /**
        * @function
        * @description emit the event to add order to cart and validate if order value is there or not
        */
        addOrder(i) {
            if(this.fishList[i].order_quantity) {
                this.$emit('addOrder', i);
            }else {
                this.$toasted.clear();
                this.$toasted.error('Please increase order quantity.').goAway(2000);
            }
        }
    }
}
</script>
<style lang="scss">
    @import './FishOrder';
</style>