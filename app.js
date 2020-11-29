const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the employees name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID number?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the email address?"
  }
];

const employees = [];

(async () => {
  const getNumEmployees = await inquirer.prompt([
    {
      type: "number",
      name: "numEmployees",
      message: "Please enter the number of employees for your team (including the manager)",
    }
  ]);

  if (getNumEmployees.numEmployees <= 0)
  {
    return;
  }

  if (getNumEmployees.numEmployees >= 1)
  {
    const response = await inquirer.prompt(commonEmployeeQuestions);
    const getOfficeNumber = await inquirer.prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter manager's office number"
      }
    ]);
    employees.push(new Manager(response.name, response.id, response.email, getOfficeNumber.officeNumber));
  }

  for (let i = 1; i < getNumEmployees.numEmployees; ++i)
  {
    const getRole = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose a role for this employee",
        choices: ["Engineer", "Intern"]
      }
    ]);

    if (getRole.role == "Engineer")
    {
      const response = await inquirer.prompt(commonEmployeeQuestions);
      const getGithub = await inquirer.prompt([
        {
          type: "input",
          name: "github",
          message: "Please enter engineer's github account"
        }
      ]);
      employees.push(new Engineer(response.name, response.id, response.email, getGithub.github));
    }
    else
    {
      const response = await inquirer.prompt(commonEmployeeQuestions);
      const getSchool = await inquirer.prompt([
        {
          type: "input",
          name: "school",
          message: "Please enter intern's school"
        }
      ]);
      employees.push(new Intern(response.name, response.id, response.email, getSchool.school));
    }
  }

  var htmlText = render(employees);

  fs.mkdirSync(OUTPUT_DIR, {recursive: true});
  fs.writeFileSync(outputPath, htmlText);
})();