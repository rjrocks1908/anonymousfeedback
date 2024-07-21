"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";
import { useRef } from "react";

function page() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Conversations
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Anonymous Feedback - where your identity remains a secret
          </p>
        </section>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader className="font-bold text-2xl">
                      {message.title}
                    </CardHeader>
                    <div className="flex items-center px-6">
                      <Mail className="w-8 h-8 mr-2" />
                      <CardContent className="flex flex-col justify-center py-3 px-2">
                        <span className="text-lg font-semibold">
                          {message.content}
                        </span>
                        <span className="text-sm">{message.received}</span>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <footer className="text-center p-4 md:p-6">
        © 2024 Anonymous Feedback. All rights reserved.
      </footer>
    </>
  );
}

export default page;
