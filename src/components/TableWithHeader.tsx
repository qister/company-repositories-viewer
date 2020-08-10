import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import Link from '@material-ui/core/Link'

import { connect } from 'react-redux'

import SimpleBackdrop from './Backdrop'
import { RootState } from '../redux/rootReducer'
import { Repository } from '../redux/reposReducer'

interface Column {
  id: 'name' | 'forks_count' | 'watchers_count' | 'stargazers_count'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'name', label: 'Repository Name', minWidth: 170 },
  {
    id: 'forks_count',
    label: 'Forks',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('ru-RU'),
  },
  {
    id: 'watchers_count',
    label: 'Watchers',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('ru-RU'),
  },
  {
    id: 'stargazers_count',
    label: 'Stars',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('ru-RU'),
  },
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

type Props = {
  company: string
  list: Array<Repository>
  loading: boolean
  dispatch: any
}

function TableWithHeader(props: Props) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  if (!props.list.length) {
    return <></>
  } else if (props.loading) {
    return <SimpleBackdrop />
  }

  const rows = props.list
  const company = props.company[0].toUpperCase() + props.company.slice(1)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <h1>{company}</h1>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.name}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]

                        if (column.id === 'name') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link href={row.html_url}>{value}</Link>
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  company: state.company.name,
  list: state.company.repositoriesList,
  loading: state.app.loading,
})

export default connect(mapStateToProps)(TableWithHeader)
