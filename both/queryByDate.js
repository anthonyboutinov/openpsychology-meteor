
// setFindContainsText
// ==
export function setFindContainsText(findParams, constainsText) {
  if (constainsText) {
    console.log("Searching Events w/text: " + constainsText);
    findParams.$or = [
      {title:       {$regex : ".*" + constainsText + ".*", $options: "i"}},
      {description: {$regex : ".*" + constainsText + ".*", $options: "i"}},
    ];
  }

  return findParams;
}


// setFindDatesRange
// ==
export function setFindDatesRange(findParams, datesRange) {

  if (datesRange && datesRange.from) {
    const orArrayInstance = {
      'dateFrom': {
        '$lt': datesRange.from
      }
    };

    const path = ['dates', '$not', '$elemMatch', '$or'];
    if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
    if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
    if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
    if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = []}
    findParams[path[0]][path[1]][path[2]][path[3]].push(orArrayInstance);
  }

  if (datesRange && datesRange.to) {
    // add 1 day to make this restriction inclusive
    let dateTo = datesRange.to;
    dateTo = moment(dateTo).add(1, 'days').toDate();

    const orArrayInstance = {
      'dateTo': {
        '$gt': dateTo
      }
    };

    const path = ['dates', '$not', '$elemMatch', '$or'];
    if (findParams[path[0]]                   == null) {findParams[path[0]] = {}}
    if (findParams[path[0]][path[1]]          == null) {findParams[path[0]][path[1]] = {}}
    if (findParams[path[0]][path[1]][path[2]] == null) {findParams[path[0]][path[1]][path[2]] = {}}
    if (findParams[path[0]][path[1]][path[2]][path[3]] == null) {findParams[path[0]][path[1]][path[2]][path[3]] = []}
    findParams[path[0]][path[1]][path[2]][path[3]].push(orArrayInstance);
  }

  return findParams;

}


// setFindOngoing
// ==
export function setFindOngoing(findParams) {
  const now = new Date();

  const path = ['$and'];
  if (findParams[path[0]] == null) {findParams[path[0]] = []}
  findParams[path[0]].push({
    'dates': {'$elemMatch': {'dateFrom': {'$lt' : now}}}
  });
  findParams[path[0]].push({
    'dates': {'$elemMatch': {'dateFrom': {'$gte' : now}}}
  });

  return findParams;
}

export function setFindPast(findParams) {
  return setFindDatesRange(findParams, {to: new Date()});
}

export function setFindUpcoming(findParams) {
  return setFindDatesRange(findParams, {from: new Date()});
}

// function setFindNotPast(findParams) {
//   const now = new Date();
//
//   const path = ['$and'];
//   if (findParams[path[0]] == null) {findParams[path[0]] = []}
//   findParams[path[0]].push({
//     'dates': {'$elemMatch': {'dateFrom': {'$gte' : now}}}
//   });
//
//   return findParams;
// }


// parseDateRussianFormat
//
// Parses string of format "dd.mm.yyyy" into date
// ==
export function parseDateRussianFormat(st) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(st.replace(pattern,'$3-$2-$1'));
}
