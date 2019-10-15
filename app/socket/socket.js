var notes = [];
var socketCount = 0;
module.exports = function (io) {
console.log(io)
    io.on('connection', (socket) => {
        socketCount++;
        var socketuserId;
        var socketkpostID;


        socket.emit('userconnected', socketCount);

        //socket.join(socketCount);
        // User Join Start here 
        socket.on('user-join', function (data) {
            console.log(data)
            console.log("data")
            socketuserId = id = parseInt(data.socketCount);

            socketkpostID = data.kpostID;
            socket.join(data.kpostID);
            // New note added, push to all sockets and insert into db
            console.log("============" + data.kpostID + '====' + data.socketCount);

            // Use node's db injection format to filter incoming data
            var dbcon = db.connect();
            var sql = "update KPOST_LOGIN_SESSION set SOCKETID='" + data.socketCount + "'where KPOSTID='" + data.kpostID + "'";

            dbcon.query(sql).on('result', function (result) {
                console.log(result.affectedRows)
                console.log(" Record(s) updated");
            }).on('error', function (err) {
                console.log("[mysql error]", err);
            }).on('end', function (data) {
                console.log(data)
                //Result return to request respons 
            });
            notes = [];
            var sqlcontact = "select * from KPOST_USER_CONTACTS where KPOSTID='" + data.kpostID + "' and CONTACTID in(select KPOSTID from KPOST_LOGIN_SESSION where SOCKETID is not null)";
            dbcon.query(sqlcontact).on('result', function (result) {
                notes.push(result)
            }).on('error', function (err) {
                console.log("[mysql error]", err);
            }).on('end', function () {

                //Result return to request respons 
                // Only emit notes after query has been completed
                io.to(data.kpostID).emit('online-contact', notes)
                // Who are in online(Send message to All  ) 
                socket.broadcast.emit('new-contact', data);
            });
        })
        // User Join End here  

        socket.on('typing', function (isTyping) {
            console.log(isTyping)
            var flag = isTyping.flag;
            if (flag == "true") {
                grouponlinemember = [];
                console.log(isTyping.flag);
                var dbcon = db.connect();
                var sqlq = "select * from TBL_KPOST_USERGROUP_MEMBERDETAILS where GROUPID in (select GROUPID from TBL_KPOST_USERGROUP_MASTER where GROUPKPOSTID='" + isTyping.selectedPerson + "')and KPOSTID in (select KPOSTID from KPOST_LOGIN_SESSION where SOCKETID is not null)";
                dbcon.query(sqlq).on('result', function (data) {
                    // Push results onto the notes array
                    console.log("Group members")
                    if (isTyping.user.kpostID != data.KPOSTID) {
                        grouponlinemember.push(data)
                    }
                }).on('error', function (err) {
                    console.log("[mysql error]", err);
                }).on('end', function () {
                    // Only emit notes after query has been completed

                    for (i = 0; i < grouponlinemember.length; i++) {
                        console.log(grouponlinemember[i].KPOSTID);

                        var obj = {
                            flag: isTyping.flag,
                            selectedID: isTyping.selectedPerson,
                            typingUser: isTyping.user,
                            typingUserName: isTyping.userName
                        }
                        io.sockets.in(grouponlinemember[i].KPOSTID).emit('updateTyping', obj);

                    }


                });
            }
            else {
                if (isTyping.selectedPerson != null && isTyping.user != null) {
                    var obj = {
                        flag: isTyping.flag,
                        selectedID: isTyping.selectedPerson,
                        typingUser: isTyping.user,
                        typingUserName: isTyping.userName
                    }

                    io.sockets.in(isTyping.selectedPerson).emit('updateTyping', obj);
                }
                else {
                    console.log("Missing Parameters for 'Typing'");
                }
            }
        });

        socket.on('sendmessage', function (data) {
            console.log("Send Message");
            console.log(data);
            if (data.flag == "true") {
                grouponlinemember = [];
                var dbcon = db.connect();
                var sqlq = "select * from TBL_KPOST_USERGROUP_MEMBERDETAILS where GROUPID in (select GROUPID from TBL_KPOST_USERGROUP_MASTER where GROUPKPOSTID='" + data.selectedPerson + "')and KPOSTID in (select KPOSTID from KPOST_LOGIN_SESSION where SOCKETID is not null)";
                dbcon.query(sqlq).on('result', function (onlineGroupdata) {
                    // Push results onto the notes array
                    console.log("Group members")
                    if (data.user != onlineGroupdata.KPOSTID) {
                        grouponlinemember.push(onlineGroupdata)
                    }
                }).on('error', function (err) {
                    console.log("[mysql error]", err);
                }).on('end', function () {
                    // Only emit notes after query has been completed
                    console.log("grouponlinemember:");
                    console.log(grouponlinemember);
                    for (i = 0; i < grouponlinemember.length; i++) {
                        console.log(grouponlinemember[i].KPOSTID);

                        var obj = {
                            flag: data.flag,
                            senderID: data.user,
                            UserName: data.userName,
                            message: data.chatmessage,
                            selectedID: data.selectedPerson
                        }
                        io.sockets.in(grouponlinemember[i].KPOSTID).emit('receivemessage', obj);
                    }

                });
            }
            else {
                var obj = {
                    flag: data.flag,
                    senderID: data.user,
                    UserName: data.userName,
                    message: data.chatmessage
                }
                io.sockets.to(data.selectedPerson).emit('receivemessage', obj);
            }

        });
        socket.on('messagereadupdate', function (data) {
            console.log("datadatadata");
            console.log(data)

            //         select distinct(sender) as sender,count(sender) as countestt from kpost_new.KPOST_KATCHUP_MESSAGES 
            //         where messagestatus=1 and receiver='manirathinam' and BLOCKEDCONTACT=false group by sender;

            //         select distinct(RECEIVERGROUPID) as sender,count(RECEIVERGROUPID) as count from KPOST_KATCHUP_GROUPREADSTATUS 
            // where RECEIVER ='manirathinam' and readStatus ='N' and RECEIVERGROUPID in 
            // (select master.groupKPOSTID from TBL_KPOST_USERGROUP_MEMBERDETAILS details inner join 
            // TBL_KPOST_USERGROUP_MASTER master where kpostID='manirathinam') group by RECEIVERGROUPID;


            var dbcon = db.connect();
            var sql = "update KPOST_KATCHUP_MESSAGES set messagestatus=1 where KPOSTID='" + socketkpostID + "'";
            dbcon.query(sql).on('result', function (result) {
                console.log(result + " record(s) disconnect-contact updated");
            }).on('error', function (err) {
                console.log('Browser disconnecte ==> Error');
            }).on('end', function () {
                socket.broadcast.emit('disconnect-contact', socketkpostID);
                db.close();
            });

        })
        socket.on('messageunreadcount', function (data) {
            console.log("datadatadata");
            console.log(data)
            var dbcon = db.connect();
            dbcon.query(sql).on('result', function (result) {
                console.log(result + " sample");
            }).on('error', function (err) {
                console.log('Sample');
            }).on('end', function () {
                db.close();
            });

        })

        socket.on('disconnect', function () {
            console.log('Browser disconnected');
            console.log('Browser disconnected socketkpostID:' + socketkpostID);
            var dbcon = db.connect();
            var sql = "update KPOST_LOGIN_SESSION set SOCKETID=null where KPOSTID='" + socketkpostID + "'";
            dbcon.query(sql).on('result', function (result) {
                console.log(result + " record(s) disconnect-contact updated");
            }).on('error', function (err) {
                console.log('Browser disconnecte ==> Error', err);
            }).on('end', function () {
                socket.broadcast.emit('disconnect-contact', socketkpostID);
                db.close();
            });
        });

        socket.on('user-disconnect', function (data) {

            const socketkpostID = data.kpostID

            var sql = "update KPOST_LOGIN_SESSION set SOCKETID=null where KPOSTID='" + socketkpostID + "'";
            var dbcon = db.connect();
            dbcon.query(sql).on('result', function (result) {
                console.log(result + " record(s) disconnect-contact updated");
            }).on('error', function (err) {
                console.log('user disconnecte(Logout) ==> Error', err);
            }).on('end', function () {
                socket.broadcast.emit('disconnect-contact', socketkpostID);
                db.close();
            });

        });

    });
}
