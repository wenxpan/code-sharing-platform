import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function ScreenshotsCarousel({
  screenshots,
}: {
  screenshots: { url: string; alt: string }[]
}) {
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      <CarouselContent>
        {screenshots.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Image src={img.url} alt={img.alt} width={600} height={400} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
