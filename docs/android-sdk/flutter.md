---
hide_table_of_contents: true
---

# Flutter

:::note
Latest GlobalPass Android SDK version **1.2.7**
:::

## 1. Connect GlobalPass SDK

### a. Add this code to the Project level _build.gradle_ file under `allprojects -> repositories` section:

```gradle title="build.gradle"
/* GlobalPass SDK Maven Repository */
maven {
    url 'https://pkgs.dev.azure.com/isun-ag/GlobalPassApp-Public/_packaging/GlobalPassAndroidSDK/maven/v1'
}

/* FaceTec SDK Maven Private Repository */
maven {
    url 'https://pkgs.dev.azure.com/isun-ag/GlobalPassApp/_packaging/facetecandroid/maven/v1'
    name 'facetecandroid'
    credentials {
        username "isun-ag"
        password "<token>"
    }
}
```

:::info
To get a <token\> value used above, please contact **GlobalPass** support.
:::

### b. Add this code to the App level _build.gradle_ file under `dependencies`:

```gradle title="build.gradle"
implementation 'ch.globalpass.sdk:release:1.2.7'
```

### c. Sync gradle

:::tip

If you use **ProGuard** in your project to avoid crashes and bugs you should use next rules:

```
-keep class ch.globalpass.globalpasssdk.api.* { public *;}
-keep class com.facetec.sdk.*{*;}
```

:::

## 2. Android

```kotlin
class MainActivity: FlutterActivity() {
    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(
                flutterEngine.dartExecutor.binaryMessenger ,
                "global_pass_plugin/kyc_channel"
        ).setMethodCallHandler{call , result->
val args = call.arguments as? Map<*,*>
            val token : String = args?.get("token") as? String ?: " "
            val isDev : Boolean = args?.get("isDev") as? Boolean ?: true
            when (call.method) {
                "startKyc" -> {
                    GlobalPassSDK.create(this).start(
                            token = token,
                            activity = MainActivity::class.java,
                            environment = if (isDev) GlobalPassEnvironment.Dev
                                          else GlobalPassEnvironment.Prod,
                    )
                    result.success(true)
                }
                else -> {
                    result.notImplemented()
                }
            }
            when (call.method) {
                "startBiometrics" -> {
                    GlobalPassSDK.create(this).start(
                            token = token,
                            activity = MainActivity::class.java,
                            environment = if (isDev) GlobalPassEnvironment.Dev
                                        else GlobalPassEnvironment.Prod,
                            flow = GlobalPassFlow.InstantBiometrics
                    )
                    result.success(true)
                }
                else -> {
                    result.notImplemented()
                }
            }
        }

    }
}
```

## 3. Flutter

```dart title="KycPlatformInterface"
abstract class KycPlatformInterface {
  KycPlatformInterface();

  @visibleForTesting
  static const MethodChannelmethodChannel=
      MethodChannel('global_pass_plugin/kyc_channel');

  MethodChannel get channel =>methodChannel;

  Future<void> startKyc({
    required String token,
    required bool isDev,
  }) {
    throw UnimplementedError('startKyc() has not been implemented.');
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

## 4. Start KYC or Instant Biometrics flow:

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
}
```

## 5. Additional optional parameters in `start()` function:

There are additional optional parameters in `start()` function:

| Parameter        | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| enableFileLogger | Enable Logger to write SDK logs.                            |
| widgetMode       | Select matching widget mode if `Split` flow is used.        |
| externalId       | Specify customer identification to be set on the screening. |
| languageCode     | Specify app translation using available langauage options   |

```kotlin
globalPassSdk.start(
    // ...
    enableFileLogger = true,
    widgetMode: WidgetMode = WidgetMode.FULL_MODE,
    externalId: String? = null,
    languageCode: String = "en"
)
```

### `enableFileLogger`

There is an optional Logger that writes logs into file which could be found in Internal Storage:

`File Storage → Android → data → “your app package” → files → logs → logs file`

It is optional and `false` by default. To enable the logger you need to set it to `true`.

### `widgetMode`

To use **Split** flow, matching widgetMode must be selected. By default it is set to `FULL_MODE`. To select mode you can use sealed class WidgetMode

```kotlin
enum class WidgetMode(val value: String?) {
    SPLIT_REGULAR_MODE(value = "Regular"),
    SPLIT_IDENTITY_MODE(value = "Identity"),
    SPLIT_ADDRESS_MODE(value = "Address"),
    FULL_MODE(value = null)
}
```

### `externalID`

You can provide your own customer id to be assigned to the screening flow. By default value is `null`.


### `languageCode`

By default, the SDK is displayed in English. To specify a different SDK display language, you can provide the locale code here.

Available locales:
- English (`en`)
- German (`de`)
- Russian (`ru`)
- Chinese Simplified (`zh-CN`)
- Lithuanian (`lt`)

:::note
If an unsupported locale will be provided, the SDK will fallback to English.
:::
