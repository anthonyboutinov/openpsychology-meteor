Template.navbar_category.helpers({
  isActive: function() {
    return !this.showSearchbar && this.currentCategories && this.currentCategories.count() == 1 && this.category._id == this.currentCategories.fetch()[0]._id ? "active" : false;
  }
});
