import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//components imports
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";
import Homepage from "../../views/homepage";
import Signin from "../../views/signin";
import Signup from "../../views/signup";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import AboutUs from "../../views/about-us";
import ContactUs from "../../views/contact-us";
import Gallery from "../../views/gallery";
import MyGallery from "../../views/myGallery";
import Contest from "../../views/contest";
import PaymentLogs from "../../views/payment-logs";
import Chat from "../../views/chat";
import News from "../../views/news";
import Profile from "../../views/profile";
import ChangePassword from "../../views/change-password";
import ContestDetails from "../../views/contest-details";
import ContestLogs from "../../views/contest-logs";
import SubscriptionLogs from "../../views/subscription-logs"
import Plans from "../../views/plans"
import Editor from "../../views/editor";
import Community from "../../views/community"


const MyRouter = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route
          path="/signin"
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Signin />{" "}
            </ClientLayout>
          }
        />

<Route
          path="/editor"
          element={
            <ClientLayout
              head={{ title: "Editor", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Editor />{" "}
            </ClientLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <ClientLayout
              head={{ title: "Signup", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Signup />{" "}
            </ClientLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ClientLayout
              head={{ title: "Profile", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Profile />{" "}
            </ClientLayout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ForgotPassword />{" "}
            </ClientLayout>
          }
        />
        <Route
          path="/forgot-password-2"
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ForgotPassword2 />{" "}
            </ClientLayout>
          }
        />

        <Route
          path="/forgot-password-3"
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ForgotPassword3 />{" "}
            </ClientLayout>
          }
        />
        <Route
          path="/"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              footer={false}
            >
              <Homepage />
            </ClientLayout>
          }
        />

        <Route
          path="/change-password"
          element={
            <ClientLayout
              head={{
                title: "Change Password",
                description: "Some Description.",
              }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ChangePassword />
            </ClientLayout>
          }
        />

<Route
          path="/about-us"
          element={
            <ClientLayout
              head={{ title: "About Us", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <AboutUs />
            </ClientLayout>
          }
        />

        
<Route
          path="/community-rules"
          element={
            <ClientLayout
              head={{ title: "Community Rules", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Community />
            </ClientLayout>
          }
        />

        <Route
          path="/contact-us"
          element={
            <ClientLayout
              head={{ title: "Contact Us", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ContactUs />
            </ClientLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <ClientLayout
              head={{ title: "Gallery", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Gallery />
            </ClientLayout>
          }
        />

<Route
          path="/my-gallery"
          element={
            <ClientLayout
              head={{ title: "My Gallery", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <MyGallery />
            </ClientLayout>
          }
        />

        <Route
          path="/contest"
          element={
            <ClientLayout
              head={{ title: "Contest", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Contest />
            </ClientLayout>
          }
        />

<Route
          path="/contest-logs"
          element={
            <ClientLayout
              head={{ title: "Contest", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ContestLogs />
            </ClientLayout>
          }
        />
        <Route
          path="/subscription-logs"
          element={
            <ClientLayout
              head={{ title: "Contest", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <SubscriptionLogs />
            </ClientLayout>
          }
        />


        <Route
          path="/contest-details/:id"
          element={
            <ClientLayout
              head={{ title: "Contest Details", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ContestDetails />
            </ClientLayout>
          }
        />

        <Route
          path="/payment-logs"
          element={
            <ClientLayout
              head={{
                title: "Completed Lessons",
                description: "Some Description.",
              }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <PaymentLogs />
            </ClientLayout>
          }
        />

<Route
          path="/plans/:id"
          element={
            <ClientLayout
              head={{ title: "plans", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Plans />
            </ClientLayout>
          }
        />

<Route
          path="/chat"
          element={
            <ClientLayout
              head={{ title: "chat", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Chat />
            </ClientLayout>
          }
        />

        <Route
          path="/news"
          element={
            <ClientLayout
              head={{ title: "news", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <News />
            </ClientLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default MyRouter;
