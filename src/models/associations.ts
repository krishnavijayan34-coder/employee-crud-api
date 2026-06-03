import Employee from "./employee";
import Address from "./address";

Employee.hasOne(Address, {
    foreignKey:"employeeId",as:"address"
});
Address.belongsTo(Employee, {
    foreignKey:"employeeId",as:"employee"
});