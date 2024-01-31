const users = [
    {
        id: 'student03',
        _id: 'student03',
        name: 'student03',
        email: 'student01@test.com',
        role: 'student',
        isActive: true
    },
    {
        id: 'student04',
        _id: 'student04',
        name: 'student04',
        email: 'student01@test.com',
        role: 'student',
        isActive: true
    }
]

const addUser = (userInfo) => {
    console.log('#addUser')
    console.log(userInfo)
    const name = userInfo.name?.trim().toLowerCase()
    if (!name) {
        return {
            error: 'name is required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.name === name
    })

    // Validate name
    if (existingUser) {
        return {
            error: 'name is in use!'
        }
    }

    // Store user
    const user = userInfo
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsers = () => {
    return users
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

const setUserActive = (socketId, bool) => {
    const userIndex = users.findIndex((user) => user.id === socketId);

    if (userIndex !== -1) {
        users[userIndex].isActive = bool;
        return { user: users[userIndex] };
    } else {
        return {
            error: 'User not found with the provided socketId.'
        };
    }
};

const testActivateUser = (socketId, bool) => {
    const userIndex = users.findIndex((user) => user.isActive);
    if (userIndex !== -1) {
        users[userIndex].isActive = bool;
        return { user: users[userIndex] };
    } else {
        return {
            error: 'User not found with the provided socketId.'
        };
    }

}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsers,
    getUsersInRoom,
    setUserActive,
    testActivateUser
}