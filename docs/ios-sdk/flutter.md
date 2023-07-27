---
hide_table_of_contents: true
---

# Flutter

:::note
Latest GlobalPass iOS SDK version: **1.9**
:::

## 1. Manual installation step-by-step

:::tip
You can follow the manual installation steps below or use CocoaPods to install dependencies. For the latter, see [CocoaPods installation step-by-step](#2-cocoapods-installation-step-by-step).
:::

### a. Clone the repository

[https://isun-ag@dev.azure.com/isun-ag/GlobalPassApp-Public/\_git/GlobalPassApp-sdk-ios-binaries](https://isun-ag@dev.azure.com/isun-ag/GlobalPassApp-Public/_git/GlobalPassApp-sdk-ios-binaries)

> The cloned repository contains `GlobalPass.xcframework` folder which should be copied to **Flutter** project's `ios` folder.

### b. Open Terminal on Flutter project and run the following command:

```bash
$ flutter pub get
```

### c. Change current Terminal folder to `ios` by running the following command:

```bash
$ cd ios
```

### d. Then run the following commands:

```bash
$ pod init
$ pod install
```

:::note
Make sure that you have Podfile file on your `ios` folder.
:::

### e. Open Flutter project's iOS `.xcworkspace` file

### f. Select context menu on `Frameworks` folder and select `Add files to …`

### g. Choose the `GlobalPass.xcframework` folder and click `Add`

### h. You can now build the project

## 2. CocoaPods installation step-by-step

### a. Edit Podfile

Add plugin to the beginning of Podfile:

```ruby
plugin 'cocoapods-azure-universal-packages', {
  :organization => 'https://dev.azure.com/isun-ag'
}
```

Provide `source` urls:

```ruby
source 'https://cdn.cocoapods.org'
source 'https://dev.azure.com/isun-ag/GlobalPassApp-Public/_git/GlobalPassApp-sdk-ios-private-specs'
```

and required dependencies:

```ruby
pod 'GlobalPass', '~> 1.9'
pod 'FaceTecSDK', :http => 'https://dev.azure.com/isun-ag/368936e7-5cb5-4092-96c5-fe9942e2c3e1/_apis/packaging/feeds/FaceTecSDK/upack/packages/facetecsdk/versions/0.0.2'
```

### b. Install Cocoa Pods in Terminal

Run the following commands:

```bash
$ brew update && brew install azure-cli
```

```bash
$ az devops login
```

:::info
When asked for credentials, put the **repository access token** you were provided by GlobalPass.
:::

```bash
$ gem install cocoapods-azure-universal-packages
```

```bash
$ pod install
```

## Project setup

### Paste these lines to it `Info.plist`

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

## iOS side

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

To specify the required SDK display language, provide the `localeIdentifier` parameter with a string value containing the locale identifier in the function call:

```swift
let callback = try? GlobalPassSDK.setupScreening(environment: isDev ? .dev : .prod, screeningToken: token, localeIdentifier: "en")
if let globalPassController = GlobalPassSDK.startSplitScreening(type: isAddress ? .address : .identity, externalID: externalID) {
    globalPassController.modalPresentationStyle = .overFullScreen
    controller.present(globalPassController, animated: true)
    result(true)
}
```
Available locales:
- English (`en`)
- German (`de`)
- Russian (`ru`)
- Chinese Simplified (`zh-CN`)
- Lithuanian (`lt`)

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