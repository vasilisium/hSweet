import { useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faObjectGroup } from '@fortawesome/free-solid-svg-icons';

import { fetchGroupsList, selectGroup_Action } from "redux/groups-Reducer";
import Spinner from 'components/spinner';
import GroupListItem from 'components/groups/groupListItem';

import styles from './groupsList.module.css';
import { Modal } from 'components/modal/Modal';
import { useBinaryState } from 'hooks/useBinaryState';
import CreateGroup from 'components/createGroup/createGroup';
import KeyboardEventHandler from 'components/keyboardEventHandler/KeyboardEventHandler';

const GroupsList = (props) => {

    const { isShowing, show, hide } = useBinaryState();

    const { selectGroup, getGroupsList, groupsSate } = props;
    const { loading, error, groupsList, initiated, selectedId } = groupsSate;

    const onModalClose = (witRefresh) => {
        hide();
        if(witRefresh) getGroupsList();
    }

    useEffect(()=>{
        if(initiated===false) getGroupsList();
        // else {
        //     const wr = document.getElementsByClassName(styles.wrapper);
        //     if(wr[0]) {
        //         console.log(wr[0]);
        //         wr[0].click();
        //     }
        // }
    }, [ initiated ])

    return loading ? <Spinner/> : 
        error ? <h2> { error.toString() } </h2> :
    (
        <div className={styles.wrapper}>
            <KeyboardEventHandler 
                handleKeys={['insert']} 
                onKeyEvent={()=>show()}
            />
            <div className={`my-2 ${styles.labelWithIcon}`}>
                <FontAwesomeIcon icon={faObjectGroup} size="2x" />
                <label><h6> Groups </h6></label>
            </div>
            <div >
                {groupsList && groupsList.map((group, i)=>{
                    return <GroupListItem key={group.id} 
                        obj={group} 
                        {... (group.id===selectedId ? { selected: true } : {})}
                        onSelect={(group)=>{
                            selectGroup(group.id)
                        }}
                    />
                })}
            </div>
            <div 
                className={`btn btn-outline-secondary m-2 ${styles['my-btn']} ${styles.labelWithIcon}` } 
                onClick={()=>show()}
            >
                <FontAwesomeIcon icon={faPlusSquare} size="2x" />
                <label>Create new group</label>
            </div>
            
            <Modal 
                on={isShowing}
                header='Create new group' 
                closeOnBackdropClick={false}
                onClose={onModalClose}
            >
                <CreateGroup onCancle={()=>onModalClose()} onOk={()=>onModalClose(true)}/>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({ groupsSate: state.groupsList})
const mapDispatchToProps = (dispatch) => {
    return {
        getGroupsList: () => dispatch(fetchGroupsList()),
        selectGroup: (id) => dispatch(selectGroup_Action(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);