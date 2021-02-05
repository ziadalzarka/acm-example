import { useCallback, useState, useEffect } from "react";
import { Container, Alert, FormGroup, Label, Input } from "reactstrap";
import firebase from "firebase";
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

  const updateOnNewChild = useCallback(
    (text) => {
      setMessages([...messages, text]);
    },
    [messages]
  );

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyC4mZ2myFoL_mocKYQ2pRv3NGowrvv7Kbo",
      authDomain: "acm-example.firebaseapp.com",
      projectId: "acm-example",
      storageBucket: "acm-example.appspot.com",
      messagingSenderId: "804074064637",
      appId: "1:804074064637:web:e95c0e2c0c1135028d0c94",
    };

    firebase.initializeApp(firebaseConfig);

    firebase
      .database()
      .ref("/messages")
      .on("child_added", (childSnapshot) => {
        const childData = childSnapshot.val();
        updateOnNewChild(childData);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Alert color="secondary" key={text}>
          {text}
        </Alert>
      ))}
    </Container>
  );
}

export default App;
