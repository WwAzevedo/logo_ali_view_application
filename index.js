import { registerRootComponent } from 'expo';

import logonPageView from './src/views/screens/logonPageView';
import bookingsPageView from './src/views/screens/bookingsPageView';
import createCarPageView from './src/views/screens/createCarPageView';
import createTripPageView from './src/views/screens/createTripPageView';
import createReviewPageView from './src/views/screens/createTripPageView';
import homeScreenPageView from './src/views/screens/homeScreenPageView';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(homeScreenPageView);
//registerRootComponent(bookingsPageView);
//registerRootComponent(createCarPageView);
//registerRootComponent(createTripPageView);
//registerRootComponent(createReviewPageView);