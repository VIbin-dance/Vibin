const fetch = require("node-fetch");

const addCalendar = (user, title, dateTime) => {
  fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?key=${process.env.API_key}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        end: {
          dateTime: dateTime + ":00",
          timeZone: "Asia/Tokyo",
        },
        start: {
          dateTime: dateTime + ":00",
          timeZone: "Asia/Tokyo",
        },
        summary: title + " Vibin'",
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "email",
              minutes: 30,
            },
          ],
        },
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      }
    });
};

module.exports = { addCalendar };
