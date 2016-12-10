//
// // Override
//
// Template.afFileUpload.events({
//   'click [data-reset-file]': function (e, template) {
//     e.preventDefault();
//     console.log("RESET",this, e, template);
//     template.fileId.set(false);
//     return false;
//   },
//   'click [data-remove-file]': function (e, template) {
//     e.preventDefault();
//     console.log("REMOVE",this, e, template);
//     template.fileId.set(false);
//     try {
//       this.remove(function(error, result) {
//         console.log(error, result);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     return false;
//   },
//   'change [data-files-collection-upload]': function (e, template) {
//     if (e.currentTarget.files && e.currentTarget.files[0]) {
//       var upload = global[template.collectionName()].insert({
//         file: e.currentTarget.files[0],
//         streams: 'dynamic',
//         chunkSize: 'dynamic'
//       }, false);
//
//       upload.on('start', function () {
//         AutoForm.getValidationContext().resetValidation();
//         template.currentUpload.set(this);
//         return;
//       });
//
//       upload.on('error', function (error) {
//         AutoForm.getValidationContext().resetValidation();
//         AutoForm.getValidationContext().addInvalidKeys([{name: Template.instance().inputName, type: "uploadError", value: error.reason}]);
//         $(e.currentTarget).val('');
//         return;
//       });
//
//       upload.on('end', function (error, fileObj) {
//         if (!error) {
//           if (template) {
//             template.fileId.set(fileObj._id);
//           }
//         }
//         template.currentUpload.set(false);
//         return;
//       });
//
//       upload.start();
//     }
//   }
// });
