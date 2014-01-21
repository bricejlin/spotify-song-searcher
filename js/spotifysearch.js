$(document).ready(function() {
  $("#spotify-search").focus();
});

function searchSpotify(query) {
  var searchStr = escape(query);
  var $tbl = $("div#tracks table tbody");
  $("tr:gt(0)", $tbl).remove(); 
  $("#info p").remove();

  $.getJSON("http://ws.spotify.com/search/1/track.json?q=" + searchStr, {}, function(response) {
    $("#info").append("<p>Results: " + response.info.num_results + " Tracks</p>");
    for (var i in response['tracks']) {
      var track = response['tracks'][i];
      var title = track.name;

      var artists = [];
      for (var j in track.artists) {
        artists.push(track.artists[j].name);
      }

      var album = track.album.name;
      var min = Math.floor(track.length/60);
      var sec = String(Math.floor(track.length%60));
      var length = min + ":" + (sec.length < 2 ? "0" + sec : sec);

      $tbl.append("<tr class='track' data-link='"+track.href+"'><td>" + title + "</td><td>" + artists.join(' , ') + "</td><td>" + album + "</td><td>" + length + "</td></tr>");
    }
  });
}