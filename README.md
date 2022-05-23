# fish-of-the-day
```
https://fish-of-the-day-8d541.web.app/
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



Pre-development Guidelines
Before starting the development they should be taking a pull of latest code and this exercised shall be followed every time when they begin their day.
No story shall be picked up with a partial understanding or missing Acceptance Criteria.
The developers should be setting up a 10 minutes code walkthrough to get their code reviewed in person or over teams.
Every story needs to be analyzed properly before kicking-off implementation and committing for a time, otherwise, no extra time will be provided if analysis not done properly.
Every story will have a due date and every developer has to adhere to that.
There would be 2 folds approval on every merge request, Level 1 - Team Lead & Level 2 - Architect.
All developers should follow CSS, JS coding standards.
JavaScript and JQuery

Initialize Variables and variable declarations should be on Top.
The variable name should be meaningful.
prefer to follow naming convention while creating variables - All properties, functions, and methods in lowercase, camelCase. Constant should be in uppercase.
will give proper comments wherever required.
Try to reuse existing components.
Avoid Global Variables.
Avoid heavy nesting in functions.
Will prefer to make utilities for common functions.
will avoid accessing layout properties like height, width, margin, etc. will trigger reflow in the page. 
Avoid $(window).load() if script doesn't need any sub-resources of the page like changing the background color of a div that’s styled by an external stylesheet.
will use specific selector instead of a universal selector. It increases the query time
$("div > *" ); // Extremely expensive.
$( "div .class" ) // Better.
$( "input:radio" ); // Much better.

Prefer to use jQuery chain method for better performance.
HTML 

Always close the HTML elements. 
<!--/* Bad */--><input type="text" name="name"> 

<!--/* Good */--><input type="text" name="name" />

to encourage reusability will try to use the existing template if required will create variation.
prefer to use semantic elements wherever possible.
avoid writing code which may hinder accessibility
CSS Pre-processors (SCSS)

use variables for common values like colors, font-size, etc, to keep it dynamic.
follow the style guide.
provide meaningful names to the variables.
try to create mixins if required. Preference will be when styling can be drive through passing arguments/parameters.
use rem/em unit instead of px.
stick with the suggested font-family and icons.
prefer to use png/svg instead of jpg.
follow a mobile-first approach.
follow a modular approach
eg: 

.article {

   &__title {

        color: $accent;

  }

  &__text {

       color: $green;

  }

}

PR Guidelines for UI

Following items should be present as part of each PR else PR will not be accepted.

Before raising PR will make sure nothing is breaking on local.
Please follow naming convention while creating PR
for story:  feature/( Jira ID - A high level description of the story)
for defect:  bugfix/( Jira ID - A high level description of the defect)
Component mock(all variations) screenshot (Take a screenshot of the component from  URL and upload it here)
Please follow 2 level review process ( one is peer review and final review)
Output screenshots(wherever applicable)
Desktop (Chrome and IE)
Tablet
Mobile
Vue.JS Best Practices
https://www.tatvasoft.com/blog/vue-js-best-practices/

Always use key v-for with “: key” inside

<ul v-if="itemList && itemList.length > 0">
    <li v-for="item in itemList" @click="deleteItem(item)">{{ item }}
    </li>
</ul>
Always use kebab Casing for Events 
It is advisable to use a kebab case where you need to emit custom events. 

Data should always return a function
When declaring component data, the data option should always return a function. If it does not, and we just simply return an object, then that data will be shared across all instances of the component.
eg.
export default {
  data() {
    return {
      name: "My Window",
      articles: [],
    };
  },
};
Keep npm Packages Updated
Try to regularly update npm packages to avoid any dependency errors and to use the latest/updated features provided by individual packages.

npm outdated // run to check outdated npm packages
npx npm-check-updates -u // run to check updates outdated npm packages
npm install // run to update npm packages


Used Suitable Data Type Assign for Variable
Continuously use proper data types instead of “any” to minimize the casting time and other casting errors.

// Wrong

const age: any = 0; [hard to identify response type at the places this variable used and also hard to track errors on assignments]  

// Right

const age: number = 0; [easy to track and identify response type]



Used a $refs
Always used $refs to get results from DOM and try to minimize the use of JavaScript.
Avoid the use of jQuery, instead, use typescript because typescript allows code rendering faster and to catch and rectify multiple problems at development time.of projects.
 Do Not Mix v-if and v-for
In Vue, You don’t use v-if on the same element as v-for. While Vue.js compiles the template, it checks all time v-if conditions. It is time-consuming. Instead, we can apply the V-if condition to the parent tag or template to achieve the same.
Vue Component Reusability & Communication
From the Vuex store, you have access to all the reusable components and reusable code of Vue.js. Vue’s reusable component is very flexible to use. Try to make a common component with maximum required props and reuse it in all other pages. As an example, you can create common components for the confirmation messages. (You can pass dynamic confirmation text, button text, icons name, etc.). Same way confirmation you can create one component for add/edit functionality with the same model and bindings using the Vue component library.
Clean Code and Refactoring
Use a shared/separate file for the static functions/properties for re-usability. It will be helpful to keep a shared/static code at the same file in the entire solution.
Use eslint or tslint analysis tools to maintain code quality.
In Vue, you can reduce the line of code by narrowing down the UI into smaller components.
Use keywords (Const/Let) provided by typescript smartly instead of the var keyword of javascript.
Bad:
var test: number = 0;
 “Identifier 'test' is never reassigned; use 'const' instead of 'var'”
 
You will get the above error if tslint is configured properly when you run the project
 
Good:
const test: number = 0; // if static, use const
let test: number = 0; // if updateable, use let
