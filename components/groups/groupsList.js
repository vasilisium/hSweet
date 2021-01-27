import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

import { fetchGroupsList, selectGroup_Action } from "redux/groups-Reducer";
import LoadingProgress from 'components/loadingProgress';
import GroupListItem from 'components/groups/groupListItem';
import { commonItems, objectiveItems } from './menuEntries';
import { IMenuItem } from './menuItem';
import { OptionsButton } from './optionsButton';
import { ContextMenu } from 'components/connextMenu';
import { useBinaryState } from 'hooks/useBinaryState';

import { useContextMenu } from 'hooks/useContextMenu';
import { SlideInGroup } from 'components/slideInGroup';
import { actions } from './menuEntries'
import CreateGroup from 'components/createGroup/createGroupDialog';
// import GroupIcon from './groupIcon';

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

const GroupsList = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const { selectGroup, getGroupsList, groupsSate, showOptions = false } = props;
  const { loading, error, groupsList, initiated, selectedId } = groupsSate;
  const { position, onRightClick, contextMenuClose, clickedObject } = useContextMenu();
  const dialogState = useBinaryState(); //{ isShowing, toggle, show, hide }
  
  const [dialogProps, setDialogProps] = useState({});
  const selectedQuery = + router.query?.selected;

  const selectGroupHandler = (group) => {
    selectGroup(group.id)
    router.push(`${router.pathname}/?selected=${group.id}`, undefined, { shallow: true })
  }

  const menuClick = (action) => {
    const obj = selectedId ? groupsList.filter(g => g.id === selectedId)[0] : clickedObject

    switch (action) {
      case actions.create:
        createGroup()
        break;

      case actions.rename:
        renameGroup(obj);
        break;

      case actions.modify:
        modifyGroup(obj)
    }
  }
  const renderMenuItem = (mi, key) => <IMenuItem {...mi} key={key} callback={menuClick} />
  const createGroup = () => {
    dialogState.show()

  }
  const renameGroup = (g) => {
    console.log('renaming group', g)
  }
  const modifyGroup = (g) => {
    console.log('modifying group', g)
  }

  useEffect(() => {
    if (initiated === false) getGroupsList();
    if (selectedQuery && groupsList.map(ge => ge.id).includes(selectedQuery)) selectGroup(selectedQuery)
  }, [initiated])

  return loading
    ? <LoadingProgress />
    : error
      ? <>
        <h1>{error.msg}</h1>
        <pre> {JSON.stringify(error, null, 4)} </pre>
      </>
      : (
        <div className={classes.wrapper}>
          {/* <LoadingProgress /> */}
          <div className={classes.innerContainer}>
            <List>
              {groupsList &&
                <SlideInGroup on interval={40} >
                  {
                    groupsList.map((group) => (
                      <GroupListItem key={group.id}
                        onRightClick={(e, obj) => {
                          onRightClick(e, obj)
                        }}
                        obj={group}
                        {... (group.id === selectedId ? { selected: true } : {})}
                        onSelect={selectGroupHandler}
                      />
                    ))
                  }
                </SlideInGroup>
              }
            </List>

            {showOptions &&
              <OptionsButton
                delay={500}
                icon={selectedId > 0 ? <MoreVertIcon /> : <AddIcon />}
                {...(selectedId > 0 ? {} : { defaultAction: createGroup })}
              >
                {
                  (selectedId > 0 ? commonItems.concat(objectiveItems) : commonItems)
                    .map((mi, index) => renderMenuItem(mi, index))
                }
              </OptionsButton>
            }
            <ContextMenu
              openOn={position.y !== null}
              closeCallback={contextMenuClose}
              position={position}
            >
              {objectiveItems.map((mi, index) => renderMenuItem(mi, index))}
            </ContextMenu>
          </div>

          <CreateGroup
            openOn={dialogState.isShowing}
            onCancle={dialogState.hide}
            onClose={dialogState.hide}
            onOk={()=>{
              getGroupsList();
              dialogState.hide();
            }}
            {...dialogProps}
          />
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