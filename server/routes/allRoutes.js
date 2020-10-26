// const { response } = require('express');
const express = require('express');

const router = express.Router();

// connecting to local or served mysql database
const mysql = require('mysql');

let pool;

if (process.env.NODE_ENV === 'production') {
  pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
} else {
  pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'aissa',
    password: 'cohortx',
    database: 'homeHealthAgency',
  });
  // eslint-disable-next-line no-console
  console.log('end of pool');
}

// essentially a route for testing
router.get('/', (request, response, next) => {
  response.send('hello from api root!');
});

// endpoint for users logging in. Adds user to DB, returns
// newUser w/ {Id, name, active} to front end
// router.post("/login", (request, response, next) => {
//   // Create a new user and add them to database
//   if (!request.body.username) {
//     // eslint-disable-next-line no-console
//     console.log("Please add a username");
//   }

//   const newUser = {
//     user_Id: Math.floor(Math.random() * 50000),
//     name: request.body.username,
//     active: 1,
//   };
//   // Query the pool
// //   pool.query(
//     "insert into users (user_Id, username, active, timestamp) values (?, ?, ?, CURRENT_TIMESTAMP)",
//     [newUser.user_Id, newUser.name, newUser.active],
//     (error, results, fields) => {
//       if (error) throw error;
//       pool.query(
//         "select user_Id, username, active, timestamp from users where user_Id = ?",
//         newUser.user_Id,
//         (error, results, fields) => {
//           if (error) throw error;
//           response.send(results[0]);
//         }
//       );
//     }
//   );
// });

// endpoint for grabbing all patients
router.get('/patients', (request, response, next) => {
  // Query the pool
  pool.query('select * from ptTable', (error, results, fields) => {
    // Handle error after the release.
    if (error) throw error;
    // send newUser to front end
    response.send(results);
  });
});

// endpoint for grabbing all nurses with their assigned patients
router.get('/nurses/:nurse', (request, response, next) => {
  // Query the pool
  pool.query('SELECT rnTable.rnFirstName, rnTable.rnLastName, rnTable.rnHomeLng, rnTable.rnHomeLat, ptTable.ptFirstName, ptTable.ptLastname, ptTable.ptHomeLng, ptTable.ptHomeLat, ptTable.nursingNeed FROM rnTable INNER JOIN ptTable ON rnTable.rn_Id=ptTable.rn_Id WHERE rnTable.rn_Id = ?', request.params.nurse, (error, results, fields) => {
    // Handle error after the release.
    if (error) throw error;
    // send nurse info and pt list to front end
    response.send(results);
  });
});

// //
// // endpoint for users logging out. Changes user's active status back to 0 in db
// router.post('/logout', (request, response, next) => {
//   // Query the pool
//   console.log('the logout request has ', request.body.user_Id);
//   console.log('a', typeof request.body.user_Id);
//   pool.query(
//     'update users set active = 0 where user_Id = ?',
//     request.body.user_Id,
//     (error, results, fields) => {
//       // Handle error after the release.
//       if (error) throw error;
//       const goodUser = request.body.user_Id; // send logged out user to front end as confirmation
//       response.send(goodUser);
//     });
// });

// // endpoint for retrieving all channels - use for left list bar
// router.get('/channels', (request, response, next) => {
//   // Query the pool
//   pool.query('select * from channels', (error, results, fields) => {
//     // Handle error after the release.
//     if (error) throw error;
//     // send channels to front end
//     response.send(results);
//   });
// });

// // endpoint for retrieving one channel with messages
// router.get('/channels/:channelId/messages', (request, response, next) => {
//   // query the pool
//   console.log(`getting group messages for channel ${request.params.channelId}`);
//   pool.query(
//     'SELECT m.content, m.timestamp, m.channel_Id, u.username FROM messages m INNER JOIN users u ON m.user_Id=u.user_Id WHERE m.channel_Id = ? ORDER BY m.timestamp ASC',
//     request.params.channelId,
//     (error, results, fields) => {
//       if (error) throw error;
//       console.log(results);
//       // send {content: <message>} to front end
//       response.send(results);
//     },
//   );
// });

// // endpoint to create a new message.
// router.post('/channels/:channelId/messages', (request, response, next) => {
//   if (!request.body.content) {
//     console.log(
//       `create message with ${request.body.content} and userid ${request.body.user_Id} and channel ${request.params.channelId}`,
//     );
//   }
//   // Create the new message
//   const newMessage = {
//     message_Id: Math.floor(Math.random() * 50000),
//     channel_Id: request.params.channelId,
//     user_Id: request.body.user_Id,
//     content: request.body.content,
//   };
//   // Query the pool
//   pool.query(
//     'insert into messages (message_Id, channel_Id, user_Id, content, timestamp) values (?, ?, ?, ?, CURRENT_TIMESTAMP)',
//     [
//       newMessage.message_Id,
//       newMessage.channel_Id,
//       newMessage.user_Id,
//       newMessage.content,
//     ],
//     (error, results, fields) => {
//       // Handle error after the release.
//       if (error) throw error;
//       pool.query(
//         'select message_Id, channel_Id, content, user_Id, timestamp from messages where message_Id = ?',
//         newMessage.message_Id,
//         (error, results, fields) => {
//           if (error) throw error;
//           response.send(results[0]);
//         },
//       );
//     },
//   );
// });

// // endpoint to create a new channel/conversation
// router.post('/channels', (request, response, next) => {
//   // If a channelName is submitted, use it. Otherwise, name the channel for users.
//   let newChannelName = '';
//   if (request.body.channelName) {
//     newChannelName = request.body.channelName;
//   } else {
//     newChannelName = `${request.body.firstUserId}/${request.body.secondUserId}`;
//   }
//   // define the new channel's parameters
//   const newChannel = {
//     channel_Id: Math.floor(Math.random() * 50000),
//     channelName: newChannelName,
//     firstUser_Id: request.body.firstUserId,
//     secondUser_Id: request.body.secondUserId,
//   };
//   // Query the pool
//   pool.query(
//     'insert into channels (channel_Id, channelName, firstUser_Id, secondUser_Id) values (?, ?, ?, ?)',
//     [
//       newChannel.channel_Id,
//       newChannel.channelName,
//       newChannel.firstUser_Id,
//       newChannel.secondUser_Id,
//     ],
//     (error, results, fields) => {
//       if (error) throw error;
//       // select the new channel and return it
//       pool.query(
//         'select channel_Id, channelName, firstUser_Id, secondUser_Id from channels where channel_Id = ?',
//         newChannel.channel_Id,
//         (error, results, fields) => {
//           // send newUser to front end
//           response.send(results);
//         },
//       );
//     },
//   );
// });

module.exports = router;
