<template>
    <div class="inventory-wrapper">
        <section class="inventory-list" v-for="( inventory, index ) in inventoryList" :key="inventory.product_id">
            <div class="inventory-list-fish-name">
                <span class="inventory-icon fish"></span>
                <input type="text" v-model="inventory.product_name" placeholder="Fish Name" @input="inventoryPropertyChange(index)" />
            </div>
            <div class="inventory-list-fish-price">
                <span class="inventory-icon dollar"></span>
                <input type="text" v-model="inventory.product_price" placeholder="Price" @keypress="onlyNumber" @input="inventoryPropertyChange(index)" />
            </div>
            <div class="inventory-list-fish-stock">
                <Dropdown :config="config" @setSelectedOption="setSelectedOption" :selected="inventory.product_status" :index="index"></Dropdown>
            </div>    
            <div class="inventory-list-fish-description">
                <span class="inventory-icon text"></span>
                <textarea v-model="inventory.product_description" placeholder="Description"></textarea>
            </div>
            <div class="inventory-list-fish-image">
                <span class="inventory-icon image"></span>
                <input type="text" v-model="inventory.product_image" readonly placeholder="Image Path" />
            </div>
            <div class="inventory-list-action">
                <button type="button" class="save" v-show="!inventory.product_id" :disabled="!(inventory.product_name && inventory.product_price && inventory.product_description)" @click="saveNewInventory(index)">Save Fish</button>
                <button type="button" @click="removeFish(index)">Remove Fish</button>
                <span class="inventory-icon fishhoook"></span>
            </div>
        </section>    
    </div>    
</template>
<script>
import Dropdown from "../Dropdown/Dropdown.vue"

export default {
    name: 'InventoryList',
    props: {
        inventoryList: {
            type: Array,
            required: true,
            default: function() {
                return [];
            }
        }
    },
    components: {
        Dropdown
    },
    data() {
        return {
            config: {
                options: [
                    {
                        label: "Fresh",
                        value: "fresh"
                    },
                    {
                        label: "Sold Out",
                        value: "sold_out"
                    }
                ]
            }
        }
    },
    methods: {
        /**
        * @function
        * @description set the selected options value
        * @param {Object} options 
        * @param {Number} i 
        */
        setSelectedOption(options, i) {
            var vm = this;
            
            var status = vm.inventoryList[i].product_status;
            if(status.value != options.value) {
                vm.inventoryList[i].product_status = options;
            }
        },
        /**
        * @function
        * @description emit the event to remove fish from specific index
        * @param {Number} i 
        */
        removeFish(i) {
            this.$emit('removeFish', i);
        },
        /**
        * @function
        * @description emit the event to add new fish in inventory
        * @param {Number} i 
        */
        saveNewInventory(i) {
            this.inventoryList[i].product_id = "fish"+Math.floor(Math.random() * 90 + 10);
        },
        /**
        * @function
        * @description emit the event to change fish specifications as per change in inventory
        * @param {Number} i 
        */
        inventoryPropertyChange(i) {
            this.$emit('inventoryPropertyChange', i);
        },
        /**
        * @function
        * @description allow number only for price field
        * @param {Object} $event 
        */ 
        onlyNumber($event) {
            var keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            
            if (keyCode < 48 || keyCode > 57) { 
                $event.preventDefault();
            }
        }    
    }
}
</script>
<style lang="scss">
    @import './InventoryList';
</style>