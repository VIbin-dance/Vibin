
// Initialize - Digital Stopwatch
(function () {
    'use strict';

    let TimeHolder = 0, stopTime = 0;
    let cur_startTime = Math.floor(Date.now() / 1000);
    const live_time = document.querySelector(".live_time");
    // const ch_playTime = document.querySelector("#ch_playTime");
    // TimeHolder = Date.now() - ch_playTime.value;

    function resetTimer() {
        TimeHolder = 0;
        Stopwatch(TimeHolder);
    }

    function displayTime(S1, S2, M1, M2, H1, H2) {
        live_time.innerHTML = H1 + H2 + " : " + M1 + M2 + " : " + S1 + S2;
    };

    function Stopwatch(TimeHolder) {

        var HH = Math.floor(TimeHolder / 3600),
            MM = Math.floor((TimeHolder - (HH * 3600)) / 60),
            SS = Math.floor(TimeHolder - HH * 3600 - MM * 60);

        var S1 = Math.floor(SS / 10),
            S2 = SS % 10,
            M1 = Math.floor(MM / 10),
            M2 = MM % 10,
            H1 = Math.floor(HH / 10),
            H2 = HH % 10;

        displayTime(S1, S2, M1, M2, H1, H2);
    };

    function update_time() {

        if (stopTime != 0) {
            TimeHolder++;
        }
        Stopwatch(TimeHolder);

        setTimeout(update_time, 1000);
    };


    update_time();
    // })();


    // Initialize LiveChat
    // (function () {
    // 'use strict';

    const socket = io();
    const chat_room_id = document.querySelector("#chat_room_id");
    const channel_arn = document.querySelector("#ch_arn");
    const user_name = document.querySelector("#username");
    const user_photo = document.querySelector("#userphoto");

    const chat_wrap = document.querySelector(".message_wrap");
    const chat_list = document.querySelector(".message_list");
    const chat_msg = document.querySelector("#chat_msg");
    const send_btn = document.querySelector(".send_btn");

    // connect socket and join in chat room
    socket.on("connect", () => {
        // console.log("chat server connected.");

        if (user_name.value != '' && chat_room_id.value != '' && channel_arn.value != '') {
            let u_name = user_name.value;
            let room_id = chat_room_id.value;
            let ch_arn = channel_arn.value;
            socket.emit('joinRoom', { u_name, room_id, ch_arn });

            // get Room users
            socket.on("channel_users", data => {
                const { roomid, user_counts } = data;
                display_users(user_counts);
            });

            // get Room times
            socket.on("channel_time", data => {
                const { live_time } = data;
                display_times(live_time);
            });
        } else {
            // console.log("chat Room don't open...")
        }
    });

    function display_users(param) {
        const user_count = document.querySelector(".login_users");
        user_count.innerHTML = param;
    }

    function display_times(param) {
        if (cur_startTime - param < 0) {
            stopTime = 0;
            TimeHolder = 0;
        } else {
            stopTime = 1;
            TimeHolder = cur_startTime - param;
        }
        // console.log("stopTime ", stopTime);
    }





    // ///////////////////////////////////////////////////////////////
    // click send Button
    send_btn.addEventListener('click', () => {
        if (chat_msg.value != '') {
            sendMsg();
        } else {
            // console.log('message is empty...')
        }
    })

    // keydown ctrl + Enter in input box
    chat_msg.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.keyCode == 13) {
            if (chat_msg.value != '') {
                sendMsg();
            } else {
                // console.log('message is empty...')
            }
        }
    })

    // send Message
    function sendMsg() {
        let convert_msg = chat_msg.value.replace(/\n/g, "<br>");
        const param_message = {
            user_name: user_name.value,
            user_photo: user_photo.value,
            chat_msg: convert_msg
        }
        socket.emit("server_message", param_message);
        chat_msg.value = '';
        chat_msg.focus();
    }

    // receive Message
    socket.on("client_message", (data) => {
        const { user_name, user_photo, chat_msg, chat_time } = data;
        const li = document.createElement("li");
        li.innerHTML = `<figure class="avatar">
                            <img src="${user_photo}" alt="">
                        </figure>
                        <div class="message">${chat_msg}<span class="time">${chat_time}</span></div>`;
        chat_list.appendChild(li);
        chat_wrap.scrollTo(0, chat_wrap.scrollHeight);
    })



    // chat collapse button
    const toggleButton = document.querySelector(".toggle_chat_btn");
    const video_grid = document.querySelector(".video_grid");
    const chat_grid = document.querySelector(".chat_grid");

    toggleButton.addEventListener("click", () => {
        // chat_grid.classList.toggle("collapseOn");
        // toggleButton.classList.toggle("collapseOff");
        if (chat_grid.classList.contains('collapseOn')) {
            video_grid.classList.add("collapseOff");
            chat_grid.classList.remove("collapseOn");
            toggleButton.classList.add("collapseOff");
        } else {
            video_grid.classList.remove("collapseOff");
            chat_grid.classList.add("collapseOn");
            toggleButton.classList.remove("collapseOff");
        }
    });

})();
