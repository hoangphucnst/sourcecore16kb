import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>App</Text>
      <Ionicons name="home" size={20} />
    </SafeAreaView>
  );
};

export default App;
