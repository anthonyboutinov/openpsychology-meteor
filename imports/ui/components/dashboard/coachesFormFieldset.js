import './coachesFormFieldset.html';

import '/imports/ui/autoform/contemporary/afFormGroup.js';
import '/imports/ui/autoform/datetimeRange.js';
import { Select2 } from '/imports/lib/select2.js';

Template.coachesFormFieldset.onRendered(Select2.onRenderedSetup);
