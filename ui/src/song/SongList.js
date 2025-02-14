import React from 'react'
import {
  Datagrid,
  Filter,
  FunctionField,
  NumberField,
  SearchInput,
  TextField,
} from 'react-admin'
import { useMediaQuery } from '@material-ui/core'
import { DurationField, SimpleList, List, SongDetails } from '../common'
import { useDispatch } from 'react-redux'
import { setTrack } from '../audioplayer'
import { SongBulkActions } from './SongBulkActions'
import { AlbumLinkField } from './AlbumLinkField'
import { SongContextMenu } from './SongContextMenu'

const SongFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="title" alwaysOn />
  </Filter>
)

const SongList = (props) => {
  const dispatch = useDispatch()
  const isXsmall = useMediaQuery((theme) => theme.breakpoints.down('xs'))
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'))
  return (
    <List
      {...props}
      sort={{ field: 'title', order: 'ASC' }}
      exporter={false}
      bulkActionButtons={<SongBulkActions />}
      filters={<SongFilter />}
      perPage={isXsmall ? 50 : 15}
    >
      {isXsmall ? (
        <SimpleList
          primaryText={(r) => r.title}
          secondaryText={(r) => r.artist}
          tertiaryText={(r) => (
            <>
              <DurationField record={r} source={'duration'} />
              &nbsp;&nbsp;&nbsp;
            </>
          )}
          linkType={(id, basePath, record) => dispatch(setTrack(record))}
          rightIcon={(r) => <SongContextMenu record={r} />}
        />
      ) : (
        <Datagrid
          expand={<SongDetails />}
          rowClick={(id, basePath, record) => dispatch(setTrack(record))}
        >
          <TextField source="title" />
          {isDesktop && <AlbumLinkField source="album" />}
          <TextField source="artist" />
          {isDesktop && <NumberField source="trackNumber" />}
          {isDesktop && <NumberField source="playCount" />}
          {isDesktop && (
            <FunctionField source="year" render={(r) => r.year || ''} />
          )}
          <DurationField source="duration" />
          <SongContextMenu />
        </Datagrid>
      )}
    </List>
  )
}

export default SongList
