'use strict';
const _ = require('lodash');
const db = require('./db.js');

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // fill me in :)
        let userList = [];
        let result = [];
        for (const user in db.itemsOfUserByUsername) {
            if (db.itemsOfUserByUsername[user].indexOf(item) !== -1) {
                userList.push(user);
            }
        }
        let ageCounter = {};
        for (const userId in db.usersById) {
            let userInfo = db.usersById[userId];
            if (userList.indexOf(userInfo.username) !== -1) {
                ageCounter[userInfo.age] = ageCounter.hasOwnProperty(
                    userInfo.username,
                )
                    ? (ageCount[userInfo.age] += 1)
                    : 1;
            }
        }
        for (const userAge in ageCounter) {
            result = [...result, { age: userAge, count: ageCounter[userAge] }];
        }
        return result;
    };
    return mockDBCall(dataAccessMethod);
};

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
};
