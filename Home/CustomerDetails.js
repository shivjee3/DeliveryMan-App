import React, { Component } from 'react';
import { StyleSheet, View,Linking, ImageBackground } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Right,Icon, Spinner,Body,Title,Button, Card, CardItem } from 'native-base';
import * as Api from '../Service/Api';



export default class CustomerDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      customerInfo: "",
      latitude: "",
      longitude: "",
      retailerId: this.props.navigation.getParam() ? this.props.navigation.getParam('retailerId') : "",
      orders: [],
     
    }
}

onRequestSuccess(response) {
  console.log(JSON.stringify(response));
  this.setState({isLoading:false})
  this.setState({customerInfo: response.retailerInfo });
  
}
onRequestOrder(response){
  console.log('order'+JSON.stringify(response));
  this.setState({isLoading:false,orders:response.orders});
 
}

componentDidMount (){
 this._fetchCustomerInfo();
 this._fetchRetailerOrders();
}

_fetchCustomerInfo() {
  Api.fetchApi('/saleson/getRetailerInfo',{retailerId:this.props.navigation.getParam('customerId')}, 'get')
    .then(this.onRequestSuccess.bind(this))
    .catch((exception) => {
      throw exception;
  });
}


_fetchRetailerOrders() {
    Api.getRetailerOrders({retailerId: this.props.navigation.getParam('customerId')})
    .then(this.onRequestOrder.bind(this))
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

  render() {
    
    return (
     
      <Container>
       <ImageBackground source={require('../assets/backgd.jpg')} style={{flex:1}}>
        <Header style={{marginTop:25, backgroundColor:'#FFCA28',height:48}}>
          <Left style={{flex:0.3}}>
            <Button transparent onPress={()=>this.props.navigation.navigate('Customer')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body> 
            <Title style={{color:"brown"}}>{this.state.customerInfo.companyName}</Title>
          </Body>
        </Header>
        
        <Content>  
          {
            this.state.isLoading ? <Spinner /> :
            <View>
              <Card style={{borderBottomColor:'orange', borderBottomWidth:2}}>
                <CardItem >
                  <Left>
                    <Body>
                      <Text numberOfLines={1} style={{fontSize:20,fontWeight:'700'}}>{this.state.customerInfo.companyName}</Text>
                      <Text note numberOfLines={3}>{this.state.customerInfo.address}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Body style={{alignSelf:'flex-end'}}>
                      <View style={{marginRight:'10%'}}>       
                        <Icon type="Entypo" style={{color:'orange',fontSize:20,borderRadius:10,borderWidth:1, borderColor:'orange',padding:6,marginBottom:10}} onPress={() => Linking.openURL(`tel:${this.state.customerInfo.mobile}`)} name="phone"></Icon>
                        <Icon type="MaterialCommunityIcons" style={{color:'orange', marginTop:10,borderRadius:10,borderColor:'orange', fontSize:22,borderWidth:1,padding:6}} name="map-marker-radius" onPress={() => Linking.openURL('google.navigation:q='+this.state.customerInfo.latitude+'+'+this.state.customerInfo.longitude)}></Icon>
                      </View>
                    </Body>
                  </Right>
                </CardItem>
              </Card>  

              <List
              dataArray={this.state.orders}
              renderRow={order =>
              <Card>
                <CardItem bordered>
                  <Left >
                      <Text note>Order No: <Text>{order.id}</Text></Text>
                  </Left>
                  <Right>
                      <Text style={{color:'green',fontSize:12}}>{order.status}</Text>
                  </Right>
                </CardItem>
                
                <CardItem button onPress={() => this.props.navigation.navigate('OrderDetail',{orderId: order.id})}>
                  <Left>
                    <Body>
                      <Text>{order.billingName}</Text>
                      <Text note>{order.deliveryAddress}</Text>
                    </Body>
                  </Left>
                </CardItem>
                
                <CardItem footer >
                  <Left>
                    <Body>
                      <Text note>{order.createdAt}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Body style={{alignSelf:'flex-end'}}>
                      <Text style={{color:'red'}}>{'\u20B9'}{order.subTotal + order.deliveryCharge}</Text>
                    </Body>
                  </Right>
                </CardItem>
              </Card>
              }
          />
            </View>
          }        
        </Content>
        </ImageBackground>
      </Container>
      
    );
  }
}


