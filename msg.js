const mommet=require('moment');

function formatmsg(username,text)
{
    return {
        username,text,
        time:mommet().format('h:mm:a')     
    }
}
module.exports=formatmsg;