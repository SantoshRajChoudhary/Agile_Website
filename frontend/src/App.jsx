import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import WhatWeDoBestDetail from "./pages/whatwedobestDetail";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import WhatWeDoBest from "./pages/whatwedobest";
import ServiceDetail from "./pages/ServiceDetail";
import IndexJsDetails from "./pages/indexjsDetails";
import Career from "./pages/Career";

import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        <BrowserRouter>
          <ScrollToTop />

          <Toaster />
          <Sonner />

          {/* GLOBAL HEADER */}
          <Header />

          {/* MAIN CONTENT */}
          <main className="pt-[72px] bg-background min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/career" element={<Career />} />
              <Route path="/whatwedobest" element={<WhatWeDoBest />} />
              <Route
                path="/whatwedobest/:slug"
                element={<WhatWeDoBestDetail />}
              />
              <Route
                path="/indexJsDetails/:slug"
                element={<IndexJsDetails />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* GLOBAL FOOTER */}
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
