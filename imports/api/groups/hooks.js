import { Groups } from './collection.js';


Groups.after.update(function (userId, doc, fieldNames, modifier, options) {

  // if update `items` field
  if (_.contains(fieldNames, 'items')) {


    // Automatically remove expired items when adding new items to a list
    //
    //

    // if push new item into `items` array
    if (_.has(modifier, '$push')) {
      const now = new Date();
      // filter items that are expired
      const filtered = _.filter(doc.items, (item)=>{
        return item.expiresAt < now
      });
      if (!filtered.length) {
        return
      }
      // pluck `item` field with itemId
      const itemIdsToRemove = _.pluck(filtered, 'item');
      // set `$pull` modifier
      const modifier = { $pull: { items: { _id: { $in: itemIdsToRemove } } } };
      console.log({'Groups.after.update:: itemIdsToRemove': JSON.stringify(itemIdsToRemove)});
      // remove expired items from group
      Groups.update(doc._id, modifier);
    }
  }
}, {fetchPrevious: false});
