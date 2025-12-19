function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * listPerPage;
}

function emptyorRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyorRows,
};
