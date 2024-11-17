import { redirect } from "next/navigation";
import CTA from "./components/LandingPage/CTA";
import Features from "./components/LandingPage/Features";
import { Hero } from "./components/LandingPage/Hero";
import Logos from "./components/LandingPage/Logos";
import Navbar from "./components/LandingPage/Navbar";
import Testimonial from "./components/LandingPage/Testimonial";
import { auth } from "./lib/auth";


export default async function Home() {
  const session = await auth();

  if(session?.user) {
    return redirect("/dashboard")
  }
  
  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonial />
      <CTA />
    </div>
  );
}
