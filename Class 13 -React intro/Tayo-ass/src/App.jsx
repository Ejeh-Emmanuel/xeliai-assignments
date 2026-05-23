import Avatar from "./components/Avatar";
import "./index.css";
import Badge from "./Components/Badge";
import Alert from "./Components/Alert";
import Card from "./Components/Card";

export default function App() {
  return (
    <div className="container">
      <h1>Avatar Component</h1>

      <Avatar
        name="John Doe"
        photo="https://i.pravatar.cc/80?img=1"
        size="small"
        online={true}
      />

      <Avatar
        name="Sarah Smith"
        photo="https://i.pravatar.cc/80?img=12"
        size="medium"
        online={false}
      />

      <Avatar
        name="Michael Brown"
        photo="https://i.pravatar.cc/80?img=22"
        size="large"
        online={true}
      />

      {/* Fallback without photo */}
      <Avatar
        name="Tayo"
        size="large"
        online={false}
      />

      <h1>Badge Component</h1>

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
      <Badge label="Offline" variant="default" dot={true} />

      {/* Bonus count prop */}
      <Badge
        label="Notifications"
        variant="danger"
        dot={true}
        count={5}
      />

      <h1>Alert Component</h1>

      <Alert
        type="success"
        title="Success"
        message="Your account has been created successfully."
        dismissible={true}
      />

      <Alert
        type="error"
        title="Error"
        message="Something went wrong while processing your request."
        dismissible={true}
      />

      <Alert
        type="warning"
        title="Warning"
        message="Your password will expire in 3 days."
      />

      <Alert
        type="info"
        title="Information"
        message="New updates are available for download."
      />


       <Card
        title="Learn React"
        description="React helps you build interactive UIs easily."
        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
        tag="React"
        featured={true}
        onClick={() => alert("React Card Clicked")}
      />

      <Card
        title="UI Design Basics"
        description="Understand spacing, typography, and color systems."
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        tag="Design"
      />

      <Card
        title="JavaScript Essentials"
        description="Master variables, functions, arrays, and objects."
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
        tag="JavaScript"
      />

      <Card
        title="Frontend Development"
        description="Build modern responsive websites and apps."
        featured={true}
      />


      






    </div>
  );
}