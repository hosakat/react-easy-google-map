# react-easy-google-map

An easy-to-use React component for Google Maps that simplifies the process of displaying advanced markers and info windows. This library wraps `@vis.gl/react-google-maps` to provide a clean and straightforward API.

## Features

- **Simple API**: Easily render a center marker and multiple data pins without boilerplate.
- **Built-in Info Windows**: Click a marker to automatically show an InfoWindow with custom header and body content.
- **Customizable Pins**: Quickly change colors, sizes, and borders of your map pins.
- **TypeScript Support**: Fully typed for an excellent developer experience.

## Installation

```bash
npm install react-easy-google-map @vis.gl/react-google-maps
```

*Note: `react` and `react-dom` are required peer dependencies.*

## Usage

```tsx
import React from 'react';
import { GoogleMap } from 'react-easy-google-map';

const App = () => {
  const centerMarker = {
    position: { lat: 35.681236, lng: 139.767125 }, // Tokyo Station
    pinStyle: { backgroundColor: '#4285F4', scale: 1.5 }
  };

  const data = [
    {
      id: '1',
      position: { lat: 35.681236, lng: 139.767125 },
      info: {
        headerContent: <h3>Tokyo Station</h3>,
        bodyContent: <p>Central hub of Tokyo.</p>
      }
    },
    {
      id: '2',
      position: { lat: 35.68944, lng: 139.69167 }, // Shinjuku
      info: {
        headerContent: <h3>Shinjuku</h3>,
        bodyContent: <p>Bustling commercial center.</p>
      },
      pinStyle: { backgroundColor: '#ea4335' }
    }
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        apiKey="YOUR_GOOGLE_MAPS_API_KEY"
        mapId="YOUR_MAP_ID"
        centerMarker={centerMarker}
        data={data}
        mapProps={{
          style: { width: '100%', height: '100%' },
          defaultZoom: 13
        }}
      />
    </div>
  );
};

export default App;
```

## API Reference

### `GoogleMap` Props

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | Yes | Your Google Maps API Key. |
| `mapId` | `string` | Yes | Your Google Maps Map ID (required for Advanced Markers). |
| `data` | `MapData<T>[]` | Yes | Array of data objects for markers and info windows. |
| `centerMarker` | `PinContent` | Yes | Configuration for the main/center marker. |
| `mapProps` | `Omit<MapProps, ...>` | No | Overrides for the underlying `@vis.gl/react-google-maps` `<Map>` component. |
| `infoWindowProps`| `Omit<InfoWindowProps, ...>` | No | Overrides for the `@vis.gl/react-google-maps` `<InfoWindow>` component. |

### Data Types

#### `PinContent`
Configuration for a single pin (marker).

| Property | Type | Description |
| :--- | :--- | :--- |
| `position` | `{ lat: number, lng: number }` | The geographic location of the marker. |
| `pinStyle` | `object` (Optional) | Visual style of the pin (see below). |
| `advancedMarkerProps` | `object` (Optional) | Direct props for the underlying `<AdvancedMarker>`. |

#### `pinStyle`
Visual customization for the `<Pin>`.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `backgroundColor` | `string` | `#ea4335` | Background color of the pin. |
| `borderColor` | `string` | - | Border color of the pin. |
| `glyphColor` | `string` | - | Color of the glyph (dot) inside the pin. |
| `scale` | `number` | `1` | Scale of the pin size. |

#### `MapData<T>`
An item in the `data` array. It combines your custom data `T` with pin and info window configurations.

| Property | Type | Description |
| :--- | :--- | :--- |
| `position` | `{ lat: number, lng: number }` | Location of this data pin. |
| `info` | `InfoWindowContent` | Content to display in the InfoWindow when clicked. |
| `pinStyle` | `object` (Optional) | Visual style specific to this pin. |
| `...customData` | `T` | Any additional properties you want to associate with this marker. |

#### `InfoWindowContent`
Content for the InfoWindow.

| Property | Type | Description |
| :--- | :--- | :--- |
| `headerContent` | `string \| React.ReactNode` | Title or header section of the InfoWindow. |
| `bodyContent` | `string \| React.ReactNode` | Main content or body of the InfoWindow. |

## License

MIT
