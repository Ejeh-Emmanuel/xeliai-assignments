import Card from './components/Card'
import Button from './components/Button'
import Avatar from './components/Avatar'
import './App.css'

function App() {
  return (
    <div>
      <Card title="React Basics" description="Learn components and props."
        tag="React" featured={true} />
      <Card title="CSS Grid" description="Master modern layout."
        tag="CSS" />
      <Card title="Git Workflow" description="Version control for teams."
        image="https://i.pravatar.cc/300?img=5" />
      <Card title="API Calls" description="Fetch data with async/await."
        tag="API" featured={false} />
      

      <Button label="Save" variant="primary" size="medium"
        onClick={() => console.log("Saved!")} />
      <Button label="Cancel" variant="secondary" size="medium" />
      <Button label="Delete" variant="danger" size="small"
        onClick={() => console.log("Deleted")} />
      <Button label="Submit" variant="primary" size="large"  onClick={() => alert("hello submit clicked")}/>
      <Button label="Disabled" variant="primary" disabled={true} />
      <Button label="With Icon" variant="primary" icon="■" />

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* Test 1: Small & Online */}
        <Avatar
          photo="https://i.pravatar.cc/80?img=11"
          name="Alice Smith"
          size="small"
          online={true}
        />

        {/* Test 2: Medium (Default Size) & Offline */}
        <Avatar
          photo="https://i.pravatar.cc/80?img=12"
          name="Bob Jones"
          online={false}
        />

        {/* Test 3: Large & Online */}
        <Avatar
          photo="https://i.pravatar.cc/80?img=13"
          name="Charlie Brown"
          size="large"
          online={true}
        />

        {/* Test 4: Medium & Online (Fallback Initial Test) */}
        <Avatar
          name="Diana Prince"
          size="medium"
          online={true}
        />
      </div>

      

    </div>

  )
}

export default App
