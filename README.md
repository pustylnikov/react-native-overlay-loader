<img width="320" src="https://storage.googleapis.com/anvilapp/npm-pictures/react-native-overlay-loader/preview.gif"/>

### Installation
```js
npm install react-native-overlay-loader --save
```
or 
```js
yarn add install react-native-overlay-loader
```

### Usage
```javascript
import React, {Component} from 'react';
import {Button, StatusBar, View} from 'react-native';
import Loader from 'react-native-overlay-loader';

class App extends Component {

    defaultLoader;
    customLoader;

    showLoader = (ref) => {
        ref.show();
        setTimeout(() => {
            ref.hide();
        }, 1000);
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent
                    barStyle='dark-content'
                    backgroundColor='transparent'

                />

                <View style={{flex: 1, justifyContent: 'center', margin: 20}}>
                    <View style={{marginBottom: 20}}>
                        <Button
                            title='Show Default Loader'
                            onPress={() => this.showLoader(this.defaultLoader)}
                        />
                    </View>
                    <View>
                        <Button
                            title='Show Custom Loader'
                            onPress={() => this.showLoader(this.customLoader)}
                        />
                    </View>
                </View>

                <Loader
                    ref={ref => this.defaultLoader = ref}
                />
                <Loader
                    ref={ref => this.customLoader = ref}
                    size='large'
                    color='yellow'
                    overlayColor='rgba(255, 0, 0, 0.3)'
                    showDuration={300}
                    hideDuration={400}
                />
            </View>
        );
    }
}

export default App;
```
