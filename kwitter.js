function addUser() {
user_name = document.getElementById("user_name").value;
localStorage.setItem("user_name",user_name);
window.location = "kwitter_room.html";
}

m_1 = "See what is happening in the world right now";
m_1_split = m_1.split(" ");
var m_1_text = "";
R=()=> {return Math.floor(Math.random() * 255);};
m_1_split.forEach(ele => {
    m_1_text += "<span style='color: rgb(" + R() + "," + R() + "," + R()+ ")'>" + ele + " " + "</span>";
});
document.getElementById("m1").innerHTML = m_1_text;
