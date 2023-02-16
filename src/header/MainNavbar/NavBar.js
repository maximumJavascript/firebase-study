import React from 'react';
import LeftNavbar from '../LeftPartOfNavbar/LeftNavbarPart';
import CentrNavbar from '../CentrPartOfNavbar/CentrNavbar';
import RightNavbar from '../RightPartOfNavbar/RightNavbar';

class NavBar extends React.Component {
	render() {
		return (
			<header>
				<nav>
					<LeftNavbar />
					<CentrNavbar signUserOut={this.props.signUserOut} />
					<RightNavbar photoSrc={this.props.photoSrc} />
				</nav>
			</header>
		);
	}
}

export default NavBar;
