import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'

// step 1: chalo provider le akr aate h
import { Provider } from 'react-redux'
// step 2: store bhi laagega
import store from "./store/store.js"
// step 3- App ko wrap kr do provider ke ander 

import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

// ab mujhe chahiye router , to create kr lete h Browser router 
// createBrowserRouter ke ander hum ek empty arra
const router = createBrowserRouter([
  // ab isske ander 1 object de dete h
{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


// Earlier 

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}> 
//      <App />
//     </Provider>
//   </StrictMode>,
// )


// Now 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
