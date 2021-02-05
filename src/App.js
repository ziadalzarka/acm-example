import { useCallback, useState } from "react";
import { Container, Alert, FormGroup, Label, Input } from "reactstrap";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const handleChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        setMessages([...messages, message]);
        setMessage("");
      }
    },
    [message, messages]
  );

  return (
    <Container className="py-4">
      <FormGroup>
        <Label for="message">Write a message</Label>
        <Input
          type="text"
          name="message"
          id="message"
          placeholder="Say hello!"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </FormGroup>
      {messages.map((text) => (
        <Alert color="secondary">{text}</Alert>
      ))}
    </Container>
  );
}

export default App;
