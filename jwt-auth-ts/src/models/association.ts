import User from "./user.model";
import Role from "./role.model";

User.belongsToMany(Role, {
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});

Role.belongsToMany(User, {
    through:"user_roles",
    foreignKey:"roleId",
    otherKey:"userId"
});

export {User,Role};