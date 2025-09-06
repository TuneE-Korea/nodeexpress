const replyOkget = (data) => ({ stauts: "OK", code: 200, data });
const replyError = (msg) => ({ stauts: "Error", code: 400, msg });
const replyOk = (msg) => ({ stauts: "OK", code: 200, msg });
module.exports = { replyOkget, replyError, replyOk };
