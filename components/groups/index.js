import { useEffect } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';

import { makeStyles } from '@material-ui/core/styles';

import { fetchGroupsList, selectGroup_Action } from "redux/groups-Reducer";
import Spinner from 'components/spinner';
import GroupListItem from 'components/groups/groupListItem';
import { IMenuItem } from './menuItem';
import { Options } from './options';
import { ContextMenu } from 'components/connextMenu';

// import CreateGroup from 'components/createGroup/createGroup';
import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';
import { useContextMenu } from 'hooks/useContextMenu';
import { SlideInGroup } from 'components/slideInGroup';
// import GroupIcon from './groupIcon';

// import styles from './groupsList.module.css';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
  },

  innerContainer: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    height: '100%',
  }
}));

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
  const classes = useStyles();

  const { selectGroup, getGroupsList, groupsSate, showOptions = false } = props;
  const { loading, error, groupsList, initiated, selectedId } = groupsSate;

  const { position, onRightClick, contextMenuClose } = useContextMenu();

  console.log(position.y!==null)

  useEffect(() => {
    if (initiated === false) getGroupsList();
  }, [initiated])

  return loading 
    ? 
      <Spinner /> 
    : error 
      ? <h2> {error.toString()} </h2> 
      : (
        <div className={classes.wrapper}>
          <KeyboardEventHandler
            handleKeys={['insert']}
            onKeyEvent={() => show()}
          />
          <div className={classes.innerContainer}>
            <List>
              {groupsList &&
                <SlideInGroup on interval={40} >
                  {
                    groupsList.map((group) => (
                      <GroupListItem key={group.id}
                        onRightClick={onRightClick}
                        obj={group}
                        {... (group.id === selectedId ? { selected: true } : {})}
                        onSelect={(group) => {
                          selectGroup(group.id)
                        }}
                      />
                    ))
                  }
                </SlideInGroup>
              }
            </List>

            {showOptions &&
              <Options delay={500}>
                {
                  (selectedId > 0 ? commonItems.concat(objectiveItems) : commonItems)
                    .map((mi, index) => <IMenuItem {...mi} key={index} />)
                }
              </Options>
            }
            <ContextMenu
              openOn={position.y !== null}
              closeCallback={contextMenuClose}
              position={position}
            >
              {objectiveItems.map((mi, index) => <IMenuItem {...mi} key={index} />)}
            </ContextMenu>
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