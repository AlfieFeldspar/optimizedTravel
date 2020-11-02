# optimizedTravel
A full stack app to build optimized driving routes for traveling nurses.

TODO
* [x] Develop user stories
    * [x] RN: traveling around town on home health visits
    * [x] Nurse manager in the office watching the numbers

* [] Wireframes
    * [x] Landing page for RN on mobile
    * [x] Map page for RN on mobile

* [x] Set up server
    * [x] Install dependencies
    * [x] Install & set up linter
    * [x] Set up Express app

* [x] Develop database model
    * [x] What data will be stored?
    * [x] Set up mysql models
    * [x] Generate set of at least 6 fake patients
    * [x] Generate at least one fake nurse   

* [x] Set up backend mySql endpoints
    * [x] Route to a root
    * [X] GET all patients (for manager)
    * [x] GET pts by RN_ID
    * [x] POST to pts to change visitPriority
    * [x] GET one nurse with name/location from selection on Launch

* [x] Front end React/Redux, general 
    * [x] started & running
    * [x] reduxify app
    * [x] split Map from App components
    * [x] parsed response data for point display
    * [x] set up React Router to move from LAUNCH to MAP and back  

* [] Front end RN Mapbox MAP component (mobile)
    * [x] Working map w/ token 
    * [x] Patient point locations displayed on map!!
    * [x] Point size changes on zoom
    * [x] Point location fixed on zoom
    * [x] Add icon for nurse starting point (Need to make dynamic with data returned from Launch page)

* [x] Front end RN nav components on MAP
    * [x] AT LEAST display app name
    * [x] Add 'route' button

* [x] TRIP ROUTING: API & data manipulation
    * [x] Route Leg1 from home or office to any top priority patients: receive route and setState.
    * [x] successful for Leg1: hit Mapbox API and generates routes
    * [x] successful for Leg2 from first patient starting point to other spots
    * [x] Connect the routes into one Trip
    * [x] Format into geoJson object

* [] DISPLAY THE TRIP ROUTES!
    * [x] DATA BEING PASSED TO DECK CANVAS!
    * [x] CANVAS DISPLAYING WITH DEV TOOLS!
            (no lines visible)

* [x] Front end TABLE OF PATIENTS component
    * [x] Skeletonize component
    * [x] Display list of patients
    * [x] Sort by patient last name
    * [x] In-table button to change visit priority
        * [x] Add button
        * [x] POST endpt backend build, 
        * [x] front end ACTION
        * [x] Add onChange/onClick handler

* [x] Front end RN LAUNCH page (mobile)
    * [x] Drop box for nurse's name to grab Id and filter patients
    * [x] Drop box to add start point for RN (home or office)
   
* [] Front end actions/reducers
    * [x] FETCH ptPoints from mySql API - list of pts for nurse to display on map
    * [x] FETCH optimized route from Mapbox API
    * [x] POST to change visitPriority
    * [x] FETCH nurse id & coords from name on startup.  

* [] STRETCH GOALS
    * [x] Generate remaining fake patients
    * [] Change color of icon if high priority
    * [] TOOL TIPS: Click on name in list and marker flashes or changes color 
    * [] Landing page for RN manager   

