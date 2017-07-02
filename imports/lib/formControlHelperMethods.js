function checkIfHasValue(target) {
  if (target.val()) {
    target.parents(".form-group").find("label").addClass("fade");
  } else {
    target.parents(".form-group").find("label").removeClass("fade");
  }
}

export const FormControlHelperMethods = {

  focus(target) {
    target.parents(".form-group").addClass("focused");
  },

  checkIfHasValue,

  blur(target) {
    target.parents(".form-group").removeClass("focused");
    checkIfHasValue(target);
  },



}
