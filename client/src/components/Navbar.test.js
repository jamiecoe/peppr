import React from 'react';
import { shallow } from "enzyme";
import { Navbar } from './Navbar';

describe('Navbar', () => {
	const props = { page: '' };
	const navbar = shallow(<Navbar {...props}/>);

	it("renders properly", () => {
		expect(navbar).toMatchSnapshot();
	});

	
})
