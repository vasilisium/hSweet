import { useRef } from 'react';

import SensorsList from 'components/sensors/sensorsList';
import SideHider from 'components/sideHider/sideHider';
// import GroupsList from 'components/groups/groupsList';

import styles from './index.module.css';

const Home = (props) => {

    return (
        <div className={ styles.mainWrapper }>
            <aside>
                {/* <SideHider>
                    <GroupsList/>
                </SideHider> */}
            </aside>
            <main className='ml-2'>
                <SensorsList/>
            </main>
        </div>
    )
}


export default Home;