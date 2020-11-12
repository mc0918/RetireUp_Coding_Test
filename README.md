# S&P 500 Total Returns #

### Project Overview ###
Bootstrapped with create-react-app, this is a single page application (SPA) that displays the S&P 500 index returns by year. The app is responsive, and will resize to keep the table readable on smaller screens.

### Deployment Proof of Concept ###
visit http://retireup-ui.s3-website.us-east-2.amazonaws.com/ to see the app hosted on an AWS s3 bucket

Steps:
1. create and AWS account and install the CLI (and set credentials)
2. navigate to parent directory
3. run "npm run cloudBuild && npm run cloudDeploy"
4. log on to AWS console, navigate to the newly created bucket
5. click on the bucket, click on properties, turn on static website hosting

Some caveats:
1. cloudBuild will create a bucket. Running it twice will produce an error. If the bucket already exists try "npm run build && npm run cloudDeploy".

### Components ###
There are 3 custom components in this application: Table, Row, and Header.

1. Table
 - Table handles the majority of the logic for processing and displaying the data. The JSON file containing the returns is imported, reversed for ascending order, and saved as the value of the variable "rows". Because the data does not have the cumulative returns already calculated, a function, calculateCumulativeReturn, is used to return a new object with the values mapped to the appropriate year.
 - As this is a functional component, state is initialized using the useState hook. The minimum and maximum possible years (1926 and 2019) are saved as values minYear and maxYear within yearRange. These values are used to set the range slider's initial values as well as keep track of the years filtered by the user.
 - Rows are rendered dynamically in the renderTable function. The use of a custom row component allows for any number of columns to be passed through props. The same is true for the table header.
 - The slider component is taken from the rc-slider-range package. There are some issues using with React 17 and StrictMode, the most notable issue being the deprecation of findDOMNode. Instead of the tooltip API, I decided to simply put two labels at the end of the slider to denote the current value of each handle as the tooltip API created an avalanche of error messages in the console. Given more time, I would go over the range slider's documentation to see how to pass a ref to the Handles. Given less time, I would downgrade to React 16 to circumvent the issue entirely.
2. Row
 - The row component takes in any number of props and maps them to cells. It also contains logic to check for negative values, adding a data attribute to negative cells to turn the font red.
3. Header
 - The Header component is fairly standard. It occupies 100% of the app's width and contains a logo. For a project requiring navigation or a more complicated navbar I would use either flexbox-based grid system like in the App component or styled components from a framework like Material-UI. 

### Testing ###
create-react-app comes bundled with React testing library (RTL); therefore, this, Jest, and React's test utilities package were used. 
Unlike enzyme, RTL emphasizes testing user experience rather than implementation. Testing state is less important than the user interacting with the components.
Following these patterns, you will see most tests cover user interaction with the DOM. 
- NOTE: An interesting issue in testing the Table was trying to simulate an event to pass to the RIGHT slider handle. Combining RTL and test utilities allowed me to change the value of the left handle of the slider but not the right. I believe this is related to the issue I described above. As noted in the test, given that the functionality is equivalent to the left handle, I decided my time was better spent working on more important issues.
