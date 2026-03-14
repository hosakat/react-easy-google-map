# react-easy-google-map

Google Mapにおけるマーカー（Advanced Markers）と情報ウィンドウ（InfoWindow）を簡単に表示できるReact用Googleマップコンポーネントです。`@vis.gl/react-google-maps` をラップし、中心ピンと複数のデータピンを少ないコードで実装できるシンプルなAPIを提供します。

## 特徴

- **シンプルなAPI**: 中心マーカーと複数のデータピンを配列で渡すだけで簡単に描画できます。
- **情報ウィンドウの組み込み**: マーカーをクリックすると、自動的に情報ウィンドウ（タイトルと本文）が表示されます。
- **ピンのカスタマイズ**: 色やサイズを簡単に変更できます。
- **TypeScript対応**: 開発体験を向上させるための型定義を完備しています。

## インストール

```bash
npm install react-easy-google-map @vis.gl/react-google-maps
```

※ `react` および `react-dom` がピア依存関係として必要です。

## 使い方

```tsx
import React from 'react';
import { GoogleMap } from 'react-easy-google-map';

const App = () => {
  const centerMarker = {
    position: { lat: 35.681236, lng: 139.767125 }, // 東京駅
    pinStyle: { backgroundColor: '#4285F4', scale: 1.5 },
  };

  const data = [
    {
      id: '1',
      position: { lat: 35.681236, lng: 139.767125 },
      info: {
        headerContent: <h3>東京駅</h3>,
        bodyContent: <p>日本の鉄道網の中心となる駅です。</p>,
      },
    },
    {
      id: '2',
      position: { lat: 35.68944, lng: 139.69167 }, // 新宿
      info: {
        headerContent: <h3>新宿</h3>,
        bodyContent: <p>日本最大の繁華街の一つです。</p>,
      },
      pinStyle: { backgroundColor: '#ea4335' },
    },
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
          defaultZoom: 13,
        }}
      />
    </div>
  );
};

export default App;
```

## APIリファレンス

### `GoogleMap` Props

| プロパティ        | 型                           | 必須   | 説明                                                                                                                                                    |
| :---------------- | :--------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`          | `string`                     | はい   | Google Maps APIキー。                                                                                                                                   |
| `mapId`           | `string`                     | はい   | Google Maps Map ID（高度なマーカーを表示するために必要です）。                                                                                          |
| `data`            | `MapData<T>[]`               | はい   | 各ピンと情報ウィンドウのデータを含む配列。                                                                                                              |
| `centerMarker`    | `PinContent`                 | はい   | 中心のマーカーの設定。                                                                                                                                  |
| `mapProps`        | `Omit<MapProps, ...>`        | いいえ | 内部の `@vis.gl/react-google-maps` の `<Map>` コンポーネントに渡す追加プロパティ。                                                                      |
| `infoWindowProps` | `Omit<InfoWindowProps, ...>` | いいえ | 内部の [`<InfoWindow>`](https://visgl.github.io/react-google-maps/docs/api-reference/components/info-window#props) コンポーネントに渡す追加プロパティ。 |

### データ型定義

#### `PinContent`

単一のピン（マーカー）の設定。

| プロパティ            | 型                             | 説明                                                                                                                                                  |
| :-------------------- | :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`            | `{ lat: number, lng: number }` | マーカーの緯度・経度。                                                                                                                                |
| `pinStyle`            | `object` (任意)                | ピンの外観スタイル（下記参照）。                                                                                                                      |
| `advancedMarkerProps` | `object` (任意)                | 内部の [`<AdvancedMarker>`](https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker#props) に直接渡されるプロパティ。 |

#### `pinStyle`

ピン（`<Pin>`）の外観カスタマイズ。

| プロパティ        | 型       | デフォルト値 | 説明                   |
| :---------------- | :------- | :----------- | :--------------------- |
| `backgroundColor` | `string` | `#ea4335`    | ピンの背景色。         |
| `borderColor`     | `string` | -            | ピンの枠線の色。       |
| `glyphColor`      | `string` | -            | ピン内部のドットの色。 |
| `scale`           | `number` | `1`          | ピンのサイズ倍率。     |

#### `MapData<T>`

`data` 配列の各要素。カスタムデータ `T` にピンと情報ウィンドウの設定を組み合わせた型です。

| プロパティ      | 型                             | 説明                                         |
| :-------------- | :----------------------------- | :------------------------------------------- |
| `position`      | `{ lat: number, lng: number }` | このピンの場所。                             |
| `info`          | `InfoWindowContent`            | クリック時に表示される情報ウィンドウの内容。 |
| `pinStyle`      | `object` (任意)                | このピン固有の外観スタイル。                 |
| `...customData` | `T`                            | マーカーに関連付けたい任意の追加データ。     |

#### `InfoWindowContent`

情報ウィンドウの内容。

| プロパティ      | 型                          | 説明                                       |
| :-------------- | :-------------------------- | :----------------------------------------- |
| `headerContent` | `string \| React.ReactNode` | 情報ウィンドウのヘッダー（タイトル）部分。 |
| `bodyContent`   | `string \| React.ReactNode` | 情報ウィンドウのメインコンテンツ部分。     |

## ライセンス

MIT
