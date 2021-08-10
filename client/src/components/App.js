import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
          <Route path="/" exact component={StreamList} />
          <Switch>
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
      </BrowserRouter>
    </div>
  );
}

export default App;
