"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI scrutinizes every detail of your photo, from background and lighting to head position and expression.",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Global Standards",
      description: "Check your photo's compliance against the specific, up-to-date requirements for dozens of countries worldwide.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      title: "Privacy First",
      description: "Your photos are processed securely and are never stored. We respect your privacy above all else.",
    },
  ];

  const faqItems = [
    {
      question: "Is my photo stored on your servers?",
      answer: "No. Your privacy is our top priority. Photos are processed in memory and never saved to our servers. The analysis is ephemeral, and your data is gone once you leave the page."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI is trained on thousands of officially approved and rejected passport photos across multiple countries. While we strive for the highest accuracy, this tool should be used as an advisory guide to maximize your chances of approval. Always double-check with official government sources."
    },
    {
      question: "Is this service free?",
      answer: "Yes, our basic compliance checker is currently free to use. We may introduce premium features in the future for professional photographers or visa agencies."
    }
  ];

  return (
    <div className="w-full bg-zinc-950 text-gray-200 overflow-x-hidden">
      <div className="relative isolate">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <main>
          <section className="text-center py-20 md:py-32">
            <div className="container mx-auto px-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                  Perfect Passport Photos, <br /> Guaranteed.
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
                  Avoid rejection and delays. Our AI-powered tool instantly verifies your passport photo against official government requirements, ensuring it's perfect the first time.
                </p>
                <div className="mt-10">
                  <Link href="/checker">
                    <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-transform transform hover:scale-105">
                      Check Your Photo Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose PhotoCheck?</h2>
                <p className="mt-4 max-w-xl mx-auto text-gray-400">
                  Get peace of mind with our state-of-the-art compliance checker.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative p-[1px] bg-gradient-to-br from-blue-500/30 to-zinc-500/30 rounded-2xl overflow-hidden"
                  >
                    <div className="p-8 bg-zinc-900 rounded-[15px] h-full">
                      <div className="flex items-center justify-center w-14 h-14 bg-blue-600/10 rounded-lg mb-5">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section className="py-20 text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
              <p className="mt-4 text-gray-400">Ensure your photo is compliant in seconds.</p>
              <div className="mt-8">
                <Link href="/checker">
                  <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                    Check My Photo
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-zinc-800">
          <div className="container mx-auto px-4 py-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} PhotoCheck AI. All rights reserved.</p>

            <p className="mt-2 text-sm text-zinc-600">
              Made with ♥ by{' '}
              <a
                href="https://www.debjyoti.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Debjyoti Shit
              </a>
            </p>

          </div>
        </footer>
      </div>
    </div>
  );
}