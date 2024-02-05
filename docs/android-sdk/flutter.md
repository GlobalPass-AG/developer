---
hide_table_of_contents: true
---

# Flutter

:::note
Latest GlobalPass Android SDK version: **2.0**
:::

## 1. Connect GlobalPass SDK

### a. Add this code to the Project level build.gradle file under allprojects -> repositories section:

#### build.gradle

```gradle
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

:::info To get a <token> value used above, please contact GlobalPass support.
:::

### b. Add this code to the App level build.gradle file under dependencies:

#### build.gradle

```gradle
implementation 'ch.globalpass.sdk:release:2.0'
```

### c. Sync gradle

:::warning
If you use ProGuard in your project you should include these rules:
:::

```proguard
-keep class ch.globalpass.globalpasssdk.domain.model.** { *; }
-keep class ch.globalpass.globalpasssdk.data.networkmodels.** {*; }
-keep class org.jmrtd.** {*; }

-keep class net.sf.scuba.** {*; }
-keep class org.bouncycastle.** {*; }
-keep class org.spongycastle.** {*; }
-keep class org.ejbca.** {*; }

-dontwarn javax.annotation.Nullable
-dontwarn com.facetec.sdk.**
-keep class com.facetec.sdk.**
{ *; }
```

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

### KycPlatformInterface

```dart
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

### KycPlatformImpl

```dart
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

| Parameter        | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| enableFileLogger | Enable Logger to write SDK logs.                                      |
| widgetMode       | Select matching widget mode if `Split` flow is used.                  |
| externalId       | Specify your internal customer identifier to be set on the screening. |
| languageCode     | Specify SDK language using available langauage options.               |
| typefaceMap:     | Customize SDK fonts using your own ones.                              |

```kotlin
globalPassSdk.start(
    // ...
    enableFileLogger = true,
    widgetMode: WidgetMode = WidgetMode.FULL_MODE,
    externalId: String? = null,
    languageCode: String = "en",
    typefaceMap: Map<FONT_WEIGHT, Typeface?> = null
)
```

### enableFileLogger

There is an optional Logger that writes logs into a file which could be found in Internal Storage:

**File Storage → Android → data → "your app package" → files → logs → logs file**

It is optional and `false` by default. To enable the logger you need to set it to `true`.

### widgetMode

To use **Split** flow, a matching widgetMode must be selected. By default, it is set to `FULL_MODE`. To select mode you can use sealed class WidgetMode
```kotlin
enum class WidgetMode(val value: String?) {
    SPLIT_IDENTITY_MODE(value = "Identity"),
    SPLIT_ADDRESS_MODE(value = "Address"),
    FULL_MODE(value = null)
}
```

### externalId

You can provide your own customer ID to be assigned to the screening flow. By default, the value is `null`.

### languageCode

By default, the SDK is displayed in English. Available locales:

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

### typefaceMap

To set the font styles used in the GlobalPass SDK, you can utilize the `typefaceMap` parameter. Currently GlobalPass SDK allows to define `regular` and `semibold` font styles. To provide your own fonts you need to define a map that associates enum class `FONT_WEIGHT` provided by the SDK with its corresponding typeface.

```kotlin
globalPassSdk.start(
    // ...
    typefaceMap: Map<FONT_WEIGHT, Typeface?> = createTypefaceMap()
)

private fun createTypefaceMap() : Map<FONT_WEIGHT, Typeface?> = mapOf(
        FONT_WEIGHT.REGULAR to ResourcesCompat.getFont(applicationContext, R.font.your_regular_font),
        FONT_WEIGHT.SEMI_BOLD to ResourcesCompat.getFont(applicationContext, R.font.your_semibold_font)
    )
```

Parameter `typefaceMap` is optional and `null` by default.
