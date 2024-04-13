import { Link, Outlet } from "react-router-dom";
import { useAuth } from "provider/Auth";
import { SchemaProvider, useSchema } from "provider/Schema";

export function Layout() {
  return (
    <SchemaProvider>
      <Navigation />
      <Outlet />
    </SchemaProvider>
  );
}

function Navigation() {
  const { nodes } = useSchema();
  const { logout } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      {Object.keys(nodes).map((key) => (
        <div key={key}>
          <Link to={"/" + key}>{key}</Link>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
