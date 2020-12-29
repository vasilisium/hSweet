import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import { fetchGroupsList, selectGroup_Action } from "redux/groups-Reducer";
import LoadingProgress from 'components/loadingProgress';
import GroupListItem from 'components/groups/groupListItem';
import { commonItems, objectiveItems } from './menuEntries';
import { IMenuItem } from './menuItem';
import { Options } from './options';
import { ContextMenu } from 'components/connextMenu';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

// import CreateGroup from 'components/createGroup/createGroup';
import { useContextMenu } from 'hooks/useContextMenu';
import { SlideInGroup } from 'components/slideInGroup';
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
  const { position, onRightClick, contextMenuClose } = useContextMenu();

  const selectedQuery = + router.query?.selected;

  const selectGroupHandler = (group) => {
    selectGroup(group.id)
    router.push(`${router.pathname}/?selected=${group.id}`, undefined, { shallow: true })
  }

  const menuClick = (action) => {
    console.log(action)
  }

  useEffect(() => {
    if (initiated === false) getGroupsList();
    if (selectedQuery && groupsList.map(ge => ge.id).includes(selectedQuery)) selectGroup(selectedQuery)
  }, [initiated])

  return loading
    ?
    <LoadingProgress />
    : error
      ? <h2> {error.toString()} </h2>
      : (
        <div className={classes.wrapper}>
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
                        onSelect={selectGroupHandler}
                      />
                    ))
                  }
                </SlideInGroup>
              }
            </List>

            {showOptions &&
              <Options
                delay={500}
                icon={selectedId > 0 ? <MoreVertIcon /> : <AddIcon />}
                {...(selectedId > 0 ? {} : { defaultAction: () => console.log('default') })}
              >
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