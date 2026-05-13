jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock('@rnmapbox/maps', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MapView = ({ testID = 'ride-map-view', ...props }) =>
    React.createElement(View, { testID, ...props });

  const Mapbox = Object.assign(MapView, {
    setAccessToken: jest.fn(),
  });

  return {
    __esModule: true,
    default: Mapbox,
    MapView,
    StyleURL: { Street: 'mapbox://styles/mapbox/streets-v11' },
    UserLocation: () => null,
    Camera: () => null,
    PointAnnotation: () => null,
    ShapeSource: () => null,
    LineLayer: () => null,
    setAccessToken: jest.fn(),
  };
});

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { ScrollView, View } = require('react-native');

  const BottomSheet = ({ children, ...rest }) =>
    React.createElement(View, { ...rest }, children);

  const BottomSheetView = ({ children, ...rest }) =>
    React.createElement(View, { testID: 'ride-bottom-sheet-view', ...rest }, children);

  const BottomSheetScrollView = ({ children, ...rest }) =>
    React.createElement(ScrollView, { testID: 'ride-bottom-sheet-scroll-view', ...rest }, children);

  return {
    __esModule: true,
    default: BottomSheet,
    BottomSheetScrollView,
    BottomSheetView,
  };
});
