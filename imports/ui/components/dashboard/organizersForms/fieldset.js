import './fieldset.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/autoform/fileUpload';
import { Select2 } from '/imports/lib/select2.js';

Template.organizersFormFieldset.onRendered(Select2.onRenderedSetup);
