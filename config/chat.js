const moment = require('moment');
const chat_users = [];
const live_times = [];

// //////////////////////////////
// format message type

function formatMsg(user_name, user_photo, chat_msg) {
    return {
        user_name: user_name,
        user_photo: user_photo,
        chat_msg: chat_msg,
        chat_time: moment(new Date()).format("h:mm A")
    }
}

// ///////////////////////////////
// join user to chat

function userJoin(id, user_name, roomId) {
    const user = { id, user_name, roomId };

    chat_users.push(user);
    return user;
}

// user leaves in chat

function userLeaves(id) {
    const index = chat_users.findIndex(user => user.id === id);

    if (index !== -1) {
        return chat_users.splice(index, 1)[0];
    }
}

// get current user

function getCurrentUser(id) {
    return chat_users.find(user => user.id === id);
}

// get room users
function getRoomUsers(roomid) {
    return chat_users.filter(user => user.roomId === roomid).length;
}

// ///////////////////////////////
// register Channel time

function createLiveTime(id, ch_time) {
    const live_ch = { id, ch_time };
    live_times.push(live_ch);

    // return live_ch;
}

// close channel
function closeLive(id) {
    const index = live_times.findIndex(live_ch => live_ch.id === id);

    if (index !== -1) {
        return live_times.splice(index, 1)[0];
    }
}

// getCurrnet Livetime
function getCurrentLivetime(id) {
    return live_times.find(live_ch => live_ch.id === id);
}

module.exports = {
    formatMsg,
    userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers,
    createLiveTime,
    closeLive,
    getCurrentLivetime
}