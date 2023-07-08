import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {store} from "../store";
import { Provider } from "react-redux";
import Navbar from "@/features/navBar/NavBar";
import ErrorBoundary from "@/features/Error/errorBoundary";
import { Toaster } from "react-hot-toast";
import Notification from "@/features/notification";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
    <Provider store={store}>
      <Notification/>
      <div className='container mx-auto font-sans max-w-sm pb-32'>
        <Navbar/>
        <Toaster/>
      
      <Component {...pageProps} />
      </div>
    </Provider>
    </ErrorBoundary>
  );
}
