// rafce -> shortcut to create component and export
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Gallery from "./pages/gallery/Gallery";
import NotFound from "./pages/not-found/NotFound";
import Plans from "./pages/plans/Plans";
import Trainers from "./pages/trainers/Trainers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/user/Profile";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Payment from "./pages/payment/Payment";

// check Role
import { userSection } from "./utils/checkRole";
import ManageOrders from "./pages/ordermanagement/OrderManage";
import ManageUsers from "./pages/manage-user/ManageUser";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="plans" element={<Plans />} />
        <Route path="trainers" element={<Trainers />} />
        {userSection && <Route path="profile/:id" element={<Profile />} />}
        {userSection?.role === 'admin' && <Route path="manage-customers" element={< ManageOrders />} />}
        {userSection?.role === 'admin' && <Route path="manage-users" element={< ManageUsers />} />}
        {userSection?.role === 'admin' && <Route path="manage-orders" element={<ManageOrders />} />}
        {userSection?.role === 'pt' && <Route path="manage-customers" element={<h1 className="text-[180px]">Manage customer registed on PT ROLE</h1>} />}
        {userSection?.role === 'customer' && <Route path="manage-pts" element={<h1 className="text-[180px]">Manage customer registed on Customer ROLE</h1>} />}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="payment/callback" element={<Payment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
