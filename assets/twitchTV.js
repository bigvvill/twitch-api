var userNames = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "GamesDoneQuick", "habathcx", "RobotCaleb", "noobs2ninjas", "MeteorDev", "SYNTAG", "comster404", "brunofin"];
var offlineUser = [];

var imagePlaceholder = "https://codetojoy.000webhostapp.com/assets/twitchtv-logo.png";

$('#outputDiv').append(
                "<div class= 'flex-item-header'><div class='row'><div class='col-xs-7'>Streamer</div><div class='col-xs-5'>Info</div>");

for (var i=0; i < userNames.length; i++){
var userName = userNames[i];
$.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/streams/" + userNames[i],
      dataType: "json",
      success: function(data){    

        console.log(data);
        if (data.stream === null) {
          offlineUser = data._links.channel.substring(data._links.channel.lastIndexOf("/") + 1, data._links.channel.length);
          console.log(offlineUser);
          getChannelInfo(offlineUser);

        } else {
          $('#outputDiv').append(
            "<a href='" + data.stream.channel.url + "' target= '_blank'><div class='flex-item'><div class='col-xs-2'><img src='" + data.stream.channel.logo + "'></div><div class='col-xs-5'>" + data.stream.channel.display_name + "</div><div class='col-xs-5'>" + data.stream.channel.game + " / " + Math.floor(data.stream.average_fps) + "fps / " + "Viewers: " + data.stream.viewers + "</div><br>");
        }
      }
      });
}

function getChannelInfo(userName) {
  //for (i = 0; i < userNames.length; i++) {
    $.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/channels/" + userName,
      dataType: "json",
      success: function(data){
        if (data.status === 404) {
          currentUserName = data.message;
          currentStatus = data.status;
          $('#outputDiv').append(
            "<div class='flex-item-3'><div class='col-xs-2'><img src='" + imagePlaceholder + "'></div><div class='col-xs-10'>" + data.message +  "</div></div>");
        } else if (data.logo === null) {
          currentLogo = "https://codetojoy.000webhostapp.com/assets/twitchtv-logo.png";
          $('#outputDiv').append(
            "<a href='" + data.url + "' target= '_blank'><div class='flex-item-2'><div class='col-xs-2'><img src='" + currentLogo + "'></div><div class='col-xs-5'>" + data.display_name +  "</div><div class='col-xs-5'>Offline</div></div>");
        } else {
          $('#outputDiv').append(
            "<a href='" + data.url + "' target= '_blank'><div class='flex-item-2'><div class='col-xs-2'><img src='" + data.logo + "'></div><div class='col-xs-5'>" + data.display_name +  "</div><div class='col-xs-5'>Offline</div></div>");
        }
      }
  });
  }
//}
    