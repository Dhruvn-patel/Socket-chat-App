const users_arr=[];
function userJoin(id,username,room)
{
    const user={id,username,room}     
    users_arr.push(user);
    return user;
}

function getCurrUser(id)
{
    return users_arr.find(user=>user.id===id);
}

function userLeave(id)
{

    const user_id =users_arr.findIndex(user=>user.id===id);
    if(user_id!==-1)
    {
        //return one user details
        return users_arr.splice(user_id,1)[0];
    }
}
function getRoomUsers(room)
{
   return users_arr.filter(user=>user.room===room);
}
module.exports={
    userJoin,
    getCurrUser,
    userLeave,
    getRoomUsers
}