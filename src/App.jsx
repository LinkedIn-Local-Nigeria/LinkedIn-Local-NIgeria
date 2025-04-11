import "@radix-ui/themes/styles.css";
import "./App.css";

import Home from "./components/Home";
import Layout from "./components/ui/Layout";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <Layout>
      <Theme>
        <Home />
      </Theme>
    </Layout>
  );
}

export default App;
