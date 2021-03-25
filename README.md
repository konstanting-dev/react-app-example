# fleet2share
The fleet management portion of the bloXmove Mobility Blockchain Platform

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Get started

1. Install packages

        yarn install

2. Set up environment variables by creating `.env` from `.env.example`

[See API Mocking section for details about setting up test API](#api-mocking)

3. Start application

        yarn start

## API Mocking

To test API you can use Prism (https://github.com/stoplightio/prism).
After installing, you need to run this command to mock API locally:

    prism mock src/api/open-api-spec.yaml

Then set `REACT_APP_API_URL` in your `.env` to the URL which Prism is listening on
