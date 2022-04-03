import User from "./users/user-model.js";
import Message from "./chat/message-model.js";

User.hasMany(Message, {as: 'messages', foreignKey: 'userId'})

Message.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'})

export {User, Message};
