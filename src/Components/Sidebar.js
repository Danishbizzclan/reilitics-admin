import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../assests/dashboard.svg';
import { ReactComponent as UsersIcon } from '../assests/users.svg';
import { ReactComponent as PostsIcon } from '../assests/posts.svg';
import { ReactComponent as CategoriesIcon } from '../assests/categories.svg';
import { ReactComponent as PagesIcon } from '../assests/page.svg';
import { ReactComponent as PackagesIcon } from '../assests/package.svg';
import { ReactComponent as SettingsIcon } from '../assests/settings.svg';
import { Drawer, Button } from 'antd';
const Sidebar = () => {
    const Logout = () => {
        localStorage.clear();
    }
    const [visible, setVisible] = useState(false);
    // eslint-disable-next-line
    const [placement, setPlacement] = useState('left');

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
<Button type="primary" onClick={showDrawer} className="sidebtn">
                    Sidebar
                </Button>
                <Drawer
                    // title="Menu"
                    placement={'left'}
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key={placement}
                >
                    {/* Dashboard */}
                <div className='pt-5'>
                    <Link to="/dashboard">
                        <DashboardIcon />
                        <button className="btn White font_15" type="button">
                            Dashboard
                        </button>
                    </Link>
                </div>
                {/* Users */}
                <div>
                    <Link to="/users">
                        <UsersIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#users" aria-expanded="false" aria-controls="users">
                            Users
                        </button>
                    </Link>
                    <div className="collapse" id="users">
                        <Link to="/user/add">
                            <button className="btn White font_15 marginLeft_2" type="button">
                                Add User
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Posts */}
                <div>
                    <Link to="/posts">
                        <PostsIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#posts" aria-expanded="false" aria-controls="posts">
                            Posts
                        </button>
                    </Link>
                    <div className="collapse" id="posts">
                        <Link to="/post/add">
                            <button className="btn White font_15 marginLeft_2" type="button">
                                Add Post
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Categories */}
                <div>
                    <Link to="/categories">
                        <CategoriesIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#categories" aria-expanded="false" aria-controls="categories">
                            Categories
                        </button>
                    </Link>
                    <div className="collapse" id="categories">
                        <Link to="/categories">
                            <button className="btn marginLeft_2 White font_15" type="button">
                                Add Categories
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Pages */}
                <div>
                    <Link to="/pages">
                        <PagesIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#pages" aria-expanded="false" aria-controls="pages">
                            Pages
                        </button>
                    </Link>
                    <div className="collapse" id="pages">
                        <Link to="/pages/add">
                            <button className="btn marginLeft_2 White font_15" type="button">
                                Add Page
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Resources */}
                <div>
                    <Link to="/resources">
                        <PagesIcon />
                        <button className="btn White font_15" type="button">
                            Resources
                        </button>
                    </Link>
                </div>
                {/* Contact*/}
                <div>
                    <Link to="/contact">
                        <PagesIcon />
                        <button className="btn White font_15" type="button">
                            Contact Form
                        </button>
                    </Link>
                </div>
                {/* Packages & Pricing */}
                <div>
                    <Link to="/packages">
                        <PackagesIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#package" aria-expanded="false" aria-controls="package">
                            Packages & Pricing
                        </button>
                    </Link>
                    <div className="collapse" id="package">
                        <Link to="/packages/add">
                            <button className="btn marginLeft_2 White font_15" type="button">
                                Add Package
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Settings */}
                <div>
                    <Link to="/notifications">
                        <SettingsIcon />
                        <button className="btn White font_15" type="button">
                            Settings
                        </button>
                    </Link>
                </div>
                {/* Logout */}
                <div onClick={Logout}>
                    <NavLink to="/logout">
                        <SettingsIcon />
                        <button className="btn White font_15" type="button">
                            Logout
                        </button>
                    </NavLink>
                </div>
                </Drawer>
            <div className="sidebar">
                
                {/* Dashboard */}
                <div className='pt-5'>
                    <Link to="/dashboard">
                        <DashboardIcon />
                        <button className="btn White font_15" type="button">
                            Dashboard
                        </button>
                    </Link>
                </div>
                {/* Users */}
                <div>
                    <Link to="/users">
                        <UsersIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#users" aria-expanded="false" aria-controls="users">
                            Users
                        </button>
                    </Link>
                    <div className="collapse" id="users">
                        <Link to="/user/add">
                            <button className="btn White font_15 marginLeft_2" type="button">
                                Add User
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Posts */}
                <div>
                    <Link to="/posts">
                        <PostsIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#posts" aria-expanded="false" aria-controls="posts">
                            Posts
                        </button>
                    </Link>
                    <div className="collapse" id="posts">
                        <Link to="/post/add">
                            <button className="btn White font_15 marginLeft_2" type="button">
                                Add Post
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Categories */}
                <div>
                    <Link to="/categories">
                        <CategoriesIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#categories" aria-expanded="false" aria-controls="categories">
                            Categories
                        </button>
                    </Link>
                    <div className="collapse" id="categories">
                        <Link to="/categories">
                            <button className="btn marginLeft_2 White font_15" type="button">
                                Add Categories
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Pages */}
                <div>
                    <Link to="/pages">
                        <PagesIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#pages" aria-expanded="false" aria-controls="pages">
                            Pages
                        </button>
                    </Link>
                    <div className="collapse" id="pages">
                        <Link to="/pages/add">
                            <button className="btn marginLeft_2 White font_15" type="button">
                                Add Page
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Resources */}
                <div>
                    <Link to="/resources">
                        <PagesIcon />
                        <button className="btn White font_15" type="button">
                            Resources
                        </button>
                    </Link>
                </div>
                {/* Contact*/}
                <div>
                    <Link to="/contact">
                        <PagesIcon />
                        <button className="btn White font_15" type="button">
                            Contact Form
                        </button>
                    </Link>
                </div>
                {/* Packages & Pricing */}
                <div>
                    <Link to="/packages">
                        <PackagesIcon />
                        <button className="btn White font_15" type="button" data-toggle="collapse" data-target="#package" aria-expanded="false" aria-controls="package">
                            Packages & Pricing
                        </button>
                    </Link>
                    <div className="collapse" id="package">
                        <Link to="/packages/add">
                            <button className="btn marginLeft_2 White font_15" type="button">
                                Add Package
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Settings */}
                <div>
                    <Link to="/notifications">
                        <SettingsIcon />
                        <button className="btn White font_15" type="button">
                            Settings
                        </button>
                    </Link>
                </div>
                {/* Logout */}
                <div onClick={Logout}>
                    <NavLink to="/logout">
                        <SettingsIcon />
                        <button className="btn White font_15" type="button">
                            Logout
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar;