const express = require("express");

const app = express();

const db = require("./models");

const { Member } = db;

app.use(express.json());

app.get("/api/members", (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter((m) => m.team === team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});

app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: "There is member with the id!!" });
  }
});

app.post("/api/members", (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      //object객체의 keys메소드 사용하면 특정 개체의 모든 프로퍼티 조회 가능
      member[prop] = newInfo[prop];
    }); /// newInfo 객체의 모든 프로퍼티 순회하면서 각각의 프로퍼티 값을 member 객체의 같은 이름을 가진 프로퍼티의 값으로 대입
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter((member) => member.id !== Number(id));
  if (members.length < membersCount) {
    res.send({ message: "Deleted" });
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  //PORT라는 환경변수가 없으면 3000번 적용
  console.log("Server is Listening...");
});
