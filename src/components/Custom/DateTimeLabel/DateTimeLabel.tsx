import { useEffect, useState } from "react";
import moment from 'moment';

const DateTimeLabel = () => {
    const getTime = () => moment().format("h:mm:ss A");

    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const secondInterval = setInterval(() => setTime(getTime()), 1000);
        return () => clearInterval(secondInterval);
    }, []);

    return <>{time}</>;
};

export default DateTimeLabel;