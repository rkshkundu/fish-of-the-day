<template>
  <div
    class="dropdown"
    @click="toggleRiskLevels"
  >
    <span class="text">{{ selected.label }}</span>
    <span class="angle-down-circle"><i class="angle-down"></i></span>
    <div v-if="isBottomSectionToggled" class="options">
      <div
        v-for="option in configOptions"
        :key="option.value"
        class="option"
        @click="setCurrentSelectedOption(option, index);"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dropdown",
  data() {
    return {
      isBottomSectionToggled: false,
      optionsHeight: 0,
      optionHeight: 29,
      width: 100,
      configOptions: [],
      backgroundColor: "white",
      hoverBackgroundColor: "white",
      borderRadius: 0,
      textColor: "#000"
    };
  },
  components: {},
  props: {
    config: {
      type: Object,
      required: true,
      default: function() {
          return {
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
    selected: {
      type: Object,
      required: true,
      default: function() {
        return {
          label: "Fresh",
          value: "fresh"
        };
      }
    } ,
    index: {
      type: Number,
      required: true,
      default: function() {
        return 0;
      }
    } 
  },
  computed: {},
  methods: {
    /**
    * @function
    * @description toggle options list view
    */
    toggleRiskLevels() {
      this.isBottomSectionToggled = !this.isBottomSectionToggled;
    },
    /**
    * @function
    * @description emit the event to set the selected option value
    * @param {Object} option
    * @param {Number} index 
    */
    setCurrentSelectedOption(option, index) {
      this.$emit("setSelectedOption", option, index);
    },
    /**
    * @function
    * @description set UI and placeholder as per configration
    */
    setConfigData() {
      this.configOptions = this.config.options;
      this.width = this.config.width;
      this.placeholder = this.config.placeholder;
      if (this.config.backgroundColor) {
        this.backgroundColor = this.config.backgroundColor;
      }
      if (this.config.border) {
        this.border = this.config.border;
      }
      if (this.config.hoverBackgroundColor) {
        this.hoverBackgroundColor = this.config.hoverBackgroundColor;
      }
      if (this.config.textColor) {
        this.textColor = this.config.textColor;
      }
      if (this.config.borderRadius) {
        this.borderRadius = this.config.borderRadius;
      }
    },
    /**
    * @function
    * @description set height of options list
    */
    setOptionsHeight() {
      this.optionsHeight = this.optionHeight * this.configOptions.length;
    }
  },
  created() {
    this.setConfigData();
    this.setOptionsHeight();
  }
};
</script>

<style lang="scss" scoped>
    @import "./Dropdown";
</style>