import React from 'react'
import Container from '@material-ui/core/Container'
import StickyHeadTable from './TableWithHeader'
import CustomizedInputBase from './SearchForm'
import Box from '@material-ui/core/Box'

export default function SimpleContainer() {
  return (
    <>
      <Box m={4}>
        <Container maxWidth='sm'>
          <CustomizedInputBase />
          <StickyHeadTable />
        </Container>
      </Box>
    </>
  )
}
