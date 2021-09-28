import {React, Component, Fragment} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class NextToGoRacesTable extends Component {
    timerTemplate = (rowData) => {
        var timeInSeconds = rowData.timer;
        return this.toDaysHHMMSS(timeInSeconds);
    }

    toHHMMSS = (timeInSeconds) => {
        var secInNumbers = Number(timeInSeconds);
        var hours = Math.floor(secInNumbers / 3600);
        var minutes = Math.floor((secInNumbers - (hours * 3600)) / 60);
        var seconds = secInNumbers - (hours * 3600) - (minutes * 60);
        if(hours < 10) {hours="0"+hours};
        if(minutes < 10) {minutes="0"+minutes};
        if(seconds < 10) {seconds="0"+seconds};
        return hours + ":" + minutes + ":" + seconds;
    }

    toDaysHHMMSS = (timeInSeconds) => {
        var secInNumbers = Number(timeInSeconds);
        var days = Math.floor(secInNumbers / (3600 * 24));
        var hours = Math.floor(secInNumbers % (3600 * 24) / 3600);
        var minutes = Math.floor(secInNumbers % 3600 / 60);
        var seconds = secInNumbers % 60;
        if(hours < 10) {hours="0"+hours};
        if(minutes < 10) {minutes="0"+minutes};
        if(seconds < 10) {seconds="0"+seconds};
        return days + "days, " + hours + ":" + minutes + ":" + seconds;
    }

    render() {
        return(
            <Fragment>
                <DataTable 
                    value={this.props.races}
                    scrollable={true}
                    scrollHeight={"200px"}
                >
                    <Column field="meetingName" header="Meeting Name"></Column>
                    <Column field="raceNumber" header="Race Number"></Column>
                    <Column field="timer" header="Starts in" body={this.timerTemplate}></Column>
                </DataTable>
            </Fragment>
        )
    }
}

export default NextToGoRacesTable;