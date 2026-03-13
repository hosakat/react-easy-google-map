import {
  AdvancedMarker,
  AdvancedMarkerProps,
  APIProvider,
  InfoWindow,
  InfoWindowProps,
  Map,
  MapProps,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export type PinContent = {
  position: {
    lat: number;
    lng: number;
  };
  pinStyle?: {
    backgroundColor?: string;
    borderColor?: string;
    glyphColor?: string;
    scale?: number;
  };
  advancedMarkerProps?: Omit<AdvancedMarkerProps, 'children' | 'position' | 'onClick'>;
};

export type InfoWindowContent = {
  headerContent?: string | React.ReactNode;
  bodyContent?: string | React.ReactNode;
};

export type MapData<T> = (T & PinContent & { info: InfoWindowContent })[];

export type GoogleMapProps<T> = {
  apiKey: string;
  mapId: string;
  data: MapData<T>;
  centerMarker: PinContent;
  mapProps?: Omit<MapProps, 'children' | 'defaultCenter' | 'mapId'>;
  infoWindowProps?: Omit<InfoWindowProps, 'anchor' | 'onCloseClick' | 'headerContent' | 'children'>;
};

function MapMarker<T>({
  pin,
  isSelected,
  onSelect,
  onClose,
  infoWindowProps,
}: {
  pin: T & PinContent & { info: InfoWindowContent };
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
  infoWindowProps?: GoogleMapProps<T>['infoWindowProps'];
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      position={{ lat: pin.position.lat, lng: pin.position.lng }}
      ref={markerRef}
      onClick={onSelect}
      {...pin.advancedMarkerProps}
    >
      {isSelected && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onClose}
          headerContent={pin.info.headerContent}
          {...infoWindowProps}
        >
          {pin.info.bodyContent}
        </InfoWindow>
      )}
      <Pin
        background={pin.pinStyle?.backgroundColor || '#ea4335'}
        borderColor={pin.pinStyle?.borderColor}
        glyphColor={pin.pinStyle?.glyphColor}
        scale={pin.pinStyle?.scale || 1}
      />
    </AdvancedMarker>
  );
}

export default function GoogleMap<T>({
  apiKey,
  mapId,
  data,
  centerMarker,
  mapProps,
  infoWindowProps,
}: GoogleMapProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Default style and zoom (can be overridden via mapProps)
  const defaultStyle = { width: '100%', height: '400px' };
  const style = mapProps?.style || defaultStyle;
  const defaultZoom = mapProps?.defaultZoom || 15;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={style}
        defaultZoom={defaultZoom}
        defaultCenter={{
          lat: centerMarker.position.lat,
          lng: centerMarker.position.lng,
        }}
        mapId={mapId}
        {...mapProps}
      >
        {/* Central Marker */}
        <AdvancedMarker
          key="center-marker"
          position={{
            lat: centerMarker.position.lat,
            lng: centerMarker.position.lng,
          }}
          {...centerMarker.advancedMarkerProps}
        >
          <Pin
            background={centerMarker.pinStyle?.backgroundColor}
            borderColor={centerMarker.pinStyle?.borderColor}
            glyphColor={centerMarker.pinStyle?.glyphColor}
            scale={centerMarker.pinStyle?.scale || 1.5}
          />
        </AdvancedMarker>
        {data.map((pin, index) => (
          <MapMarker
            key={`marker-${pin.advancedMarkerProps?.title ?? index}`}
            pin={pin}
            isSelected={selectedIndex === index}
            onSelect={() => setSelectedIndex(index)}
            onClose={() => setSelectedIndex(null)}
            infoWindowProps={infoWindowProps}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
