import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import "./Pagination.scss";
export default function Pagination({
  count,
  handleChangeRowsPerPage,
  handleChangePage,
  page,
  rowsPerPage,
}) {
  return (
    <div className="mx-4">
      <TablePagination
        className="Pagination"
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
