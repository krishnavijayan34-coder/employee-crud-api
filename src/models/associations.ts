import Employee from "./employee";
import Address from "./address";
import Department from "./department";
import Skill from "./skill";
import EmployeeSkill from "./employeeSkill";

Department.hasMany(Employee,{
    foreignKey:"departmentId",as:"employees"
});
Employee.belongsTo(Department,{
    foreignKey:"departmentId",as:"department"
});

//many to many
 Employee.belongsToMany(Skill, {
          through:EmployeeSkill,
          foreignKey:"employeeId",
          otherKey:"skillId",
          as:"skills"
 });

Skill.belongsToMany(Employee, {
    through:EmployeeSkill,
    foreignKey:"skillId",
    otherKey:"employeeId",
    as:"employees"
});


//one to one

 Employee.hasOne(Address, {
    foreignKey:"employeeId",as:"address"
 });
 Address.belongsTo(Employee, {
     foreignKey:"employeeId",as:"employee"
 });