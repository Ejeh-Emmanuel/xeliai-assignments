import './App.css'
import Card from './components/Card';
import Button from './components/Button';
import Avatar from './components/Avatar';
import Badge from './components/Badge';
import Alert from './components/Alert';

function App() {
 
  return (
    <div>
      <Card
        title="React Basics"
        description="Learn components, props, and JSX in React."
        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
        tag="React"
        featured={true}
        onClick={() => console.log("React Basics")}
      />

      <Card
        title="UI Design"
        description="Understand color theory and layout principles."
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        tag="Design"
        onClick={() => console.log("UI Design")}
      />

      <Card
        title="JavaScript ES6"
        description="Master arrow functions, destructuring, and modules."
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
        tag="JavaScript"
        featured={true}
        onClick={() => console.log("JavaScript ES6")}
      />

      <Card
        title="Backend Development"
        description="Build APIs using Node.js and Express."
        image=""
        onClick={() => console.log("Backend Development")}
      />

      <Button
        label="Primary Small"
        variant="primary"
        size="small"
        onClick={() => console.log("Primary Small")}
      />

      <Button
        label="Primary Medium"
        variant="primary"
        size="medium"
        onClick={() => console.log("Primary Medium")}
      />

      {/* Secondary Buttons */}
      <Button
        label="Secondary Medium"
        variant="secondary"
        size="medium"
        onClick={() => console.log("Secondary Medium")}
      />

      <Button
        label="Secondary Large"
        variant="secondary"
        size="large"
        onClick={() => console.log("Secondary Large")}
      />

      {/* Danger Buttons */}
      <Button
        label="Danger Small"
        variant="danger"
        size="small"
        onClick={() => console.log("Danger Small")}
      />

      <Button
        label="Danger Large"
        variant="danger"
        size="large"
        onClick={() => console.log("Danger Large")}
        disabled={true}
      />

      <Avatar
        photo="https://i.pravatar.cc/150?img=1"
        name="John Doe"
        size="small"
        online={true}
      />

      <Avatar
        photo="https://i.pravatar.cc/150?img=2"
        name="Sarah Smith"
        size="medium"
      />

      <Avatar
        photo="https://i.pravatar.cc/150?img=3"
        name="Michael Johnson"
        size="large"
        online={true}
      />

      {/* Fallback Initial Example */}
      <Avatar
        name="Emmanuel"
        size="large"
        online={false}
      />

      {/* Without dots */}
      <Badge label="Success" variant="success" />
      <Badge label="Danger" variant="danger" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Info" variant="info" />
      <Badge label="Default" variant="default" />

      {/* With dots */}
      <Badge label="Online" variant="success" dot={true} />
      <Badge label="Error" variant="danger" dot={true} />
      <Badge label="Pending" variant="warning" dot={true} />
      <Badge label="Message" variant="info" dot={true} />
      <Badge label="Neutral" variant="default" dot={true} />
  
      <Alert
        type="success"
        title="Success!"
        message="Your account has been created successfully."
      />

      <Alert
        type="error"
        title="Login Failed"
        message="Incorrect email or password."
      />

      <Alert
        type="warning"
        title="Warning"
        message="Your subscription will expire in 3 days."
      />

      <Alert
        type="info"
        title="Information"
        message="A new update is available for download."
      />
    </div>
   );
};

export default App;
