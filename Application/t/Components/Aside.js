import React from 'react';
import AsideStartNavigation from './AsideStartNavigation';

class Aside extends React.Component {
	render () {
		return (
			<aside className='ab-aside'>
			  <AsideStartNavigation />
			</aside>
		);
	};
};

export default Aside;