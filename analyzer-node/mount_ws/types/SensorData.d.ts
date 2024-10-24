import moment from 'moment';

import { Node } from '@/components/Node';
import type CordinalDirection from './CordinalDirection';

export type SensorDataRow = {
    timestamp: moment.Moment;
    node: Node | undefined;
    distance: number;
    cordinalDirection: string

};


export type SensorData = SensorDataRow[];