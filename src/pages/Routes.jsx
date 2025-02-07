import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Login from "./login";
import Layout from "../components/Layout/Layout";
import Dashboard from "../Dashboard/Dashboard";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

//const routes = 6;

export const useRouter = () => (
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='home' element={<Layout />} />
        <Route path='login' element={<Login />} />
      </>
    )
  )
);