import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, Paper, TableHead, TableRow, TableCell } from '@material-ui/core/';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const JobTable = ({ ...props }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log('Table Mounted');

  }, []);

  const rawMarkup = (content) => {
      var rawMarkup = content
      return { __html: rawMarkup };
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Job Title</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.jobList.map(row => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="left"><div dangerouslySetInnerHTML={rawMarkup(row.description)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default JobTable;