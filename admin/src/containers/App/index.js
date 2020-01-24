/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";
// Utils
import pluginId from "../../pluginId";
// Containers
import HomePage from "../HomePage";
import ExportData from "../ExportData";

const App = () => {
  return (
    <Switch>
      <Route
      path={`/plugins/${pluginId}/`}
      component={ExportData}
      exact
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
