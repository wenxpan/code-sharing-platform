"use client"

import { signIn } from "next-auth/react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { usePathname } from "next/navigation"

const AvatarDropDown = () => {
  const userInfo = {
    name: "Zoey Hughes",
    avatarURL: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey@example.com",
    description: "user"
  }
  const coderItems = [
    { key: "dashboard", label: "Dashboard", href: "/dashboard/coder" },
    { key: "profile", label: "My Profile", href: "/profile/coder" },
    { key: "projects", label: "My Projects", href: "/projects" },
    { key: "jobs", label: "Applied Jobs", href: "/jobs" },
    { key: "sign-out", label: "Sign Out" }
  ]

  const items = coderItems
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: userInfo.avatarURL
          }}
          className="transition-transform"
          description={userInfo.description}
          name={userInfo.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "sign-out" ? "danger" : "default"}
            className={item.key === "sign-out" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

const GetStartedButton = () => (
  <NavbarItem>
    <Button
      color="primary"
      variant="flat"
      onClick={() => signIn("descope", { callbackUrl: "/dashboard" })}
    >
      Get Started
    </Button>
  </NavbarItem>
)

export default function NavBar() {
  const pathname = usePathname()
  const navItems = [
    { name: "Home", URL: "/" },
    { name: "Projects", URL: "/projects" },
    { name: "Users", URL: "/users" }
  ]
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">CODABORATE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem isActive={pathname === item.URL} key={item.name}>
            <Link
              color="foreground"
              href={item.URL}
              aria-current={pathname === item.URL ? "page" : false}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <AvatarDropDown />
      </NavbarContent>
    </Navbar>
  )
}
