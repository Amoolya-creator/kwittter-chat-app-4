user_name = localStorage.getItem("user_name");
document.getElementById("USER").innerHTML = user_name;

room_name = localStorage.getItem("room_name");
document.getElementById("room_name").innerHTML = room_name;

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}

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

function Send() {
    n_msg = document.getElementById("newMessage").value
    firebase.database().ref(room_name).push({ "name": user_name, "message": n_msg, "like": 0 });
    document.getElementById("newMessage").value = "";
}

xx = 0;

function getData() {
    firebase.database().ref("/").child(room_name).on('value', function (snapshot) {
        document.getElementById("out").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            firebase_msg_key = childSnapshot.key;
            firebase_msg_value = childSnapshot.val();

            if (firebase_msg_key != "purpose") {
                
                [A,B,C] = [firebase_msg_value.name,firebase_msg_value.message,firebase_msg_value.like];
                
                bg_c =  (xx++ % 2 == 0) ? "bg-danger" : "";
                A_tag = "<div class='row " + bg_c + "'><h4 class='col-sm-3 glyphicon glyphicon-user text-left'><span class='text-primary'> " + A + "</span></h4>";
                B_tag = "<h5 class='col-sm-7 text-right'>" + B + "<span> <img width=20 height=auto src='tick.png' alt='tick.png'></img></span></h5>";
                C_tag = "<button class='col-sm-2 glyphicon glyphicon-thumbs-up btn btn-success' onclick='updateLikes(\"" + firebase_msg_key + "\")'> "+C+" Likes</button></div>"
                T = A_tag + B_tag + C_tag;
                document.getElementById("out").innerHTML += T;
            }
        });
    });
}
getData();

function updateLikes(m) {    
        firebase.database().ref(room_name).child(m).once('value').then((snapshot)=> {               
        firebase.database().ref(room_name).child(m).update({ like: snapshot.val().like+1 });
    });
}
