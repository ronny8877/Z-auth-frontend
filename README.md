## React tailwind boiler plate code 

### `npm start`
### `npm test`
### `npm run build`
### `npm run eject`
A big no no

## Structure
---Src

   `App.tsx  Routing and everything else is managed here. It is directly under src folder for easier access`
   
   `index.tsx Basic index.tsx file. It is directly under src folder for easier access add context providers and other stuff`
   
  
└───src <br/>
    ├───  assets `Assets contain all the assets like images, svg ,fonts etc.`<br/>
    ├───  components `all the logic is managed here.`<br/>
    │   ├───  common `Common folder holds the components that are used in multiple places without any changes like loading spinner, error page , modals ,common cards etc`<br/>
    │   ├───  container `holds the base components which are used to make the webpage like Buttons , Cards etc. which are component specific should be stored in relative folder`<br/>
    │   ├───  services `folder holds the services like api calls, data fetching etc.`<br/>
    │   ├───  types `folder holds the types like interfaces, enums etc.`<br/>
    │   └───  utils `folder holds the utility functions like helper functions, etc.`<br/>
    ├───  context `folder holds the context providers like auth, language ,ui etc.`<br/>
    ├───  screens `folder holds the screens like home, about etc the final component is assembled here.`<br/>
    └───  styles ` folder holds the styles like global styles, etc.`<br/>



  




   