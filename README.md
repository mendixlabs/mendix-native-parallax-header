[![Apache License](https://img.shields.io/badge/license-Apache%202.0-orange.svg)](http://www.apache.org/licenses/LICENSE-2.0)
![GitHub release](https://img.shields.io/github/release/JelteMX/mendix-native-parallax-header)
![GitHub issues](https://img.shields.io/github/issues/JelteMX/mendix-native-parallax-header)

# Parallax Header

![logo](/assets/AppStoreIcon.png)

Add a Parallax Header to your Native Mendix app.

![preview](/assets/screenshot.png)

## Features

- Set min- & max-height of your parallax header
- Set background color in your styling (see Styling)
- Automatically have the header shown/hidden

## Styling

Please add the following to your Native styling to override any styling:

```js
export const mendix_parallaxheader_ParallaxHeader = {
    header : {
        backgroundColor: "Color or header in hex, e.g. #F00",
        minHeight: 50, // Min height
        maxHeight: 200 // Max Height
    }
}
```

## Issues, suggestions and feature requests

Please report your issues [here](https://github.com/JelteMX/mendix-native-parallax-header/issues)

## License

Apache 2
