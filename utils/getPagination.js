function getPagination(req) {
  // convert query to number
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  //assign default values if query params are invalid
  page = page ? page : 1;
  limit = limit ? limit : 20;

  return { page, limit };
}

module.exports = getPagination;
