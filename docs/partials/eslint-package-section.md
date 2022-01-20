<!--- #eslint-packages --->

##### Installed packages
<link rel="stylesheet" type="text/css" media="all" href="./mdstyles.css" />
<table class="packages-table">
  <thead>
    <td>Pkg Name</td>
    <td>Required</td>
    <td>Additional Info</td>
  </thead>
  <tbody>
    <tr>
      <td class="pkgName">eslint</td>
      <td class="optional">&#9989;</td>
      <td class="pkginfo">Primary, base package. Highly recommended to also install globally</td>
    </tr>
    <tr>
      <td class="pkgName">babel-eslint</td>
      <!--<td>&#9989; / :question:</td>-->
      <td class="optional">&#9989;</td>
      <td class="pkginfo">Required *__unless Typescript is in use__*, in which case, remove.</td>
    </tr>
    <tr>
      <td class="pkgName">eslint-loader</td>
      <td class="optional">&#9989;</td>
      <td class="pkginfo">Enables linting during webpack hot reloads.</td>
    </tr>
    <tr>
      <td class="pkgName">eslint-plugin-react</td>
      <td class="optional"></td>
      <td class="pkginfo"></td>
    </tr>
    <tr>
      <td class="pkgName">eslint-plugin-react-hooks</td>
      <td class="optional"></td>
      <td class="pkginfo"></td>
    </tr>
    <tr>
      <td class="pkgName">eslint-plugin-import</td>
      <td class="optional">&#9989;</td>
      <td class="pkginfo">Provides linting support for ES6+ import/export syntax identification of file path misspellings</td>
    </tr>
    <tr>
      <td class="pkgName">eslint-import-resolver-webpack</td>
      <td class="optional">:question:</td>
      <td class="pkginfo">May not actually be in use.  To be examined further.</td>
    </tr>
    <tr>
      <td class="pkgName">eslint-plugin-no-iife</td>
      <td class="optional">:question:</td>
      <td class="pkginfo">
        <p>Immediately Invoked Function Expressions - which going forward will be referred to as 'IIFE' - patterns are 
        a holder from the days when the number of browsers, each with their own javascript interpreters caused the need to get extraordinarily creative.  
        Frequently,  the only means to solve certain problems such as those arising from variable hoisting, closures and global namespace polution.</p>
        <p>In the last 5 to 7 years and due in large part to the advent of ES6(+) nearly all of these problems have been quite successfully addressed,
        leaving very few remaining use cases in which use of an IIFE remains the correct and appropriate implementation approach.</p>
        <p>Yes, there absolutely are some situations which IIFE's are both the easiest and most reliable/readable approach to solve problems.  In an effort
        to smooth the ruffled feathers this no doubt has caused in some I would lke to aknowledge and recognize up front that some still exist.
        </p>
        <p>Here is a list a non-exhaustive few, these use cases include:</p>
        <ul>
          <li class="example_title">Function scoping vs Block scoping
            <ul>
              <li><span style="color: white; background-color: #751e16">verdict: Resolved via const or let vs var</span></li>
            </ul>
          </li>
          <li class="example_title">Closures and Private Data
            <ul>
              <li><span style="color: white; background-color: #751e16">verdict: Easily, more widely known patterns now exist which are also more readable</span></li>
              <li>Alternatives:
                <ul>
                  <li>Hoisting the code in question outside of the current closure and explicitly pass the variables needed as parameters</li>
                  <li>Utilization of singletons if code must only be executed once.  *note - many es5 singleton patterns also involve IIFEs - this is considered an acceptable use</li>
                  <li>Avoid prop drilling (within React in particular)</li>
                  <li>
                    Understand how React works behind the scenes and properly control if a child component should be 
                    allowed to render, what props truly changed (if any) 
                  </li>
                  <li>
                    determine if a React Hook can already provide your desired result.  Eg:  if the desire is for a segment of code to only 
                    ever execute the first time a given component loads then place that segment of code within a useEffect hook near the top of the colsure
                    and provide an empty array to the useEffect dependencies:
                    <pre style="color: red">useEffect(()=> { ... my code to only execute once here ...}, []);  <-- no dependencies within the array.</pre>
                    However, be aware that if an undefined dependency array is provided that same useEffect will execute on 'every' page load.  eg:
                    <pre style="color: red">useEffect(()=> { ... my code to only execute once here ...});  <-- no dependencies within the array.</pre>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="example_title">Aliasing Variables
            <ul>
              <li>
                <span style="color: white; background-color: #751e16">verdict: Resolved via const or let vs var, avoided/identified by properly auditing linting rules and 3rd party packages.</span>
                  <li>Performing an audit of eslint/tslint/prettier rules and fully examining which rules have been allowed to be disabled over time.</li>
                  <li>Audit 3rd party packages and identify (and subsequently eliminate) packages that serve little purpose, provide duplicate functionality or appear to be in close proximity to an unusual number of defects filed.
                    <ul><li><u>third party add-spinners are notorious for polluting the global namespace and causing problems</u></li></ul>
                  </li>
                  <li>Formulate an oversight method by which new packages being introduced must be vetted - and document what vetting involves.  Ensure all developers are aware</li>
              </li>
            </ul>
          </li>
        </ul>
        <p>The following are all situations in which IIFE usage is not just simply effective while holding noses out of need but are still the Primary and (to date) Best approaches:</p>
        <ul>
          <li class="example_title">Factory Patterns</li>
          <li class="example_title">Revealing Module Patterns</li>
          <li class="example_title">Early Angular Modules and Components</li>
          <li class="example_title">RequireJS AMD Loader Modules</li>
          <li class="example_title">Redefining, wrapping to extend and restriction of use of base javascript prototypes</li>
        </ul>
        <p>In summary, IIFE's are now considered by many as an anti-pattern and should be avoided as they are difficult to read, are not self-documenting in 
        neither indicating of their intent nor what the problem was that needed solved.<br><br>Lastly an alarmingly few developers that still (or often ever truly did) 
        fully understand how IIFEs work or what the potential side effects can be.</p>
        <p>Feel free to remove this plugin - however I would suggest only doing so after some reading and careful thought.</p><br>
        <p>I also invite any readers to contact me directly and discuss this topic further.  As I said opening up this is a highly opinionated 'hot-take'
        and am willing to listen to other points of view.  Who knows - you may change my mind.</p>
      </td>
    </tr>
  </tbody>
</table>
<!--- #eslint-packages --->