import * as queryByDate from '/both/queryByDate.js';
import { Categories } from '/imports/api/categories';

export function getFindParams(params) {
  const categoryIds = Categories.find({urlName: {$in: params.categoriesUrlNamesList}}, {fields: {_id: 1}}).map((v)=>{return v._id});

  let findParams = {categoryId: {$in: categoryIds}};
  if (params.addFindParams) {
    _.extend(findParams, params.addFindParams);
  }

  findParams = queryByDate.setFindContainsText(findParams, params.constainsText);

  let datesRangeAsDates = {};
  if (params.datesRange && params.datesRange.from) {
    datesRangeAsDates.from = queryByDate.parseDateRussianFormat(params.datesRange.from);
  }
  if (params.datesRange && params.datesRange.to) {
    datesRangeAsDates.to = queryByDate.parseDateRussianFormat(params.datesRange.to);
  }

  findParams = queryByDate.setFindDatesRange(findParams, datesRangeAsDates);
  return findParams;
}
