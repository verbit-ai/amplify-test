# Getting Started with Amplify Test

Setting up the app

## Run the following:

### `npm i`

Add the following 2 lines to: node_modules/@aws-amplify/ui-components/dist/esm-es5/amplify-authenticator.entry.js

```
case AuthState.CustomConfirmSignIn: 
return h("div", null, "");
```

## Run:
### `npm start`

## Add/Remove Fields:
in `App.js` edit 'formFields' Array and add fields as required.
For more details on this customization see the `amplify-form-field` [prop documentation](https://github.com/aws-amplify/amplify-js/tree/main/packages/amplify-ui-components/src/components/amplify-form-field#properties) and the internal `FormFieldType` [interface](https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/components/amplify-auth-fields/amplify-auth-fields-interface.ts#L3).

## Design Changes:
You can control top level components directly using CSS:

```
amplify-authenticator {
  background: tomato;
  padding: 5px;
}
```

## Theming
Theming for the UI components can be achieved by using CSS Variables. You can enable theming in your app by overriding the below mentioned CSS variable values. To do that, add the following code in root css file.
```
:root {
  --amplify-primary-color: #ff6347;
  --amplify-primary-tint: #ff7359;
  --amplify-primary-shade: #e0573e;
}
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
