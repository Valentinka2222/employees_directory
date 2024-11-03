  <!-- ABOUT THE PROJECT -->
    <h2>About The Project</h2>

    <img src="src/assets/overview.png" height="150px" width="150px" alt="Employee Directory Logo" />

    <h1>Employee Directory</h1>

    <p>
      <strong>Employee Directory</strong> is a React and Redux-based application designed to provide
      a comprehensive view of employees across different departments within a company. The app
      offers functionalities to filter employees by departments, view detailed employee profiles,
      and sort or filter based on various criteria, such as age. This tool is ideal for quickly
      locating team members and reviewing organizational structure.
    </p>

    <h2>Features</h2>

    <ul>
      <li>
        <strong>Employee List by Department</strong>: View employees organized by departments such
        as Management, Design, Analysis, iOS, and Android Development.
      </li>
      <li>
        <strong>Profile Details</strong>: Access detailed information about each employee, including
        their position, contact information, and date of birth.
      </li>
      <li>
        <strong>Filtering Options</strong>:
        <ul>
          <li>
            <strong>By Department</strong>: Quickly filter employees to view only those from
            specific departments.
          </li>
          <li>
            <strong>By Age and Other Criteria</strong>: Filter employees by age and potentially
            other attributes (future expansion may include filters by experience or project
            involvement).
          </li>
        </ul>
      </li>
      <li>
        <strong>Efficient Data Loading</strong>: The app uses Redux to manage global state,
        minimizing re-renders and optimizing data loading.
      </li>
    </ul>

    <h2>Project Structure</h2>

    <ul>
      <li>
        <strong>Components</strong>: UI components built with Material UI for a clean, responsive
        design.
      </li>
      <li>
        <strong>State Management</strong>: Redux manages global states for employee data, allowing
        for efficient fetching, filtering, and sorting of data.
      </li>
      <li>
        <strong>Routing</strong>: React Router enables seamless navigation between the main employee
        list view and individual employee details.
      </li>
    </ul>

    <h2>Installation</h2>

    <ol>
      <li>
        Clone the repository:
        <pre><code>git clone https://github.com/your-username/employee-directory.git</code></pre>
      </li>
      <li>
        Install dependencies:
        <pre><code>cd employee-directory
npm install</code></pre>
      </li>
      <li>
        Run the app locally:
        <pre><code>npm start</code></pre>
      </li>
    </ol>

    <h2>Usage</h2>

    <ol>
      <li>
        <strong>View All Employees</strong>: The main page shows a list of all employees, grouped by
        department.
      </li>
      <li>
        <strong>Filter by Department</strong>: Use the department tabs to view employees from
        specific departments.
      </li>
      <li>
        <strong>View Employee Profile</strong>: Click on an employee's name to view their detailed
        profile.
      </li>
      <li>
        <strong>Refresh Data</strong>: If needed, use the page's reload feature to fetch the latest
        data.
      </li>
    </ol>

    <h2>Technologies Used</h2>

    <ul>
      <li>
        <strong><a href="https://reactjs.org/" target="_blank">React</a></strong
        >: For creating the user interface.
      </li>
      <li>
        <strong><a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a></strong
        >: For adding static type definitions to enhance code quality and developer experience.
      </li>
      <li>
        <strong><a href="https://redux-toolkit.js.org/" target="_blank">Redux Toolkit</a></strong
        >: For efficient Redux development with simplified configuration and better defaults.
      </li>
      <li>
        <strong
          ><a href="https://styled-components.com/" target="_blank">Styled Components</a></strong
        >: For writing CSS code within JavaScript, allowing for dynamic styling.
      </li>
      <li>
        <strong><a href="https://reactrouter.com/" target="_blank">React Router</a></strong
        >: For page navigation.
      </li>
      <li>
        <strong><a href="https://mui.com/" target="_blank">Material UI</a></strong
        >: For responsive, user-friendly UI components.
      </li>
      <li>
        <strong><a href="https://momentjs.com/" target="_blank">Moment.js</a></strong
        >: For managing and displaying date formats.
      </li>
    </ul>

    <h2>Future Enhancements</h2>

    <ul>
      <li>
        <strong>Advanced Filtering</strong>: Adding filters for more criteria like years of
        experience, role seniority, or project assignments.
      </li>
      <li>
        <strong>Sorting Options</strong>: Enabling sort options for employee names, joining dates,
        or other details.
      </li>
      <li>
        <strong>Enhanced Error Handling</strong>: More detailed error messages with potential
        solutions or reload suggestions.
      </li>
    </ul>

    <h2>Contributing</h2>

    <p>
      Feel free to submit issues, suggestions, or pull requests! This project welcomes contributions
      to improve functionality and usability.
    </p>