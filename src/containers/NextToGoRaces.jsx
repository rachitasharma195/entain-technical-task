import {React, Fragment, Component} from 'react';
import NextToGoRacesView from '../components/NextToGoRacesView.jsx';

class NextToGoRaces extends Component{
    constructor(props) {
        super(props);
        this.state={
            raceCategory: '',
            tableData:[],
            filteredTableData: []
        }
    }
    componentDidMount() {
        fetch("https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10", {
            "method": "GET",
            "headers": {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            this.formatData(response.data);
        })
        .catch(err => { console.log(err); 
        });
    }

    formatData = (data) => {
        var nextToGoIds = data.next_to_go_ids;
        var raceSummaries = data.race_summaries;
        var tableData = [];
        nextToGoIds.forEach((id) => {
            var tableObj = {};
            tableObj.meetingName = raceSummaries[id].meeting_name;
            tableObj.raceNumber = raceSummaries[id].race_number;
            tableObj.categoryId = raceSummaries[id].category_id;
            tableObj.timer = raceSummaries[id].advertised_start.seconds;
            tableData.push(tableObj);
        })
        tableData = tableData.sort(this.comparer());
        this.setState({tableData: tableData, filteredTableData: tableData});
    }

    //Comparer Function    
    comparer() {    
        return function(a, b) {    
            if (a.timer > b.timer) {    
                return 1;    
            } else if (a.timer < b.timer) {    
                return -1;    
            }    
            return 0;    
        }    
    }

    handleRaceCategoryChange = (value) => {
        this.setState({raceCategory: value});
        var filteredTableData = [];
        this.state.tableData.forEach((data) => {
            if(value) {
                if(data.categoryId === value) {
                    filteredTableData.push(data);
                }
            } else {
                filteredTableData.push(data);
            }
        })
        this.setState({filteredTableData});
    }

    render() {
        return (
            <Fragment>
                <NextToGoRacesView 
                    races={this.state.filteredTableData} 
                    raceCategory={this.state.raceCategory}
                    handleRaceCategoryChange={this.handleRaceCategoryChange} 
                />
            </Fragment>
        )
    }
}

export default NextToGoRaces;