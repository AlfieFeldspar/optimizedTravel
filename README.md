# optimizedTravel

CURRENT/ACTIVE BRANCH: simpleMapboxTry. NOT up to date with Main

A full stack app to build optimized driving routes for traveling nurses.
Uses: React/redux, Nodejs/Express, mySQL, react-map-gl, (trying deck.gl)

TODO
* [x] Develop user stories
    * [x] RN: traveling around town on home health visits
    * [x] Nurse manager in the office watching the numbers

* [] Wireframes
    * [x] Landing page for RN on mobile
    * [x] Map page for RN on mobile
    * [] Landing page for RN manager   

* [x] Set up server
    * [x] Install dependencies
    * [x] Install & set up linter
    * [x] Set up Express app

* [x] Develop database model
    * [x] What data will be stored?
    * [x] Set up mysql models
    * [x] Generate set of at least 6 fake patients
    * [x] Generate at least one fake nurse   
    * [] Generate remaining xx fake patients [STRETCH GOAL]

* [] Set up backend mySql endpoints
    * [x] Route to a root
    * [X] GET all patients (for manager)
    * [x] GET pts by RN_ID
    * [x] POST to pts to change visitPriority


* [x] Front end React/Redux, general 
    * [x] started & running
    * [x] reduxify app
    * [x] split Map from App components
    * [x] parsed response data for point display

* [] Front end RN Mapbox MAP component (mobile)
    * [x] Working map w/ token 
    * [x] Patient point locations displayed on map!!
    * [x] Point size changes on zoom
    * [x] Point location fixed on zoom
    * [x] Add icon for nurse starting point 
    * [] Change color of icon if high priority?
    * [] Routing
        * [x] Route Leg1 from home or office to any top priority patients: receive route and setState.
        * [] Display Leg1
        * [x] Route Leg2 from first patient starting point to other spots
        * [] Display Leg2
        * [] If no high priority patients, just route from home or office 

* [] Front end RN nav bar on MAP
    * [x] AT LEAST display app name
    * [x] Add 'route' button
  * * [] Wire up 'route' button
        * [x] successful for Leg1: hit Mapbox API and generate routes
        * [x] add Leg2 to button
        * [] display the routes!
    * [] Toggle 'Patients' and 'Navigate' to show/hide table, change map size, trigger API call
    * [] Extract the Nav Bar and Routing features to new component from Map

* [] Front end TABLE OF PATIENTS component
    * [x] Skeletonize component
    * [x] Display list of patients
    * [x] Sort by patient last name
    * [] TOOL TIPS: Click on name in list and marker flashes or changes color [STRETCH GOAL]
    * [] In-table button to change visit priority
        * [x] Add button
        * [x] POST endpt backend build, 
        * [x] front end ACTION
        * [x] Add onChange/onClick handler

* [] Front end RN launch page (mobile)
    * [] Drop box for nurse's name to grab Id and filter patients
    * [] Drop box to add start point for RN (home or office)
    * [] Dynamically change priority
   
* [] Front end actions/reducers
    * [x] FETCH ptPoints from mySql API - list of pts for nurse to display on map
    * [x] FETCH optimized route from Mapbox API
    * [x] ACTION to change visitPriority
    * [] FETCH nurse id from name on startup.  
