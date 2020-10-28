# optimizedTravel
A full stack app to build optimized driving routes for traveling nurses.

TODO
* [x] Develop user stories
    * [x] RN: traveling around town on home health visits
    * [x] Nurse manager in the office watching the numbers

* [x] Wireframes
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

* [] Front end RN Mapbox map component (mobile)
    * [x] Working map w/ token 
    * [x] Patient point locations displayed on map!!
    * [x] Point size changes on zoom
    * [x] Point location fixed on zoom
    * [] Change color of icon if high priority?

* [] Front end table of patients component
    * [x] skeletonize component
    * [] Display list of patients
    * [] Radio button to change priority

* [] Front end RN nav bar 
    * [] AT LEAST display app name
    * [] Toggle 'Patients' and 'Navigate' to show/hide table and change map size

* [] Front end RN launch page (mobile)
    * [] Drop box for nurse's name to grab Id and filter patients
    * [] Drop box to add start point for RN (home or office)
    * [] Dynamically change priority
    * [] Hover-over patient details
    * [] First route from home or office to any top priority patients
        * [] Then route from that patient starting point to other spots
        * [] If no high priority patients, just route from home or office    

* [] Front end actions/reducers
    * [x] actions: FETCH ptPoints from API - list of pts for nurse to display on map
    * [] action: FETCH nurse id from name on startup. Modal?    