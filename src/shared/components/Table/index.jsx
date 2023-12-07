import * as React from "react";

import {
  useLazyUserByIdQuery,
  useUsersUpdateStatusMutation,
} from "src/redux/api/authApi/authApi";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import RenderIf from "../RenderIf";
import Spinner from "../Spinner";
import Status from "../Status";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TableEdit } from "src/assets/svgs";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { imgBaseUrl } from "src/redux/api/axiosBase";
import { useDispatch } from "react-redux";

function Row({ row, setModalVisiblity, index }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [userById, { isLoading: byIdisLoading }] = useLazyUserByIdQuery();
  const [usersUpdateStatus, { isLoading: updateLoading }] =
    useUsersUpdateStatusMutation();

  const handleUpdateStatus = (status) => {
    usersUpdateStatus({
      id: status?.id,
      status: !status?.locked,
    });
  };

  const handleEditModal = async (rowId) => {
    await userById({ userId: rowId });
    setModalVisiblity(true);
  };

  const dateConvert = row?.lastUpdatedDate?.slice(0, 10);
  var date = new Date(dateConvert);
  var day = date.getDate();
  var month = date.toLocaleString("default", { month: "long" });
  var resultDate = day + " " + month + " " + date.getFullYear();

  return (
    <React.Fragment>
      <TableRow
        className={open ? "tableBodyIsOpen" : ""}
        role="button"
        onClick={() => setOpen(!open)}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell component="th" scope="row">
          <div className="d-flex align-items-center">
            <span className="User_Table_Person_Img">
              <img
                src={imgBaseUrl + "uploads/" + row?.photoUrl}
                alt="User-Photo"
              />
            </span>
            {row?.name + " " + row?.surname}
          </div>
        </TableCell>
        <TableCell align="right">{row?.email}</TableCell>
        <TableCell align="right">{row?.customOfficeName}</TableCell>
        <TableCell align="right">
          <Status
            disabled={updateLoading}
            isLoading={updateLoading}
            onClick={(event) => {
              event.stopPropagation();
              handleUpdateStatus(row);
            }}
            value={row?.locked}
            background={row?.locked}
          />
        </TableCell>
        <TableCell align="right">
          <RenderIf condition={byIdisLoading}>
            <Spinner color="#14458d" />
          </RenderIf>
          <RenderIf condition={!byIdisLoading}>
            <div
              className="tableEditIcon"
              onClick={(event) => {
                event.stopPropagation();
                handleEditModal(row?.id);
              }}
            >
              <TableEdit />
            </div>
          </RenderIf>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="childTable">
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Country
                      </TableCell>
                      <TableCell>Gender </TableCell>
                      <TableCell align="left">Phone number </TableCell>
                      <TableCell align="left">Added</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ color: "#6D6E73" }}
                        component="th"
                        scope="row"
                      >
                        {row?.countryName || "Azerbaijan"}
                      </TableCell>
                      <TableCell color="red">{row?.genderName} </TableCell>
                      <TableCell align="left">{row?.phone}</TableCell>
                      <TableCell align="left">{resultDate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UserTable({ setModalVisiblity, usersFilterData }) {
  const sortedData = usersFilterData?.data
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="left"></TableCell> */}
            <TableCell align="left">№</TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Customs offices </TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((row, index) => (
            <Row
              key={index}
              index={index}
              row={row}
              setModalVisiblity={setModalVisiblity}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
