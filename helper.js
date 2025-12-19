function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * listPerPage; // Retirer les crochets
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
