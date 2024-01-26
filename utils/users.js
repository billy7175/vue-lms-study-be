const users = [
    {
        id: 'asdadad',
        _id: 'asdasdasd',
        name: 'asdasdasd',
        email: 'student01@test.com',
        role: 'student'
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

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}