import React, {Component} from 'react';
import './Layout.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';

class Layout extends Component{
	state={
		showSideDrawer:false
	}
	sideDrawerClosedHandler=()=>{
		this.setState({showSideDrawer:false});
	}
	sideDrawerToggleHandler=()=>{
		this.setState((prevState)=>{
			return{showSideDrawer:!this.state.showSideDrawer};
	});
}
	render(){
		return(
			<div className="h">  
				<ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer open={this.state.showSideDrawer}closed={this.sideDrawerClosedHandler}/>>
				<main className='content'>
					{this.props.children}
				</main>
			</div>
		);
	}
}


export default Layout;