# react-native-inviewport
Detect if component is in device viewport.
I based this off: https://github.com/joshwnj/react-visibility-sensor with some slight modifications.

<H2>Install</H2>

```sudo npm react-native-inviewport@latest --save```

<H2>Example Usage</H2>

Assuming you already setup your component, here's a quick example.

```
checkVisible(isVisible){
    if(isVisible){
      if(!this.state.visible){
        this.setState({visible: true});
      }
    }else{
      if(this.state.visible){
        this.setState({visible: false});
      }
    }
}

render() {
  return (
  <ScrollView style={{flex: 1}}>
    <InViewPort onChange={this.checkVisible}>
      <View style={{flex: 1, height: 200, backgroundColor: 'blue'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={this.checkVisible}>
      <View style={{flex: 1, height: 200, backgroundColor: 'green'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={this.checkVisible}>
      <View style={{flex: 1, height: 200, backgroundColor: 'red'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={this.checkVisible}>
      <View style={{flex: 1, height: 200, backgroundColor: 'orange'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={this.checkVisible}>
      <View style={{flex: 1, height: 200}}>
        <Text>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>
  </ScrollView>
  );
}
```
