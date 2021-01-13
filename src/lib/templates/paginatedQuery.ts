export const paginated = async (
  pagination: any,
  model: any,
  key: string,
  query: any,
) => {
  const list = await model.paginate(query, {
    limit: pagination.limit,
    page: pagination.page,
  });

  return {
    result: 'SUCCESS',
    totalItems: list.totalDocs,
    page: list.page,
    limit: list.limit,
    totalPages: list.totalPages,
    [key]: list.docs,
  };
};

export const paginatedWidthSort = async (
  pagination: any,
  model: any,
  key: string,
  query: any,
) => {
  const list = await model.paginate(query, {
    limit: pagination.limit,
    page: pagination.page,
    sort: { [pagination.sortKey]: pagination?.sort === 'ASC' ? 1 : -1 },
  });

  return {
    result: 'SUCCESS',
    totalItems: list.totalDocs,
    page: list.page,
    limit: list.limit,
    totalPages: list.totalPages,
    [key]: list.docs,
  };
};
