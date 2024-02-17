import { Button } from "@nextui-org/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface LandingPageProps { }

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="my-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Boost your side projects
          </h1>
          <div>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequatur fuga cum qui explicabo animi rerum amet at ex.
              Laudantium, adipisci!
            </p>
            <Button href='/projects' as={Link}>Get Started</Button>
          </div>
        </div>
      </section>
      <section>
        <Image
          src={"https://placehold.co/800x400/png"}
          alt="platform screenshot"
          width={800}
          height={400}
        />
      </section>
    </div>
  )
}

export default LandingPage
