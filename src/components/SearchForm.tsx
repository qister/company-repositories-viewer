import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { RootState } from '../redux/rootReducer'
import { connect } from 'react-redux'
import { reqRepos, setCompany, setAlert } from '../redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
)

const SearchForm = (props: any) => {
  const classes = useStyles()

  const [alertOpen, setAlertOpen] = useState(false)

  let [company, setCompany] = useState('')

  useEffect(() => {
    if (props.alert) {
      props.setAlert(props.alert)
      setAlertOpen(true)
      setTimeout(() => {
        setAlertOpen(false)
      }, 3000)
    }
  }, [props])

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value)
  }

  const sumbitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    if (company === '') {
      props.setAlert('Введите хоть что-нибудь')
      return
    }
    props.setCompany(company)
    props.reqRepos(company)

    setCompany('')
  }

  return (
    <>
      <Paper component='form' className={classes.root} onSubmit={sumbitHandler}>
        <InputBase
          className={classes.input}
          placeholder='Введите название компании'
          inputProps={{ 'aria-label': 'Найти репозитории компании' }}
          onChange={changeInputHandler}
          value={company}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Snackbar open={alertOpen} autoHideDuration={4000}>
        <Alert variant='filled' severity='error'>
          {props.alert}
        </Alert>
      </Snackbar>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  alert: state.app.alert,
})

const mapDispatchToProps = {
  reqRepos,
  setCompany,
  setAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
