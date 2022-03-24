const con = require('./conn')

const createUser = (email, password) => {
    const sql = "INSERT INTO `users`(email, password) VALUES('" + email + "', '" + password + "')";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User added!!");
    });
}

const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `users` WHERE email='" + email + "' AND password='" + password + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const saveCode = (uid, code) => {
    const currentTime = new Date()
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `code` SET code='" + code + "', time='" + currentTime + "' WHERE uid='" + uid + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            if (result.affectedRows == 0) {
                const sqlInsert = "INSERT INTO `code`(uid, code, time) VALUES ('" + uid + "', '" + code + "', '" + currentTime + "')";
                con.query(sqlInsert, function (err, result) {
                    if (err) reject(err);
                    resolve(result)
                })
            } else {
                resolve(result)
            }
        });
    })
}

const getCurrentCode = (uid) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `code` WHERE uid='" + uid + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

module.exports = { createUser, loginUser, saveCode, getCurrentCode }