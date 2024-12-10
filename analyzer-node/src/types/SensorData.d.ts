import moment from 'moment';

import { Node } from '@/components/Node';
import type CordinalDirection from './CordinalDirection';

export type SensorDataRow = {
    timestamp: moment.Moment;
    x: number;
    y: number
    distance: number;
    cordinalDirection: string;
    size: number;
};


export type SensorData = SensorDataRow[];