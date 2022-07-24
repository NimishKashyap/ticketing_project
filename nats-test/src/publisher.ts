import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  // we can share only strings in NATS
  // we have to convert to JSON
  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  // this data is called a message
  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});
