# optimizedTravel
A full stack app to build optimized driving routes for traveling nurses.

TODO
* [x] Develop user stories

* [x] Set up server
    * [x] Install dependencies
    * [x] Install & set up linter
    * [x] Set up Express app

* [x] Develop database model
    * [x] What data will be stored?
    * [x] Set up mysql models
    * [x] Generate set of at least 6 fake patients
    * [x] Generate at least one fake nurse   

* [] Set up backend endpoints
    * [x] Route to a root
    * [X] Route to GET all patients
    * [x] Route to GET pts by RN_ID
    * [] Other routes as needed

* [x] Front end React/Redux
    * [x] started & running
    * [x] reduxify app
    * [x] split Map from App components
    * [x] parsed response data for point display

* [] Front end Mapbox
    * [x] Working Map w/ token (component passed to App.js)
    * [x] Pt locations for a nurse displayed on map!!
    * [] Change color of icon if high priority
    * [] Dynamically add start point for RN (home or office)

* [] Front end actions/reducers
    * [x] actions: FETCH ptPoints from API - list of pts for nurse to display on map
    * [] action: FETCH nurse id from name on startup. Modal?    