---
hide_table_of_contents: true
---

# React Native

:::note SDK Version
Latest GlobalPass iOS SDK version: **2.4**
:::

:::info Requirements
- iOS 13+
- Xcode 15.1+
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
pod 'GlobalPass', '~> 2.4'
pod 'FaceTecSDK', :http => 'https://dev.azure.com/isun-ag/368936e7-5cb5-4092-96c5-fe9942e2c3e1/_apis/packaging/feeds/FaceTecSDK/upack/packages/facetecsdk/versions/0.0.6'
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

Once authorization succeeds, install cocoapods azure plugin with the following command:

```bash
$ gem install cocoapods-azure-universal-packages
```

In the end, generate your project again with pods:

```bash
$ pod install
```

#### Troubleshooting

If you are having problems with the pod cache, please follow this [answer](https://stackoverflow.com/questions/46428752/how-to-clear-or-clean-specific-pod-from-the-local-cocoapods-cache). If you link the GlobalPass framework to the application target manually, please make sure that you link the framework again after upgrading the SDK version.

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

### Objective-C wrappers

Methods above are represented in Objective-C by following signatures:

```objectivec
RCT_EXPORT_METHOD(buildKYCDev:(NSString *)screeningToken
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;

  VoidClosure callback = [GlobalPassSDK setupScreeningWithEnvironment:GlobalPassEnvironmentDev
                                                       screeningToken:screeningToken
                                                                error:&error];

  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startScreening];

    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};

RCT_EXPORT_METHOD(buildKYCProd:(NSString *)screeningToken
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  VoidClosure callback = [GlobalPassSDK setupScreeningWithEnvironment:GlobalPassEnvironmentProd
                                                       screeningToken:screeningToken
                                                                error:&error];

  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startScreening];
    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};

RCT_EXPORT_METHOD(buildIBDev:(NSString *)instantBiometricsID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCchTPromiseRejectBlock)reject) {
  NSError *error;
  VoidClosure callback = [GlobalPassSDK setupInstantWithEnvironment:GlobalPassEnvironmentDev
                                                instantBiometricsId:instantBiometricsID
                                                              error:&error];

  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startInstant];
    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};

RCT_EXPORT_METHOD(buildIBProd:(NSString *)instantBiometricsID
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  VoidClosure callback = [GlobalPassSDK setupInstantWithEnvironment:GlobalPassEnvironmentProd
                                                instantBiometricsId:instantBiometricsID
                                                              error:&error];

  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startInstant];
    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};

RCT_EXPORT_METHOD(buildSplitKYCDev:(NSString *)screeningToken
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;

  VoidClosure callback = [GlobalPassSDK setupScreeningWithEnvironment:GlobalPassEnvironmentDev
                                                       screeningToken:screeningToken
                                                                error:&error];

  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startSplitScreeningWithType:GPSplitFlowAddress externalID:nil];

    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};

RCT_EXPORT_METHOD(buildSplitKYCProd:(NSString *)screeningToken
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  VoidClosure callback = [GlobalPassSDK setupScreeningWithEnvironment:GlobalPassEnvironmentProd
                                                       screeningToken:screeningToken
                                                                error:&error];

  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startSplitScreeningWithType:GPSplitFlowAddress externalID:nil];
    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};
```

Each of the calls to `GlobalPassSDK` facade that starts with `start` returns an instance of `UIViewController` that should be presented over a root view controller of a window.

Call to methods that start with `setup` returns an empty closure that should be called at the end of GlobalPass flow in order to clean up all the resources and indicate a finish.

Pass `externalID` to associate custom string with the KYC session.

## Localisation

To specify the required localisation, provide the `localeIdentifier` parameter with a string value containing the locale identifier in the function call:

```objectivec
RCT_EXPORT_METHOD(buildSplitKYCProd:(NSString *)screeningToken
                   localeIdentifier:(NSString *)locale
                           resolver:(RCTPromiseResolveBlock)resolve
                           rejecter:(RCTPromiseRejectBlock)reject) {
  NSError *error;
  VoidClosure callback = [GlobalPassSDK setupScreeningWithEnvironment:GlobalPassEnvironmentProd
                                                       screeningToken:screeningToken
                                                     localeIdentifier:locale
                                                                error:&error];
  if (error != nil) {
    reject(@"0", @"GlobalPass", error);
    return;
  }

  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [GlobalPassSDK startSplitScreeningWithType:GPSplitFlowAddress externalID:nil];
    controller.modalPresentationStyle = UIModalPresentationOverFullScreen;
    [[[[[UIApplication sharedApplication] delegate] window] rootViewController] presentViewController:controller animated:YES completion:^{

    }];
  });
};
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


The localeIdentifier parameter is defined for static constructors and initializers. Use the method without this parameter to use the default English locale.

```objectivec
// Builders

setupInstantWithEnvironment:instantBiometricsId:error: // Default English
setupInstantWithEnvironment:instantBiometricsId:localeIdentifier:error: // Provided Localisation
setupScreeningWithEnvironment:screeningToken:error: // Default English
setupScreeningWithEnvironment:screeningToken:localeIdentifier:error: // Provided Localisation

// Initialisers

initWithEnvironment:screeningToken:error: // Default English
initWithEnvironment:screeningToken:localeIdentifier:error: // Provided Localisation
initWithEnvironment:instantBiometricsId:error: // Default English
initWithEnvironment:instantBiometricsId:localeIdentifier:error: // Provided Localisation
```

## Customisation

From version 2.0, SDK provides `GPFontConfiguration` type, specifically designed to facilitate the customization of font styles. This configuration allows you to define the `regular` and `semibold` font styles. Other configuration aspects such as colors and component sizes can be configured in the GlobalPass Portal.

```objc
id configuration = [[GPFontConfiguration alloc] initWithRegular:[UIFont systemFontOfSize:1.0 weight:UIFontWeightRegular]
                                                       semibold:[UIFont systemFontOfSize:1.0 weight:UIFontWeightBold]];
id sdk = [[GlobalPassSDK alloc] initWithEnvironment:GlobalPassEnvironmentDev
                                     screeningToken:nil
                                  fontConfiguration:configuration
                                   localeIdentifier:nil
                                              error:nil
                                         completion:^(BOOL) {}];
```

From version 2.0, the SDK supports both Light and Dark modes. If your application does not support dark mode, you can disable it by following instructions in [this article](https://sarunw.com/posts/how-to-disable-dark-mode-in-ios/).

## Callback Management

SDK provides the ability to track navigation events between screens.
The list of possible events is provided through `GPEvents` enumeration.

```swift
public enum GPEvents: Int {
    case commentsControllerPresented                      // 0
    case initialControllerPresented                       // 1
    case welcomeControllerPresented                       // 2
    case faceTecGuideControllerPresented                  // 3
    case screeningFaceTecInitialisingControllerPresented  // 4
    case instantFaceTecInitialisingControllerPresented    // 5
    case instantFaceTecProcessingControllerPresented      // 6
    case screeningFaceTecProcessingControllerPresented    // 7
    case faceTecFailureControllerPresented                // 8
    case faceTecSessionFailureControllerPresented         // 9
    case documentSelectionControllerPresented             // 10
    case documentGuideControllerPresented                 // 11
    case documentPhotoControllerPresented                 // 12
    case nfcControllerPresented                           // 13
    case personalDetailsControllerPresented               // 14
    case addressDetailsControllerPresented                // 15
    case proofOfAddressControllerPresented                // 16
    case countriesListControllerPresented                 // 17
    case instantCompleteControllerPresented               // 18
    case screeningCompleteControllerPresented             // 19
    case instantFinishControllerPresented                 // 20
    case screeningFinishControllerPresented               // 21
    case terminated                                       // 22
    case cancelledSession                                 // 23
}
```

To subscribe to an event, use the `completion` parameter when initialising an SDK session:

```swift
try GlobalPassSDK(
    environment: .dev,
    screeningToken: "...",
    completion: { event in
        // handle event
    }
)
```

## Privacy

The GlobalPass SDK collects sensitive user data, including location and personal details, to support KYC processes. This data is exclusively used within the SDK and is not shared with any third parties. To align with Apple's privacy standards, the SDK includes a [privacy manifest file](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files) detailing all types of data collected.

## Security

Starting from version 2.0, the GlobalPass SDK bundle incorporates a [code signature](https://developer.apple.com/documentation/xcode/verifying-the-origin-of-your-xcframeworks), endorsed by the Apple Developer Program.
