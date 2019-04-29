export const textUtilitiesMixin = {
  computed: {
    textColorOnTheme() {
      let parent = this.$parent;
      while (parent.isDark == null) {
        parent = parent.$parent;
      }
      return parent.isDark ? "white--text" : "black--text";
    },
  },
};

export const utilityMethodsMixin = {
  methods: {
    clearObjFields(object) {
      this._.forEach(object, (value, key) => {
        object[key] = "";
      });
    },
  },
};
