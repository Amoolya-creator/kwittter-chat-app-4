var firebaseConfig = {
  apiKey: "AIzaSyD5kuSZA1fKZadkn61pbkM5Ivrd1yuiwEU",
  authDomain: "kwitter-app-6cf35.firebaseapp.com",
  databaseURL: "https://kwitter-app-6cf35-default-rtdb.firebaseio.com",
  projectId: "kwitter-app-6cf35",
  storageBucket: "kwitter-app-6cf35.appspot.com",
  messagingSenderId: "281249587292",
  appId: "1:281249587292:web:9b1646bc8184bd276ac699"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user = localStorage.getItem("user_name");
document.getElementById("USER").innerHTML = user;

function add_room() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html"
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              Room_names = childKey;
              console.log("Room name - " + Room_names);
              row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
              document.getElementById("output").innerHTML += row;
        });
  });
}
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}
