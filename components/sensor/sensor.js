import Link from 'next/link';
import styles from './sensor.module.css';

const Sensor = (props) => {
    const { obj } = props;
    const { name, description, id } = obj;

    // const id = obj.ref['@ref'].id
    // const id ='#'

    return (
        <Link href={`/sensor/${id}`}><a className={styles.linkSensor}>
            <div className="card border-secondary mb-3"> 
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

const sensors_request = async () => {
    try {
        return await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('sensorsIndex')
                    )
                ),
                q.Lambda(
                    'ref',
                    q.Get( q.Var('ref') )
                )
            )
        )
    } catch (error) {
        return error;
    }
}

export const  getServerSideProps = async (context) => {
    const sensors = await asensors_request();

    return {
        props: { sensors }
    }
}
