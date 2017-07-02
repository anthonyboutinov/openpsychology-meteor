import './eventsFormFieldset.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import '/imports/ui/autoform/boolean-radios.js';
import { Select2 } from '/imports/lib/select2.js';

Template.eventsFormFieldset.onRendered(Select2.onRenderedSetup);
