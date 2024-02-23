import { Button } from "@nextui-org/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="my-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Elevate Your Coding Projects
          </h1>
          <div>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Join a vibrant community of developers sharing, reviewing, and
              improving web development projects together.
            </p>
            <Button href="/login" as={Link} color="primary">
              Get started
            </Button>
          </div>
        </div>
      </section>
      {/* <section>
        <Image
          src={"https://placehold.co/800x400/png"}
          alt="platform screenshot"
          width={800}
          height={400}
        />
      </section> */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="my-4 font-extrabold tracking-tight leading-none text-gray-900 text-2xl lg:text-6xl dark:text-white">
            How it works
          </h2>
          <div>
            <h3 className="text-xl">Share Projects</h3>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Join a vibrant community of developers sharing, reviewing, and
              improving web development projects together.
            </p>
          </div>
          <div>
            <h3 className="text-xl">Earn Points and Feedback</h3>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Provide valuable feedback on projects to earn points. The more
              points you have, the more visibility your projects get, ensuring
              quality feedback from peers.
            </p>
          </div>
          <div>
            <h3 className="text-xl">Apply to Jobs with Your Portfolio</h3>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Leverage your projects and the feedback you&apos;ve received as a
              dynamic portfolio to apply for job opportunities posted by top
              tech companies on our platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
