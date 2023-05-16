import React from 'react'

const FindUser = (users, userId) => {
    const userIndex = users.findIndex(user => userId === user._id);
    if (userIndex === -1) {
        return {};
    }
    return users[userIndex];
  
}

export default FindUser