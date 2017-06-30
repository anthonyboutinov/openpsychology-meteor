import { Categories }  from '/imports/api/categories/index.js';
import { Events }      from '/imports/api/events/collection.js';
import { Groups }      from '/imports/api/groups/collection.js';
import { composeTitle } from '/imports/startup/client/routes/composeTitle.js';

let QUERY_LIMIT = 6 * 5;

/*
----------------------------
Search events route
----------------------------
*/
Router.route('/search/:categoryUrlName?', function() {
  this.subscribe('categories').wait();
  if (Meteor.userId()) {
    this.subscribe('organizers.managedByUser').wait();
  }

  const categoryUrlName = this.params.categoryUrlName || "seot";
  const categoriesUrlNamesList = categoryUrlName != "none" ? categoryUrlName.split("") : false;

  if (SessionStore.get('events.limit') == null || SessionStore.get('categoryUrlName') != categoryUrlName) {
    SessionStore.set('events.limit', QUERY_LIMIT);
  }
  // update categoryUrlName value after `if` check
  SessionStore.set('categoryUrlName', categoryUrlName);

  const subscribedToEvents = categoriesUrlNamesList != false;

  const eventsParams = {
    categoriesUrlNamesList: categoriesUrlNamesList,
    constainsText: SessionStore.get('events.search.text'),
    datesRange: {
      from: SessionStore.get('events.search.dates.from'),
      to:   SessionStore.get('events.search.dates.to'),
    },
    addFindParams: {
      isPublished: true,
    },
    options: {
      sort: {'dates.dateFrom': 1},
      limit: SessionStore.get('events.limit'),
    }
  };

  if (subscribedToEvents) {
    this.subscribe('events', eventsParams).wait();
    this.subscribe('organizers.forEvents', eventsParams).wait();

    // if we search by term or by date, then we don't want to display default Top Grou
    if (!eventsParams.constainsText && !eventsParams.datesRange.from && !eventsParams.datesRange.to) {
      this.subscribe('groups.byAbbreviations', categoriesUrlNamesList).wait();
      _.each(categoriesUrlNamesList, (groupAbbreviation)=>{
        this.subscribe('events.inGroup', groupAbbreviation).wait();
      });
    }
  }

  this.layout('mergedLayout', {
    data: {
      currentCategories: () => {
        if (categoriesUrlNamesList) {
          return Categories.find({urlName: {$in: categoriesUrlNamesList}}, {reactive: false});
        } else {
          return false;
        }
      },
      searchbarSupported: true,
      showSearchbar: this.params.query.sb == "true",
      events_: () => {
        const groups = Groups.find({abbreviation: {$in: categoriesUrlNamesList}}, {fields: {items: 1}}).fetch();
        if (!groups) { return false }
        const groupItemIds = _.reduce(groups, (union, group)=>{
          const groupItemsIds_ = group.items.map((e)=>{return e.item});
          return _.union(union, groupItemsIds_);
        }, []);
        return Events.find({_id: {$nin: groupItemIds}}, {sort: {'dates.dateFrom': 1}});
      },
      eventsForGroups: () => {
        const groups = Groups.find({abbreviation: {$in: categoriesUrlNamesList}}, {fields: {items: 1}}).fetch();
        if (!groups) { return false }
        const groupItemIds = _.reduce(groups, (union, group)=>{
          const groupItemsIds_ = group.items.map((e)=>{return e.item});
          return _.union(union, groupItemsIds_);
        }, []);
        const events = Events.find({_id: {$in: groupItemIds}}, {sort: {'dates.dateFrom': 1}});
        return events;
      },
      hasEvents: () => {
        return Events.find().count();
      },
      subscribedToEvents: subscribedToEvents,
      subscriptionsReady: () => {
        return this.ready();
      },
      isMain: true,
    },
  });
  this.render('list');
}, {
  name: "search",
  title: function(){
    const title = "Поиск";
    SessionStore.set("router.mainSiteSection.lastVisitedPageTitle", title);
    return composeTitle(title);
  },
});
