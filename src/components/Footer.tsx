import React from "react"

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="w-full md:flex md:items-center md:justify-between max-w-[1024px] mx-auto mt-8 p-4 border-t">
      <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
        <li className="ml-4">
          <a
            className="flex justify-center items-center text-gray-500 text-sm mr-4"
            href="https://github.com/wenxpan/code-sharing-platform"
            target="_blank"
            aria-label="Github"
          >
            Github repo
          </a>
        </li>
      </ul>
      <p className="text-gray-500 text-sm mr-4">
        Made with <span className="text-red-500">&#9829;</span> by{" "}
        <a href="https://github.com/Jojowangfy">Fangyi Wang</a>,{" "}
        <a href="https://github.com/MinghongGao">Minghong Gao</a> &{" "}
        <a href="https://github.com/wenxpan">Wenxuan Pan</a>
      </p>
    </div>
  )
}

export default Footer
