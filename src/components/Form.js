import React, {Component} from 'react';
import Info from './Info';
import ClassDaily from './ClassDaily';
import ClassWeekly from './ClassWeekly';
import OfficeAreas from './OfficeAreas';
import Restrooms from './Restrooms';
import items from '../items.json';
import CommonAreas from './CommonAreas';
import Comments from './Comments';

class Form extends Component {

    render () {
        return (
            <form>
                <Info />

                <h6>Classroom (Daily)</h6>
                <ClassDaily daily={items[0]} />

                <h6>Classroom (Weekly)</h6>
                <ClassWeekly weekly={items[1]} />

                <h6>Office Areas</h6>
                <OfficeAreas officeAreas={items[2]} />

                <h6>Restrooms</h6>
                <Restrooms restrooms={items[3]} />

                <h6>Common Areas</h6>
                <CommonAreas commonAreas={items[4]} />

                <h6>Additional Comments</h6>
                <Comments />

            </form>
        )
    }
}

export default Form;