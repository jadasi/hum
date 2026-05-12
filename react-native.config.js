/**
 * Aligns RNGP `GenerateEntryPointTask` with `android/app/build.gradle` `namespace` /
 * `applicationId`. Without this, autolinking can emit `com.anonymous.<slug>` while
 * `BuildConfig` lives under `com.humslice.flights`, breaking `compileDebugJavaWithJavac`.
 *
 * @see https://github.com/facebook/react-native/blob/main/packages/gradle-plugin/react-native-gradle-plugin/src/main/kotlin/com/facebook/react/tasks/GenerateEntryPointTask.kt
 */
module.exports = {
  project: {
    android: {
      packageName: 'com.humslice.flights',
    },
  },
};
