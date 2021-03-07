# RentTrackingWebApplication
Web application to track rent.

## Requirement
- Node v10.16.0+.
- MySQL Server and Workbench.
- Visual Studio Code.

## Developement Setup
#### Database
- All Sql Scripts present in expressApi/sqlScripts/
- First create database ``` create database renttracking ```
- Execute ``` schema_creation.sql ``` first and then the rest.

#### API
- open CMD in /expressApi folder.
- To Install all Packages ``` npm install ```
- To Run the API ``` nodemon api.js ```
- Runs on http://localhost:5000/

#### React
- open a new CMD in /renttracking-ts folder.
- To Install all Packages ``` npm install ```
- To Run the React Application ``` npm start ```
- Runs on http://localhost:3000/
