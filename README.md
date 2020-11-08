This is the source code of the site for [Geoff Marshall's](https://twitter.com/geofftech) Tube World Cup.
I hacked this together at first in about 1.5hrs, before iteratively improving upon it, adding the results of the other matches and graphs for the results.  Overall I think I spent 20 hrs on it.

It's based on React, and was bootstrapped with Create React App.  It is served via GitHub Pages.

It uses polling to fetch the results of the polls from a server written by @davwheat ([Server API](https://github.com/davwheat/world-cup-of-tube-lines-api)), which itself interfaces with the Twitter API.  The site also provides historical polling, with history from the start of polls (by scanning for Twitter polls from Geoff with the `#WorldCupTubeLines` hashtag).  I did previously write a server for this (see `node/`) but recording had to be started manually, so it was abandonded in favour of David's API.

Thanks to:
1. @davwheat
 for his site, which is displayed just like Geoff's sheet! https://tubecup.davwheat.dev
 Also thanks to him for the API for the site, without him there would probably be no polling history!
2. @_FlaiFlai
 for the original API, which served as the spark which led me to create this site
3. Thanks to all the members of the community who contributed ideas! I can't name you all here, but without them the site would still be a boring, simple table!  The site really has been a collabortive effort, and for that I give you all the biggest thanks - and ofc, thanks to you the voters, without which the site would have no point!
4. @geofftech
 for putting on the Tube World Cup, and for providing the opportunity for us devs to come together to add to the experience!


## -------- ORIGINAL CRA Readme: --------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
