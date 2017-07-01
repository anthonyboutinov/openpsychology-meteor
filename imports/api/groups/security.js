import { Groups } from './collection.js';

// admin permission
//
//
Groups.permit('update').ifHasRole({role:'admin', group: Roles.GLOBAL_GROUP}).allowInClientCode();
// TODO: in the future, allow only to super-admins to update, and for users to insert (for money)
