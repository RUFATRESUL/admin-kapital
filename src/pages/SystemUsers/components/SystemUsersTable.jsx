import * as React from "react";
import {   RemoveRedEyeRounded } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";

import TooltipCustom from "src/shared/components/TooltipCustom";
import Pagination from "src/shared/components/Pagination";
import { Button, RenderIf } from "src/shared/components";
import {Edit,Trash,Key} from "src/assets/svgs"
export default function CustomOfficesTable(params) {
  const {
    handleViewModal,
    handleEditModal,
    handleDeleteModal,
    handlePasswordModal,
    customOfficeData,
    rowsPerPage,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
    filteredData,
  } = params;
  return (
    <>
      <TableContainer className="table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
           
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row, index) => {
              let address = row?.address
                ? row?.address.substring(0, 25) + "..."
                : "-";

              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                 
                  <TableCell align="right">{row?.countryName || "-"}</TableCell>
                  <TableCell align="right">
                    {row?.cusOffShortName || "-"}
                  </TableCell>
                  <TableCell align="right">{row?.email || "-"}</TableCell>
                  <TableCell align="right">{row?.phone || "-"}</TableCell>
                  <TableCell align="right">
                    <div className=" table-container-oparation d-flex align-items-center">
                    
                      <Button
                        onClick={() => handleEditModal(row?.id)}
                        padding="0"
                        background="none"
                      >
                        <TooltipCustom title="Edit">
                          <Edit />
                        </TooltipCustom>
                      </Button>
                      <Button
                        onClick={() => handleDeleteModal(row?.id)}
                        padding="0"
                        background="none"
                      >
                        <TooltipCustom title="Delete">
                          <Trash />
                        </TooltipCustom>
                      </Button>
                      <Button
                        onClick={() => handlePasswordModal(row?.id)}
                        padding="0"
                        background="none"
                      >
                        <TooltipCustom title="View">
                          <Key />
                        </TooltipCustom>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={customOfficeData?.totalCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
}
