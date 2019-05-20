import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left,Separator,Toast, Right,Icon, Spinner,Body,Title,Button } from 'native-base';
import * as Api from '../Service/Api';
import {Alert} from 'react-native';
import Text from '../Text';

export default class OrderDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            orderInfo : "", 
            isLoading: true,
            productsInfo:"",
            
        }
    }
    orderDeliveredSuccess = (response) => {
      console.log(JSON.stringify(response));
      if (response.status == 'Success') {
        Toast.show({
          text: response.message,
          buttonText: "Okay",
          type: "success"
        })
       
        this.props.navigation.goBack();
      } else {
        Toast.show({
          text: response.message,
          buttonText: "Okay",
          type: "danger"
        })
      }
    }
  
    OrderConfirmation = () => {
  
      Alert.alert(
        'Delivery',
        'Are you sure to confirm the delivery?',
        [
          {text: 'No'}, 
          {text: 'Yes', onPress: () => this.orderDelivered() } ,
        ],
        { cancelable: false }
      )
    }
  

    onRequestSuccess=(response)=> {
        console.log(JSON.stringify(response));
        this.setState({orderInfo: response.orderInfo});
        this.setState({productsInfo: response.productsInfo});
        this.setState({isLoading:false});
        //console.log(this.state.productsInfo['productId'].sellerId);
    };
    
componentDidMount (){
    this._getOrderDetails();
}

    _getOrderDetails = () => {
        Api.orderDetails({orderId: this.props.navigation.getParam('orderId')})
        .then(this.onRequestSuccess)
        .catch((exception) => {
          // Displays only the first error message
          const error = Api.exceptionExtractError(exception);
          this.setState({
            isLoading: false,
            ...(error ? { error } : {}),
          });
    
          if (!error) {
            throw exception;
          }
        });
      }

      orderDelivered = () => {
        Api.orderDelivered({orderId: this.props.navigation.getParam('orderId'), status: 'DELIVERED'})
        .then(this.orderDeliveredSuccess )
        .catch((exception) => {
          throw exception;
        });
      }
    

    render() {
        
        if (this.state.isLoading) {
           return <Spinner />;
        } else
        return (

            <Container>
                <Header style={{marginTop:25, height:48, backgroundColor:'#FFCA28'}}>
                <Left style={{flex:0.3}}>
                    <Button transparent onPress={()=>this.props.navigation.navigate('CustomerDetails')}>
                    <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body> 
                    <Title style={{color:"brown", fontSize:15}}>Order Detail</Title>
                </Body>
                </Header>
                <Content>
                <Separator bordered>
                    <Text style={{fontSize:9}}>ORDER DETAILS</Text>
                </Separator>

                <ListItem > 
                <Body >
              <Text note>ORDER ID</Text>
              <Text>{this.state.orderInfo.id}</Text>
            </Body> 
          </ListItem> 
          <ListItem >
            <Body>
              <Text note>DATE</Text>
              <Text >{this.state.orderInfo.createdAt}</Text>
            </Body>
          </ListItem>
          <ListItem style={{}}>
            <Body>
              <Text note>DELIVER TO</Text>
              <Text style={{fontSize:15}}>{this.state.orderInfo.billingName}</Text>
              <Text>{this.state.orderInfo.deliveryAddress}</Text>
            </Body>
          </ListItem>
          <Separator bordered>
            <Text style={{fontSize:9}}>ORDER SUMMARY</Text>
          </Separator>
          
          <List
              dataArray={this.state.orderInfo.order_details}
              renderRow={data =>
              
            <ListItem >
            <Body >
              <Text numberOfLines={1}>{this.state.productsInfo[data.productId.toString()].name}</Text>
              <Text note>{"Quantity : " + data.quantity}</Text>
            </Body>
            <Right>
              <Text note>{'\u20B9'} { data.price}/{this.state.productsInfo[data.productId.toString()].scale}</Text>
            </Right>
            </ListItem>}
          />  
      <ListItem  noBorder>
            <Left>
              <Text>Subtotal</Text>
            </Left>
            <Right style={{}}>
              <Text>{'\u20B9'} {this.state.orderInfo.subTotal}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Total</Text>
            </Left>
            <Right style={{alignSelf:"flex-end"}}>
              <Text>{'\u20B9'} {this.state.orderInfo.subTotal + this.state.orderInfo.deliveryCharge}</Text>
            </Right>
          </ListItem>
          <ListItem>
          <Body >
            {(this.state.orderInfo.status != 'DELIVERED') ? <Button success block onPress={()=>this.OrderConfirmation()}><Text style={{fontSize:18}}>Delivery</Text></Button>
            : <Text/>}
          </Body>
          </ListItem>

                </Content>           
            </Container> 
        );
}
}
