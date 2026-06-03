import Employee from "./employee";
//import Address from "./address";
import Department from "./department";

Department.hasMany(Employee,{
    foreignKey:"departmentId",as:"employees"
});
Employee.belongsTo(Department,{
    foreignKey:"departmentId",as:"department"
});




// Employee.hasOne(Address, {
//     foreignKey:"employeeId",as:"address"
// });
// Address.belongsTo(Employee, {
//     foreignKey:"employeeId",as:"employee"
// });