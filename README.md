# README #

This demo Ionic cinema is originally copy or based on ionic conference app, you will find some of functions, classes, objects etc is duplicated in this project.

### What is this repository for? ###

* Quick summary
Ionic cinema apps is a basic movie tickets systems, its consist of list of movies, showtimes search function and booking tickets, and last is my reservations services. this ionic cinema ionic apps is frontend of [cinema microservice Spring Boot systems.](https://github.com/domuharahap/cinema-springboot)

## Table of Contents
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [App Preview](#app-preview)
- [Deploying](#deploying)
  - [Progressive Web App](#progressive-web-app)
  - [Android](#android)
  - [iOS](#ios)


### Getting Started

* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally: `npm install -g ionic cordova`
* Clone this repository: `git clone `.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.

_Note: See [How to Prevent Permissions Errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions) if you are running into issues when trying to install packages globally._

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run ```ionic cordova run ios --prod```

## Dynatrace Instrumentation

### Install the Dynatrace Cordova plugin

Below commands is dynatrace corodova plugin installation, please refer into latest [Dynatrace-Cordova-Plugin for more details] (https://www.npmjs.com/package/dynatrace-cordova-plugin)

1. Run `cordova plugin add @dynatrace/cordova-plugin --save`
2. Enable Wen view monitoring
3. Setup the dynatrace config

   ```
   module.exports = {
    cordova : {
        debug : false,
        autoUpdate : true,
        cspURL: "Insert your BeaconURL from Config /bf"
    },

    js : {
        url : "Insert your URL here"
    },

    android : {
        // Those configs are copied 1:1
        config : `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId 'Insert your ApplicationID from Config'
                        beaconUrl 'Insert your BeaconURL from Config'
                    }
                }
            }
        }
        `
    },

    ios : {
        // Those configs are copied 1:1
        config : `
        <key>DTXApplicationID</key>
        <string>Insert your ApplicationID from Config</string>
        <key>DTXBeaconURL</key>
        <string>Insert your ClusterURL from Config</string>
        `
    }  
   }

### Build Android

Execute below command to download and build android and ios apps (tested: android)
1. Run `Ionic cordova platform add android` to add android platform
2. Run `ionic cordova build android` to download agents and build android apk
3. Run `ionic cordova run android`

### Gradle problems

Refer to supported technology and version for supporting gradle version. Tested gradle version in this project example is 5.6.4. If unsupported gradle version accounter during android build, change the version in `ProjectBuilder.js` file. Default location `Platforms > Android > Cordova > Lib > Builder` 

```var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'https\\://services.gradle.org/distributions/gradle-5.6.4-all.zip';```

### Manual or Custom instrumentation

To use the interface of the JavaScript Agent directly you must specify the typing definition file in the tsconfig.json. Add the following block to the tsconfig.json
```
{
  "compilerOptions": {
    ...
  },
  "files": ["plugins/dynatrace-cordova-plugin/typings/main.d.ts"]
}
```

The JavaScript Agent now can be used everywhere in the application.

1. Identify User
```
  dtrum.identifyUser(...);
 ``` 
 2. Custom action
 ```
    dtrum.enterAction(...)
 ```
 
## Docs
Mobile instrumentations
![Image description](https://github.com/domuharahap/cinema-ionic-app/blob/master/docs/ionic-cinema-mobiles.jpg)
User tag
![Image description](https://github.com/domuharahap/cinema-ionic-app/blob/master/docs/ionic-cinema-users.JPG)
Custom Actions
![Image description](https://github.com/domuharahap/cinema-ionic-app/blob/master/docs/ionic-cinema-custom-actions.jpg)
