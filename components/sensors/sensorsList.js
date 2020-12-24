import { useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faObjectGroup, faEdit } from '@fortawesome/free-solid-svg-icons';

import { fetchSensorsList } from 'redux/sensorsList-Reducer';
import Sensor from 'components/sensors/sensor';
import Spinner from 'components/spinner';

import styles from './sensor.module.css';

const SensorsList = ({ getSensorsList, sensorsSate, selectedGroup }) => {
  const { sensorsList, initiated } = sensorsSate;

  useEffect(() => {
    if (initiated == false) getSensorsList();
  }, [initiated])

  return sensorsSate.loading ? (
    <Spinner />
  ) : sensorsSate.error ? (
    <h2>{sensorsSate.error.toString()}</h2>
  ) : (
    <div>
      <div className={styles.listHeader}>
        <div className={`my-1 ${styles.labelWithIcon}`}>
          <FontAwesomeIcon icon={faObjectGroup} size="2x" />
          <label><h6> {selectedGroup?.name || '(not selected)'} </h6></label>
        </div>

        <div className={`btn btn-outline-secondary ${styles.asd}`}>
            <FontAwesomeIcon icon={faEdit} />
        </div>
      </div>

      <div className={`p-0 container-fluid ${styles.sensorsGrid}`}>
        {sensorsList && sensorsList.map((s, i) => (
          <Sensor obj={s} key={i} />
        ))}
      </div>
    </div>
      )
}

const mapStateToProps = (state) => ({
  sensorsSate: state.sensorsList,
  selectedGroup: state.groupsList.groupsList.filter(g => g.id === state.groupsList.selectedId)[0]
});

const mapDispatchToProps = (dispatch) => ({
  getSensorsList: () => dispatch(fetchSensorsList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SensorsList);