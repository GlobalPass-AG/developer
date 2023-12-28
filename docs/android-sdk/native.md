---
hide_table_of_contents: true
---

# Native

:::note
Latest GlobalPass Android SDK version: **1.2.19**
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
implementation 'ch.globalpass.sdk:release:1.2.19'
```

:::tip
Sometimes dependencies cannot be loaded in the project. In this case, add the following plugin in the App level _build.gradle_ file under `plugins` section.

```gradle title="build.gradle"
id "net.linguica.maven-settings" version "0.5"
```

:::

### c. Sync gradle

:::tip

If you use **ProGuard** in your project you should include these rules:

```
-keep class ch.globalpass.globalpasssdk.domain.model.** { *;}
-keep class ch.globalpass.globalpasssdk.data.networkmodels.** {*;}

-keep class org.jmrtd.** {*;}
-keep class net.sf.scuba.** {*;}
-keep class org.bouncycastle.** {*;}
-keep class org.spongycastle.** {*;}
-keep class org.ejbca.** {*;}

-dontwarn javax.annotation.Nullable
-dontwarn com.facetec.sdk.**
-keep class com.facetec.sdk.**
{ *; }
```

:::

## 2. KYC

### a. Initialize SDK in onCreate() Activity or in onCreateView() Fragment:

```kotlin
private val globalPassSdk = GlobalPassSDK.create(this)
```

### b. Start KYC flow by calling `start()` function:

`start()` function requires 3 parameters:

| Parameter   | Description                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------- |
| token       | Screening token to start KYC flow.                                                            |
| activity    | Activity to open after screening is completed.                                                |
| environment | Specify one of the environments: `GlobalPassEnvironment.Prod` or `GlobalPassEnvironment.Dev`. |

```kotlin
globalPassSdk.start(
  token = "<screeningToken>",
  activity = MainActivity::class.java,
  environment = GlobalPassEnvironment.Dev
)
```

## 3. Instant Biometrics

### a. Initialize SDK in onCreate() Activity or in onCreateView() Fragment:

```kotlin
private val globalPassSdk = GlobalPassSDK.create(this)
```

### b. Start Instant Biometrics flow by calling `start()` function:

There is overloaded `start()` function that requires 4 parameters:

| Parameter   | Description                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| token       | Instant Biometrics token to start _Instant Biometrics_ flow.                                                                              |
| activity    | Activity to open after screening is completed.                                                                                            |
| environment | Depending on the implementation use `GlobalPassEnvironment.Prod` or `GlobalPassEnvironment.Dev` API.                                      |
| flow        | This value is set as `GlobalPassFlow.KYC` by default. Set this value to `GlobalPassFlow.InstantBiometrics` for _Instant Biometrics_ flow. |

```kotlin
globalPassSdk.start(
  token = "<instantBiometricsId>",
  activity = MainActivity::class.java,
  environment = GlobalPassEnvironment.Dev,
  flow: GlobalPassFlow = GlobalPassFlow.InstantBiometrics
)
```

## 4. Additional optional parameters in `start()` function:

There are additional optional parameters in `start()` function:

| Parameter        | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| enableFileLogger | Enable Logger to write SDK logs.                            |
| widgetMode       | Select matching widget mode if `Split` flow is used.        |
| externalId       | Specify your internal customer identifier to be set on the screening. |
| languageCode     | Specify SDK language using available langauage options.   |

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
     SPLIT_IDENTITY_MODE(value = "Identity"),
    SPLIT_ADDRESS_MODE(value = "Address"),
    FULL_MODE(value = null)
}
```

### `externalId`

You can provide your own customer ID to be assigned to the screening flow. By default value is `null`.

### `languageCode`

By default, the SDK is displayed in English. To specify a different SDK display language, you can provide the locale code here.

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
