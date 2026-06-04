import User from "./user";
import Role from "./role";


Role.belongsToMany(User,{
    through:"user_roles",
    foreignKey:"roleId",
    otherKey:"userId",
    timestamps: false
    
});

User.belongsToMany(Role,{
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId",
    timestamps: false
});

export { User,Role};