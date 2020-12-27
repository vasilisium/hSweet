import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
// import Zoom from '@material-ui/core/Zoom';
// import Fab from '@material-ui/core/Fab';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';

import { fetchGroupsList, selectGroup_Action } from "redux/groups-Reducer";
import Spinner from 'components/spinner';
import GroupListItem from 'components/groups/groupListItem';
import { IMenuItem } from './menuItem';
import { Options } from './options'

// import { useBinaryState } from 'hooks/useBinaryState';
// import CreateGroup from 'components/createGroup/createGroup';
import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';
import { useContxtMenu } from 'hooks/useContxtMenu';
// import GroupIcon from './groupIcon';

import styles from './groupsList.module.css';

// const useStyles = makeStyles((theme) => ({
  
// }));

const commonItems = [
  {
    icon: <AddIcon />,
    label: 'New'
  }
]
const objectiveItems = [
  {
    icon: <EditIcon />,
    label: 'Rename'
  },
  {
    icon: <BuildIcon />,
    label: 'Modify'
  }
]

const GroupsList = (props) => {
  // const classes = useStyles();

  const { selectGroup, getGroupsList, groupsSate, showOptions } = props;
  const { loading, error, groupsList, initiated, selectedId } = groupsSate;

  const { position, onRightClick, contextMenuClose } = useContxtMenu((e,o)=>console.log(o));

  useEffect(() => {
    if (initiated === false) getGroupsList();
    // setTimeout(() => setZoom(true), 500);
  }, [initiated])

  return loading ? <Spinner /> :
    error ? <h2> {error.toString()} </h2> :
      (
        <div className={styles.wrapper}>
          <KeyboardEventHandler
            handleKeys={['insert']}
            onKeyEvent={() => show()}
          />
          <div className={styles.innerContainer}>
            <List>
              {groupsList && groupsList.map((group, i) => {
                return <GroupListItem key={group.id}
                  onRightClick={onRightClick}
                  obj={group}
                  {... (group.id === selectedId ? { selected: true } : {})}
                  onSelect={(group) => {
                    selectGroup(group.id)
                  }}
                />
              })}
            </List>
            <Options delay={500}>
              {
                (selectedId > 0 ? commonItems.concat(objectiveItems) : commonItems)
                .map((mi, index) => <IMenuItem {...mi} key={index} />)
              }
            </Options>
            <Menu
              keepMounted
              open={position.y !== null}
              onClose={contextMenuClose}
              anchorReference="anchorPosition"
              anchorPosition={
                position.y !== null && position.x !== null
                  ? { top: position.y, left: position.x }
                  : undefined
              }
            >
              {objectiveItems.map((mi, index) => <IMenuItem {...mi} key={index} />)}
            </Menu> 
            


          </div>
          {/* <div
            className={`btn btn-outline-secondary m-2 ${styles['my-btn']} ${styles.labelWithIcon}`}
            onClick={() => show()}
          >
            <AddBoxSharpIcon />
            <label>Create new group</label>
          </div> */}

          {/* <Modal
            on={isShowing}
            header='Create new group'
            closeOnBackdropClick={false}
            onClose={onModalClose}
          >
            <CreateGroup onCancle={() => onModalClose()} onOk={() => onModalClose(true)} />
          </Modal> */}
        </div>
      )
}

const mapStateToProps = (state) => ({ groupsSate: state.groupsList })
const mapDispatchToProps = (dispatch) => {
  return {
    getGroupsList: () => dispatch(fetchGroupsList()),
    selectGroup: (id) => dispatch(selectGroup_Action(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);