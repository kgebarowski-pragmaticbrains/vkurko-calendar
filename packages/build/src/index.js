import Calendar from './../../core/index.js';
import DayGrid from './../../day-grid/index.js';
import List from './../../list/index.js';
import TimeGrid from './../../time-grid/index.js';
import ResourceTimeGrid from './../../resource-time-grid/index.js';
import ResourceTimeline from './../../resource-timeline/index.js';
import Interaction from './../../interaction/index.js';
import './../../core/index.css';

export default class extends Calendar {
    constructor(el, options) {
        super({
            target: el,
            props: {
                plugins: [DayGrid, List, TimeGrid, ResourceTimeGrid, ResourceTimeline, Interaction],
                options
            }
        });
    }
}
