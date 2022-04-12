import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import LandingScreenforCheck from './Components/LandingScreenforCheck'
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/Users";
import AddUser from "./Components/Users/AddUser";
import UserDetail from "./Components/Users/UserDetail";
import EditUser from "./Components/Users/EditUser";
import Posts from "./Components/Posts/Posts";
import AddPost from "./Components/Posts/AddPost";
import EditPost from "./Components/Posts/EditPost";
import Pages from "./Components/Pages/Pages";
import EditPage from "./Components/Pages/EditPage";
import ViewPage from "./Components/Pages/ViewPage";
import AddCategory from "./Components/Categories/AddCategory";
import EditCategory from "./Components/Categories/EditCategory";
import Notifications from "./Components/PushNotifications/Notifications";
import Contact from "./Components/Contact/Contact";
import Resources from "./Components/Resources/Resorces";
import AddPage from "./Components/Pages/AddPage";
import AddPackage from "./Components/Packages/AddPackage";
import Packages from "./Components/Packages/Packages";
import PackageDetail from "./Components/Packages/PackageDetail";
import EditPackage from "./Components/Packages/EditPackage";
import PostDetail from "./Components/Posts/PostDetail";
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/user/add" component={AddUser} />
          <Route exact path="/user/detail/:_id" component={UserDetail} />
          <Route exact path="/user/edit/:_id" component={EditUser} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/post/add" component={AddPost} />
          <Route exact path="/post/edit/:_id" component={EditPost} />
          <Route exact path="/post/detail/:_id" component={PostDetail} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/pages" component={Pages} />
          <Route exact path="/pages/add" component={AddPage} />
          <Route exact path="/page/edit/:_id" component={EditPage} />
          <Route exact path="/page/view/:_id" component={ViewPage} />
          <Route exact path="/categories" component={AddCategory} />
          <Route exact path="/category/edit/:_id" component={EditCategory} />
          <Route exact path="/packages/add" component={AddPackage} />
          <Route exact path="/packages" component={Packages} />
          <Route exact path="/packages/detail/:_id" component={PackageDetail} />
          <Route exact path="/packages/edit/:_id" component={EditPackage} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/resources" component={Resources} />
          <LandingScreenforCheck />
        </Switch>

      </BrowserRouter>
    </>
  );
}

export default App;
