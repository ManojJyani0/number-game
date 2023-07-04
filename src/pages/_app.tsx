import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {store} from "../store";
import { Provider } from "react-redux";
import Navbar from "@/features/navBar/NavBar";
import ErrorBoundary from "./errorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
    <Provider store={store}>
      <div className='container mx-auto font-sans max-w-sm pb-32'>
        <Navbar/>
      <Component {...pageProps} />
      </div>
    </Provider>
    </ErrorBoundary>
  );
}
