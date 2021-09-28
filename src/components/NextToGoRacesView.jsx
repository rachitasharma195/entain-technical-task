import {React, Component} from 'react';
import { Dropdown } from 'primereact/dropdown';
import NextToGoRacesTable from './NextToGoRacesTable.jsx';

class NextToGoRacesView extends Component {
    constructor(props) {
        super(props);
        this.state={
            raceCategory:'',
            raceCategoryList: [{
                label: "Greyhound racing",
                value: "9daef0d7-bf3c-4f50-921d-8e818c60fe61"
            }, {
                label: "Harness racing",
                value: "161d9be2-e909-4326-8c2c-35ed71fb460b"
            }, {
                label: "Horse racing",
                value: "4a2788f8-e825-4d36-9894-efd4baf1cfae"
            }]
        }
    }

    handleRaceCategoryChange = (e) => {
        this.props.handleRaceCategoryChange(e.value);
    }

    render() {
        const {raceCategoryList} = this.state;
        const {raceCategory} = this.props;
        return(
            <div>
                <h2>Next to Go races</h2>
                <Dropdown 
                    value={raceCategory} 
                    options={raceCategoryList} 
                    onChange={(e) => this.handleRaceCategoryChange(e)} 
                    placeholder="Select a race category"
                    showClear
                />
                <NextToGoRacesTable races={this.props.races} />
            </div>
        )
    }
}

export default NextToGoRacesView;