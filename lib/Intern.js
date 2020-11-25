// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern {
  constructor(name, id, email, school) {

    super(name, id, school);
    // this.name = name;
    // this.id = id;
    // this.email = email;
    this.school = school;
  }

  getRole() {
    return "Intern"; 
  }

  getSchool() {
    return this.school;
  }
}
module.exports = Intern; 