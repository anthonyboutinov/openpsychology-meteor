Template.searchbar_category.helpers({
  isActive: function() {
    return this.currentCategories && this.currentCategories.map((currentValue) => {return currentValue._id}).indexOf(this.category._id) != -1 ? "active" : false;
  }
});
