import Link from 'next/link';
import styles from './sensor.module.css';

const Sensor = (props) => {
    const { obj } = props;
    const { name, description, id } = obj;

    return (
        <Link href={`/sensor/${id}`}><a className={` ${styles.linkSensor}`}>
            <div className="card border-secondary"> 
                <div className="card-header">{name}</div>
                <div className="card-body">
                    <h4 className="card-title">{description}</h4>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </a></Link>
    )
}

export default Sensor;
