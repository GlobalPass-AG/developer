---
hide_table_of_contents: true
---

# React Native

:::note SDK Version
Latest GlobalPass Android SDK version: **2.0.4**
:::

:::info Requirements
- AndroidX
- API level 23 (Android 6.0) or higher
- Kotlin 1.7.20 or higher
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

:::info
To get a <token\> value used above, please contact GlobalPass support.
:::

### b. Add this code to the App level build.gradle file under dependencies:

#### build.gradle

```gradle
implementation 'ch.globalpass.sdk:release:2.0.4'
```

### c. Sync gradle

:::caution
If you use **ProGuard** in your project you should include these rules:
:::

```
-keep class ch.globalpass.globalpasssdk.domain.model.** { *; }
-keep class ch.globalpass.globalpasssdk.data.networkmodels.** {*; }
-keep class org.jmrtd.** {*; }

-keep class net.sf.scuba.** {*; }
-keep class org.bouncycastle.** {*; }
-keep class org.spongycastle.** {*; }
-keep class org.ejbca.** {*; }

-dontwarn javax.annotation.Nullable
-dontwarn com.facetec.sdk.**
-keep class com.facetec.sdk.** { *; }
```

## 2. Create Native module to communicate with React Native

Official documentation: [React Native Native Modules](https://reactnative.dev/docs/native-modules-android#module-name)

### a. Create interface with functions you need in your module e.g.:

#### interface GPFacade

```kotlin
interface GPFacade {
    @ReactMethod
    fun buildKYCProd(token: String, promise: Promise)
    
    @ReactMethod
    fun buildKYCDev(token: String, promise: Promise)
    
    @ReactMethod
    fun buildIBProd(token: String, promise: Promise)

    @ReactMethod
    fun buildIBDev(token: String, promise: Promise)
}
```

### b. Create an implementation of your interface. Also, you need to extend

```kotlin
class GlobalPassSDKManager(
    reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext), GPFacade {

    @ReactMethod
    override fun buildKYCProd(token: String, promise: Promise) {
        try {
            GlobalPassSDK
                .create(requireNotNull(currentActivity))
                .start(
                    token = token,
                    activity = currentActivity!!::class.java,
                    environment = GlobalPassEnvironment.Prod
                )

            promise.resolve(token)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    override fun buildKYCDev(token: String, promise: Promise) {
        try {
            GlobalPassSDK
                .create(requireNotNull(currentActivity))
                .start(
                    token = token,
                    activity = currentActivity!!::class.java,
                    environment = GlobalPassEnvironment.Dev
                )
            promise.resolve(token)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    override fun buildIBProd(biometricsId: String, promise: Promise) {
        try {
            GlobalPassSDK
                .create(requireNotNull(currentActivity))
                .start(
                    token = biometricsId,
                    activity = currentActivity!!::class.java,
                    environment = GlobalPassEnvironment.Prod,
                    flow = GlobalPassFlow.InstantBiometrics
                )
            promise.resolve(biometricsId)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    override fun buildIBDev(biometricsId: String, promise: Promise) {
        try {
            GlobalPassSDK
                .create(requireNotNull(currentActivity))
                .start(
                    token = biometricsId,
                    activity = currentActivity!!::class.java,
                    environment = GlobalPassEnvironment.Dev,
                    flow = GlobalPassFlow.InstantBiometrics
                )
            promise.resolve(biometricsId)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    override fun getName(): String = "GPFacade"
}
```

### c. Implement ReactPackage interface:

```kotlin
public class GlobalPassPackage implements ReactPackage {

 @NonNull
 @Override
 public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
     return Collections.emptyList();
 }

 @NonNull
 @Override
 public List<NativeModule> createNativeModules(
         @NonNull ReactApplicationContext reactContext) {
     List<NativeModule> modules = new ArrayList<>();
     modules.add(new GlobalPassSDKManager(reactContext));
     return modules;
 }
}
```

### d. Add your Package class to MainApplication.java -> getPackages()

```kotlin
packages.add(new GlobalPassPackage())
```

## 3. Connect your module with React Native

Define in App.js your modules:

![NativeModules](content/native-modules.png)

## 4. Start KYC flow

You can start KYC process by calling one of the functions.

```jsx
GPFacade.buildKYCDev(screeningToken);
GPFacade.buildKYCProd(screeningToken);
```

## 5. Start Instant Biometrics flow

```jsx
GPFacade.buildIBProd(screeningToken);
GPFacade.buildIBDev(screeningToken);
```

## 6. Additional optional parameters in `start()` function

There are additional optional parameters in `start()` function:

| Parameter              | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| enableFileLogger       | Enable Logger to write SDK logs.                                      |
| widgetMode             | Select matching widget mode if `Split` flow is used.                  |
| externalId             | Specify your internal customer identifier to be set on the screening. |
| languageCode           | Specify SDK language using available langauage options.               |
| typefaceMap            | Customize SDK fonts using your own ones.                              |
| flowCallbackProvider   | FlowCallbackProvider instance to observe flow callbacks.              |


```kotlin
globalPassSdk.start(
    // ...
    enableFileLogger = true,
    widgetMode: WidgetMode = WidgetMode.FULL_MODE,
    externalId: String? = null,
    languageCode: String = "en",
    typefaceMap: Map<FONT_WEIGHT, Typeface?> = null,
	flowCallbackProvider: FlowCallbackProvider? = null
)
```

### enableFileLogger

There is an optional Logger that writes logs into a file which could be found in Internal Storage:

**File Storage → Android → data → “your app package” → files → logs → logs file**

It is optional and `false` by default. To enable the logger you need to set it to `true`.

### widgetMode

To use **Split** flow, matching widgetMode must be selected. By default, it is set to FULL_MODE. To select mode you can use sealed class WidgetMode

#### enum class WidgetMode

```kotlin
enum class WidgetMode(val value: String?) {
    SPLIT_IDENTITY_MODE(value = "Identity"),
    SPLIT_ADDRESS_MODE(value = "Address"),
    FULL_MODE(value = null)
}
```

### externalId

You can provide your own customer ID to be assigned to the screening flow. By default value is `null`.

### languageCode

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

### flowCallbackProvider

Creating and providing instance of FlowCallbackProvider allows reacting to different widget flow events:

- onScreenOpened(screenName: String) when widget is opened,
- onFlowCanceled() when widget flow is canceled (exited) by the applicant without completing it,
- onFlowFinished() when widget flow is completed.

```kotlin
globalPassSdk.start(
    // ...
    flowCallbackProvider = FlowCallbackProviderImpl.flowCallbackProvider
)

object FlowCallbackProviderImpl {
    val flowCallbackProvider = object : FlowCallbackProvider {
        override fun onScreenOpened(screenName: String) {
            Log.d("FLOW_CALLBACK_CHECK", "$screenName opened")
        }

        override fun onFlowCanceled() {
            Log.d("FLOW_CALLBACK_CHECK", "Flow was cancelled")
        }

        override fun onFlowFinished() {
            Log.d("FLOW_CALLBACK_CHECK", "Flow was finished")
        }
    }
}
```

Parameter `flowCallbackProvider` is optional and `null` by default.
