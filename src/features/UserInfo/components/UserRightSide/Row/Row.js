import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right">{row?._id}</TableCell>
        <TableCell align="right">{row?.address?.fullname}</TableCell>
        <TableCell align="right">{row?.address?.address}</TableCell>
        <TableCell align="right">{row?.address?.phone}</TableCell>
        <TableCell align="right">{row?.amount}</TableCell>
        <TableCell component="th" scope="row">
          {row?.status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Count</TableCell>
                  <TableCell align="right">Total price ($)</TableCell>
                </TableRow>
                <TableBody>
                  {row?.cart?.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell component="th" scope="row">
                        {historyRow?.nameProduct}
                      </TableCell>
                      <TableCell>
                        <img
                          src={historyRow?.img?.url}
                          alt="img"
                          width="50px"
                        />
                      </TableCell>
                      <TableCell align="right">
                        {historyRow?.sizeProduct}
                      </TableCell>
                      <TableCell align="right">{historyRow?.count}</TableCell>
                      <TableCell align="right">
                        $
                        {parseInt(historyRow?.priceProduct) * historyRow?.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
