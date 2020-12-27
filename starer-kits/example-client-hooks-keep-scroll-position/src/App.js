import React, { useState, useCallback } from "react";
import List from "./List";

import Container from "react-bootstrap/Container";
import data from "./data";

export default function App() {
  // This state can be stored also for example in Redux
  const [currentView, setCurrentView] = useState("list");

  const handleToggleCurrentView = useCallback(() => {
    setCurrentView(view => (view === "list" ? "grid" : "list"));
  }, [setCurrentView]);

  return (
    <Container>
      <List
        items={data}
        currentView={currentView}
        onToggleCurrentView={handleToggleCurrentView}
      />
    </Container>
  );
}
