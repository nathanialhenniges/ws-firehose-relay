module.exports.message = async function (evt) {
  try {
    const { type, data } = JSON.parse(evt);

    // Login Logic
    if (type === "AUTH" && data === process.env.PASSWORD) {
      this.isAuthed = true;
      console.log(`Client authorized`);
      return this.send(JSON.stringify({ type: "AUTHORIZED" }));
    }
    if (!this.isAuthed) {
      console.log(`Client unauthorized`);
      return this.send(JSON.stringify({ type: "UNAUTHORIZED" }));
    }
    console.log(this.channels)

    switch (type) {
      case "LISTEN":
        this.channels[data] = true;
        this.send(JSON.stringify({ type: "LISTEN", data }));
        console.log(`Client listening to ${data}`);
        break;
      case "UNLISTEN":
        delete this.channels[data];
        this.send(JSON.stringify({ type: "UNLISTEN", data }));
        console.log(`Client unlistening to ${data}`);
        break;
      default:
        this.send(JSON.stringify({ type: "INVALID_TYPE" }));
        console.log(`Client gave invalid type = ${data}`);
        break;
    }
  } catch {
    this.send(JSON.stringify({ type: "INVALID" }));
    console.log(`Client gave invalid  = ${data}`);
  }
}
