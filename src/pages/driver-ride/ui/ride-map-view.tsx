import Mapbox, { Camera, LineLayer, MapView, PointAnnotation, ShapeSource, StyleURL } from '@rnmapbox/maps';
import Constants from 'expo-constants';
import * as React from 'react';
import { View } from 'react-native';

import type { RideRouteContext, RideWaypoint } from '../model/ride-view-types';

type RideMapViewProps = {
  route: RideRouteContext;
  testID?: string;
};

type LineStringFeature = {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
};

function RouteEndpointPin({
  accessibilityLabel,
  fillClassName,
}: {
  accessibilityLabel: string;
  fillClassName: string;
}) {
  return (
    <View accessibilityLabel={accessibilityLabel} className="items-center justify-center pb-0.5">
      <View className={`h-6 w-6 rounded-full border-2 border-background shadow-sm ${fillClassName}`} />
    </View>
  );
}

function lineFeature(waypoints: RideWaypoint[]): LineStringFeature | null {
  if (waypoints.length < 2) {
    return null;
  }

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: waypoints.map((w) => w.coordinate),
    },
  };
}

export function RideMapView({ route, testID = 'ride-map-view' }: RideMapViewProps) {
  const token =
    (Constants.expoConfig?.extra as { mapboxAccessToken?: string } | undefined)?.mapboxAccessToken ??
    process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

  React.useEffect(() => {
    if (!token) {
      return;
    }
    void Mapbox.setAccessToken(token);
  }, [token]);

  const waypoints = React.useMemo(() => {
    const ordered: RideWaypoint[] = [];
    if (route.pickupWaypoint) {
      ordered.push(route.pickupWaypoint);
    }
    if (route.dropoffWaypoint) {
      ordered.push(route.dropoffWaypoint);
    }
    return ordered;
  }, [route.dropoffWaypoint, route.pickupWaypoint]);

  const centerCoordinate = React.useMemo(() => {
    if (route.dropoffWaypoint) {
      return route.dropoffWaypoint.coordinate;
    }
    if (route.pickupWaypoint) {
      return route.pickupWaypoint.coordinate;
    }
    return [-111.97, 33.45] as [number, number];
  }, [route.dropoffWaypoint, route.pickupWaypoint]);

  const routeLine = React.useMemo(() => {
    if (route.polyline) {
      return null;
    }
    return lineFeature(waypoints);
  }, [route.polyline, waypoints]);

  return (
    <View className="flex-1">
      <MapView
        attributionEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        style={{ flex: 1 }}
        styleURL={StyleURL.Street}
        testID={testID}>
        <Camera animationDuration={0} centerCoordinate={centerCoordinate} zoomLevel={12} />
        {routeLine ? (
          <ShapeSource id="ride-route-line" shape={routeLine}>
            <LineLayer
              id="ride-route-line-layer"
              style={{
                lineColor: '#2563eb',
                lineWidth: 4,
                lineOpacity: 0.9,
              }}
            />
          </ShapeSource>
        ) : null}
        {route.pickupWaypoint ? (
          <PointAnnotation
            anchor={{ x: 0.5, y: 1 }}
            coordinate={route.pickupWaypoint.coordinate}
            id="ride-route-pin-start"
            title="Pickup">
            <RouteEndpointPin accessibilityLabel="Route start, pickup" fillClassName="bg-primary" />
          </PointAnnotation>
        ) : null}
        {route.dropoffWaypoint ? (
          <PointAnnotation
            anchor={{ x: 0.5, y: 1 }}
            coordinate={route.dropoffWaypoint.coordinate}
            id="ride-route-pin-end"
            title="Drop-off">
            <RouteEndpointPin accessibilityLabel="Route end, drop-off" fillClassName="bg-destructive" />
          </PointAnnotation>
        ) : null}
      </MapView>
    </View>
  );
}
