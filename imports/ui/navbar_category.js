
Template.navbar_category.helpers({
  isActive: function() {
    return !this.showSearchbar && this.currentCategory && this.category._id == this.currentCategory._id ? "active" : false;
  }
});
