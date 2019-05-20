import React, { Component } from 'react';;
import {Root,Spinner} from 'native-base';
import {Font} from 'expo';
import { createStackNavigator, createAppContainer , createDrawerNavigator } from "react-navigation";
import Login from './Login';

import Customer from './Home/CustomerList';
import Sidebar from './Home/Sidebar';
import CustomerDetails from './Home/CustomerDetails';
import OrderDetail from './Home/OrderDetail';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store,persistor} from './Service/Session/Store';


const DrawerStack = createDrawerNavigator({
    Customer: {screen: Customer},
    },{
    contentComponent: props => <Sidebar {...props} />
    }
);
const AppNavigator = createStackNavigator(
  {
    Drawer: {screen:DrawerStack},
    Login: {screen: Login},
    Customer: {screen: Customer},
    CustomerDetails:{screen:CustomerDetails},
    OrderDetail: {screen: OrderDetail},
       
  },
  {
    headerMode: 'none',
    initialRouteName:'Drawer'
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor(props){
        super(props);
        this.state = {loading:true, isLoggedIn:false };
    }

    async componentDidMount() {
        const unsubscribe = store.subscribe(() => {
            if (store.getState().session.access_token) {
              unsubscribe();
              this.setState({isLoggedIn: true});
            }
            
          }); 
    
    }    

    async componentWillMount() {
       
           await Font.loadAsync({
              Roboto: require("native-base/Fonts/Roboto.ttf"),
              Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
            });  
            this.setState({ loading: false });
    }
        

    render() {  
        if (this.state.loading) {
            return (
              <Root>
                <Spinner style={{marginTop:30}} color='orange' />
              </Root>
            );
          }       
        return (
             <Root>
            <Provider store={store}>
            <PersistGate loading={<Spinner />} persistor={persistor}>
                {!this.state.isLoggedIn ? <Login/> : <AppContainer /> }
            </PersistGate>
            </Provider>
            </Root>
        );
        
    }

}


