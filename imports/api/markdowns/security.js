import { Markdowns } from './index.js';

// admin permission
//
//
Markdowns.permit(['insert', 'update', 'remove']).ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).allowInClientCode();
