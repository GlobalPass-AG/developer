---
hide_table_of_contents: true
---

# Flutter

:::note
Latest GlobalPass iOS SDK version: **2.0**
:::

## CocoaPods installation

### Configure Podfile

In order to download `FaceTec` dependency, provide `cocoapods-azure-universal-packages` configuration at the beginning of your Podfile as described below:

```ruby
plugin 'cocoapods-azure-universal-packages', {
  :organization => 'https://dev.azure.com/isun-ag'
}
```

Declare `source` URLs so Cocoapods be able to download dependencies podspec files.

```ruby
source 'https://cdn.cocoapods.org'
source 'https://dev.azure.com/isun-ag/GlobalPassApp-Public/_git/GlobalPassApp-sdk-ios-private-specs'
```

Under the application module declare the following dependencies:

```ruby
pod 'GlobalPass', '~> 2.0'
pod 'FaceTecSDK', :http => 'https://dev.azure.com/isun-ag/368936e7-5cb5-4092-96c5-fe9942e2c3e1/_apis/packaging/feeds/FaceTecSDK/upack/packages/facetecsdk/versions/0.0.3'
pod `lottie-ios`, `~> 4.3.4`
```

To the end of application module declaration add these lines to configure build process:

```ruby
  post_install do |installer|
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      end
    end
  end
```

### Login into azure cli

To properly download FaceTec dependency, we need to configure `azure-cli`.
First step is downloading the utility:

```bash
$ brew update && brew install azure-cli
```
After that, run login command:

```bash
$ az devops login
```

:::info
When asked for credentials, put the **repository access token** you were provided by GlobalPass.
:::

Once authorization succeedes, install cocoapods azure plugin with the following command:

```bash
$ gem install cocoapods-azure-universal-packages
```

In the end, generate your project again with pods:

```bash
$ pod install
```

## Project setup

### `Info.plist` configuration

GlobalPass SDK makes the use of location, NFC and camera capabilities when they are requested. To properly ask the user about access to these features, add the following keys into your project's `Info.plist` file:

```xml title="Info.plist"
<key>NFCReaderUsageDescription</key>
<string>Provide you description here</string>
<key>NSCameraUsageDescription</key>
<string>Provide you description here</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Provide you description here</string>
<key>com.apple.developer.nfc.readersession.iso7816.select-identifiers</key>
<array>
<string>A0000002471001</string>
<string>A0000002472001</string>
<string>00000000000000</string>
</array>
```

:::caution important
Please change the descriptions under `NFCReaderUsageDescription`, `NSCameraUsageDescription` and `NSLocationWhenInUseUsageDescription` in the file above. This is important to pass **App Store** review process for your application.
:::

## Usage

```swift
import UIKit
import Flutter
import GlobalPass

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {

      let controller = (window?.rootViewController as! FlutterViewController)
      let methodChannel =
      FlutterMethodChannel(name: "global_pass_plugin/kyc_channel", binaryMessenger: controller.binaryMessenger)
      methodChannel
          .setMethodCallHandler { (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
              let arg = call.arguments as? Dictionary<String, Any>
              let token: String = arg?["token"] as? String ?? " "
              let isDev: Bool = arg?["isDev"] as? Bool ?? true
              let externalID: String? = arg?["externalID"] as? String
              let isAddress: Bool = arg?["splitFlowTypeAddress"] as? Bool ?? true

              switch call.method {
                  case "startKyc":
                      let callback = try? GlobalPassSDK.setupScreening(environment: isDev ? .dev : .prod, screeningToken: token)
                      if let globalPassController = GlobalPassSDK.startScreening(externalID: externalID) {
                          globalPassController.modalPresentationStyle = .overFullScreen
                          controller.present(globalPassController, animated: true)
                          result(true)
                      }
                  case "startBiometrics":
                      let callback = try? GlobalPassSDK.setupInstant(environment: isDev ? .dev : .prod, instantBiometricsId: token)
                      if let globalPassController = GlobalPassSDK.startInstant() {
                          globalPassController.modalPresentationStyle = .overFullScreen
                          controller.present(globalPassController, animated: true)
                          result(true)
                      }
                  case "splitScreening":
                      let callback = try? GlobalPassSDK.setupScreening(environment: isDev ? .dev : .prod, screeningToken: token)
                      if let globalPassController = GlobalPassSDK.startSplitScreening(type: isAddress ? .address : .identity, externalID: externalID) {
                          globalPassController.modalPresentationStyle = .overFullScreen
                          controller.present(globalPassController, animated: true)
                          result(true)
                      }
                  default:
                      result(FlutterMethodNotImplemented)
              }
          }
      GeneratedPluginRegistrant.register(with: self)
      return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

## Flutter side

```dart title="KycPlatformInterface"
abstract class KycPlatformInterface {
  KycPlatformInterface();

  @visibleForTesting
  static const MethodChannel methodChannel =
      MethodChannel('global_pass_plugin/kyc_channel');

  MethodChannel get channel => methodChannel;

  Future<void> startKyc({
    required String token,
    required bool isDev,
  }) {
    throw UnimplementedError('startKyc() has not been implemented.');
  }

  Future<void> startSplitKyc({
    required String token,
    required bool isDev,
    required bool isAddress
  }) {
    throw UnimplementedError('startSplitKyc() has not been implemented.');
  }

  Future<void> startBiometrics({
    required String token,
    required bool isDev,
  }) {
    throw UnimplementedError('startBiometrics() has not been implemented.');
  }
}
```

```dart title="KycPlatformImpl"
class KycPlatformImpl extends KycPlatformInterface {
  @override
  Future<void> startKyc({
    required String token,
    required bool isDev,
  }) async {
    await channel.invokeMethod<bool>(
      'startKyc',
      <String, dynamic>{
        'token': token,
        'isDev': isDev,
      },
    );
  }

  @override
  Future<void> startSplitKyc({
    required String token,
    required bool isDev,
    required bool isAddress
  }) async {
    await channel.invokeMethod<bool>(
      'startKyc',
      <String, dynamic>{
        'token': token,
        'isDev': isDev,
        'isAddress': isAddress
      },
    );
  }

  @override
  Future<void> startBiometrics({
    required String token,
    required bool isDev,
  }) async {
    await channel.invokeMethod<bool>(
      'startBiometrics',
      <String, dynamic>{
        'token': token,
        'isDev': isDev,
      },
    );
  }
}
```

Now you can call the `startKyc`, `startBiometrics` or `startSplitKyc` methods for further work.

```dart
      case States.readyToKYC:
        switch (isDevEnvironment) {
          case true:
            appLocator
                .get<KycPlatformInterface>()
                .startKyc(
                  token: screeningToken ?? '',
                  isDev: isDevEnvironment,
                )
                .then((
              response,
            ) {
              resetAll();
            }).catchError((error) {});
            break;
          case false:
            appLocator
                .get<KycPlatformInterface>()
                .startKyc(
                  token: screeningToken ?? '',
                  isDev: !isDevEnvironment,
                )
                .then((response) {
              resetAll();
            }).catchError((error) {});
            break;
        }
        break;
      case States.readyToSplitKYC:
        switch (isDevEnvironment) {
          case true:
            appLocator
                .get<KycPlatformInterface>()
                .startSplitKyc(
                  token: screeningToken ?? '',
                  isDev: isDevEnvironment,
                  isAddress: isAddress,
                )
                .then((
              response,
            ) {
              resetAll();
            }).catchError((error) {});
            break;
          case false:
            appLocator
                .get<KycPlatformInterface>()
                .startSplitKyc(
                  token: screeningToken ?? '',
                  isDev: !isDevEnvironment,
                  isAddress: isAddress,
                )
                .then((response) {
              resetAll();
            }).catchError((error) {});
            break;
        }
        break;
      case States.readyToIB:
        switch (isDevEnvironment) {
          case true:
            appLocator
                .get<KycPlatformInterface>()
                .startBiometrics(
                  token: biometricsId ?? '',
                  isDev: isDevEnvironment,
                )
                .then((response) {
              resetAll();
            }).catchError((error) {});
            break;
          case false:
            appLocator
                .get<KycPlatformInterface>()
                .startBiometrics(
                  token: biometricsId ?? '',
                  isDev: !isDevEnvironment,
                )
                .then((response) {
              resetAll();
            }).catchError((error) {});
            break;
        }
        break;
```

## Localisation

To specify the required localisation, provide the `localeIdentifier` parameter with a string value containing the locale identifier in the function call:

```swift
let callback = try? GlobalPassSDK.setupScreening(environment: isDev ? .dev : .prod, screeningToken: token, localeIdentifier: "en")
if let globalPassController = GlobalPassSDK.startSplitScreening(type: isAddress ? .address : .identity, externalID: externalID) {
    globalPassController.modalPresentationStyle = .overFullScreen
    controller.present(globalPassController, animated: true)
    result(true)
}
```

Available locales:

- `en` - English
- `de` - German
- `es-MX` - Spanish
- `it` - Italian
- `lt` - Lithuanian
- `pt-BR` - Portuguese
- `ru` - Russian
- `ar` - Arabic
- `zh-CN` - Chinese Simplified

:::note
If an unsupported locale will be provided, the SDK will fallback to English.
:::

`localeIdentifier` parameter is defined for static builders. Use the method without this parameter to use the default English localisation.

```swift
GlobalPassSDK.setupScreening(environment:screeningToken:) // Default English
GlobalPassSDK.setupScreening(environment:screeningToken:localeIdentifier:) // Provided Localisation
GlobalPassSDK.setupInstant(environment:instantBiometricsId:) // Default English
GlobalPassSDK.setupInstant(environment:instantBiometricsId:localeIdentifier:) // Provided Localisation
```

## Customisation

SDK provides `GPFontConfiguration` type, specifically designed to facilitate the customization of font styles. This configuration allows you to define the `regular` and `semibold` font styles. Other configuration aspects such as colors and component sizes are dynamically configured by the backend.

```swift
try? GlobalPassSDK.setupScreening(
    environment: .dev,
    screeningToken: "...",
    fontConfiguration: GPFontConfiguration(
        regular: .systemFont(ofSize: 1.0, weight: .regular),
        semibold: .systemFont(ofSize: 1.0, weight: .semibold)
    )
)
```

## Privacy

The GlobalPass SDK collects sensitive user data, including location and personal details, to support KYC processes. This data is exclusively used within the SDK and is not shared with any third parties. To align with Apple's privacy standards, the SDK includes a [privacy manifest file](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files) detailing all types of data collected.

## Security

Starting from version 2.0, the GlobalPass SDK bundle incorporates a [code signature](https://developer.apple.com/documentation/xcode/verifying-the-origin-of-your-xcframeworks), endorsed by the Apple Developer Program.
