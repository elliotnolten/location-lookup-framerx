# Location Lookup
Use this component if you need to look up a location (Duch locations only). Look for cities, postal codes and street names including house numbers.

There are few things to customize.

|Property|Type|Default value|
|--------|----|-------|
|Initial value|String|"Amsterdam"|
|Placeholder|String|"Zoek op plaats, buurt, adres, etc."|
|Max amount|Number|5|
|Font Size|Number|16|
|Input padding|Fused|16px 16px 16px 56px|
|Border radius|Number|4|
|Search color|Color|#333|
|Background color|Color|#FFF|
|Result color|Color|#333|
|Select color|Color|#1199EE|
|Select background|Color|rgba(0,0,0,0.5|

This package uses open source data from [PDOK](https://mijn.pdok.nl/nl/producten/pdok-locatieserver) (Publieke Dienstverlening Op de Kaart). Which is an initiative of several Dutch ministries and aims to make Dutch geodata publicly available.

## Changelog
### v1.2.0
* Added keyboard navigation to go through results.
* Added Value and Placeholder to custom properties.
* You can set a custom maximum amount of results.
### v1.3.0
* Improved keyboard navigation. Going through the results with your arrow keys now updates the value in the search field.