Template.searchbar_category.helpers({
  isActive: function() {
    return this.currentCategory && this.category._id == this.currentCategory._id ? "active" : false;
  }
});
