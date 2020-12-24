import { useRouter } from 'next/router';

const Sensor = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {id}
        </div>
    )
}

export default Sensor
