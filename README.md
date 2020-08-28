# react-native-inviewport
Detect if component is in device viewport.
I based this off: https://github.com/joshwnj/react-visibility-sensor with some slight modifications.

<H2>Install</H2>

```sudo npm react-native-inviewport@latest --save```

<H2>Example Usage</H2>

Assuming you already setup your component, here's a quick example.

```
import InViewPort from "react-native-inviewport";
checkVisible = (isVisible) => {
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
    <InViewPort onChange={(isVisible) => this.checkVisible(isVisible)}>
      <View style={{flex: 1, height: 200, backgroundColor: 'blue'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={(isVisible) => this.checkVisible(isVisible)}>
      <View style={{flex: 1, height: 200, backgroundColor: 'green'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={(isVisible) => this.checkVisible(isVisible)}>
      <View style={{flex: 1, height: 200, backgroundColor: 'red'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={onChange={(isVisible) => this.checkVisible(isVisible)}>
      <View style={{flex: 1, height: 200, backgroundColor: 'orange'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>

    <InViewPort onChange={(isVisible) => this.checkVisible(isVisible)}>
      <View style={{flex: 1, height: 200}}>
        <Text>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>
  </ScrollView>
  );
}
```

### Configurable props
* [delay](#delay)
* [disabled](#disabled)


### Event props
* [onChange] (#onChange)

### Configurable props
#### delay
A number that indicates milliseconds of periodically delay to check component visibility. By default it is 100ms.
Example: 
```
<InViewPort delay={1000}>
  ...
</InViewPort>
```


#### disabled
InviewPort always keep checking the component with a delay of 100ms. This props can be used for disabling checking for component visibility.
Example: 
```
<InViewPort disabled={true}>
  ...
</InViewPort>
```

### Event props
#### onChange
Callback function that is called whenever the component visibility change. It returns `true` or `false`.
Example:
 ```
  const onChangeVisibility = isVisible => console.log('is component visible ', isVisible);
  <InViewPort onChange={onChangeVisibility}>
  ...
  </InViewPort>
 ```
 
 
## Other Examples:
Let's assume you want to check whether a component at scroll end has displayed or not and it is rendering components asynchronise on scrollview so you can use `onScroll` event listener on scrollview.
Example
 ```
import InViewPort from "@coffeebeanslabs/react-native-inviewport";

this.state = {visible: false, isScrolling: false};

checkVisible = isVisible => this.setState({visible: isVisible});
const onScroll = () => this.setState({isScrolling: true});

render() {
  return (
  <ScrollView style={{flex: 1}} onScroll={onScroll}>
    //list of images
    //<Image..... />
    //.......
   
    {isScrolling && <InViewPort onChange={(isVisible) => this.checkVisible(isVisible)}>
      <View style={{flex: 1, height: 200, backgroundColor: 'blue'}}>
        <Text style={{color: 'white'}}>View is visible? {this.state.visible}</Text>
      </View>
    </InViewPort>}
  </ScrollView>
  );
}
 ```
