import './dashboard.html';

import '/imports/ui/components/common/footer.js';
import '/imports/ui/components/dashboard/navbar.js';
import '/imports/ui/components/dashboard/sidenavbar.js';

Template.dashboardLayout.onRendered(function(){
  $('.scrollbar-macos').scrollbar();
});
