import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../calls/users";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function withRoleBasedAuth(Component, role) {
  return function RoleComponent(props) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
      {
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />,
      },

      {
        label: `${user ? user.name : ""}`,
        icon: <UserOutlined />,
        children: [
          {
            label: (
              <span
                onClick={() => {
                  if (user.role === "admin") {
                    navigate("/admin");
                  } else if (user.role === "partner") {
                    navigate("/partner");
                  } else {
                    navigate("/profile");
                  }
                }}
              >
                My Profile
              </span>
            ),
            icon: <ProfileOutlined />,
          },

          {
            label: (
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Log Out
              </Link>
            ),
            icon: <LogoutOutlined />,
          },
        ],
      },
    ];

    const getValidUser = async () => {
      try {
        dispatch(showLoading());
        const response = await GetCurrentUser();
        dispatch(setUser(response.data));
        dispatch(hideLoading());
      } catch (error) {
        dispatch(setUser(null));
        message.error(error.message);
      }
    };

    useEffect(() => {
      if (localStorage.getItem("token")) {
        getValidUser();
      } else {
        navigate("/login");
      }
    }, []);

    if (!user) {
      return null;
    }

    if (user.role === role || user.role === "admin") {
      return (
        <>
          <Layout>
            <Header
              className="d-flex justify-content-between"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <h3
                  className="demo-logo text-white m-0"
                  style={{ color: "white" }}
                >
                  Book My Show
                </h3>
              </Link>
              <Menu theme="dark" mode="horizontal" items={navItems} />
            </Header>
            <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
              <Component {...props} />
            </div>
          </Layout>
        </>
      );
    } else {
      return <Navigate to="/unauthorized" />;
    }
  };
}

export const withAdminAuth = (Component) =>
  withRoleBasedAuth(Component, "admin");
export const withPartnerAuth = (Component) =>
  withRoleBasedAuth(Component, "partner");
export const withUserAuth = (Component) => withRoleBasedAuth(Component, "user");
