"use client"

import * as React from "react"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { GalleryImages } from "@/lib/gallery-images"
import Autoplay from "embla-carousel-autoplay"


export function ImageGallery() {
  return (
    <Carousel 
        opts={{
            align: "start",
            loop: true,
        }}
        plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {GalleryImages.map((image) => (
          <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-square items-center justify-center p-0 overflow-hidden rounded-lg">
                  <Image 
                    src={image.imageUrl} 
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}
