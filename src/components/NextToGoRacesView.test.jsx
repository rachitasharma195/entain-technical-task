import React from 'react'
import NextToGoRacesView from './NextToGoRacesView.jsx';
import {shallow} from 'enzyme';

const mockedProps = {races: [], raceCategory: "A", handleRaceCategoryChange: jest.fn()};

describe("NextToGoRacesView", ()=>{
    it("shouldMatchSnapshot", ()=>{
        const component = shallow(<NextToGoRacesView {...mockedProps} />).dive();
        expect(component).toMatchSnapshot();
    })
})