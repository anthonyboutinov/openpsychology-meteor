import './searchbar_category.html';

Template.searchbar_category.helpers({
  isActive: function() {
    return this.currentCategories && this.currentCategories.map((v)=>{return v._id}).includes(this.category._id) ? "active" : false;
  }
});
