import * as React from "react";
import { Delete, Edit, RemoveRedEyeRounded } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";

import Pagination from "src/shared/components/Pagination";
import { Button, RenderIf } from "src/shared/components";
import { Tooltip } from "@mui/material";
import TooltipCustom from "src/shared/components/TooltipCustom";
import { useSelector } from "react-redux";
import { RoleName } from "src/shared/constants/role";

export default function ContinentsTable(params) {
  const {
    handleViewModal,
    handleEditModal,
    handleDeleteModal,
    filteredData,
    rowsPerPage,
    page,
    continentData,
    handleChangeRowsPerPage,
    handleChangePage,
  } = params;
  const { roleName } = useSelector((state) => state?.user?.user);
  return (
    <>
      <TableContainer className="table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Continent Name</TableCell>
              <RenderIf condition={roleName == RoleName?.ADMIN}>
                <TableCell>Operation</TableCell>
              </RenderIf>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row?.name}</TableCell>
                <RenderIf condition={roleName == RoleName?.ADMIN}>
                  <TableCell align="right">
                    <div className=" table-container-oparation d-flex align-items-center">
                      <Button
                        onClick={() => handleViewModal(row?.id)}
                        padding="0"
                        background="none"
                      >
                        <TooltipCustom title="View">
                          <RemoveRedEyeRounded />
                        </TooltipCustom>
                      </Button>
                      <Button
                        onClick={() => handleEditModal(row?.id)}
                        padding="0"
                        background="none"
                      >
                        <TooltipCustom title="Edit">
                          <Edit />
                        </TooltipCustom>
                      </Button>
                      {/* <Button
                      onClick={() => handleDeleteModal(row?.id)}
                      padding="0"
                      background="none"
                    >
                      <TooltipCustom title="Delete">
                        <Delete />
                      </TooltipCustom>
                    </Button> */}
                    </div>
                  </TableCell>
                </RenderIf>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={continentData?.totalCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
}
