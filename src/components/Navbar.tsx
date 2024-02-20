"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"
import { Button } from "@nextui-org/button"
import { usePathname } from "next/navigation"
import { WebsiteLogo } from "./ui/logo"
import { AvatarDropDown } from "@/components/AvatarDropDown"
import { useAppUser } from "@/lib/useAppUser"
import { Spinner } from "@nextui-org/spinner"

export default function NavBar() {
  const { user, status } = useAppUser()
  const pathname = usePathname()
  const navItems = [
    { name: "Home", URL: "/" },
    { name: "Projects", URL: "/projects" },
    { name: "Users", URL: "/users" },
  ]
  if (user) {
    switch (user.role) {
      case "coder":
        navItems.push({ name: "Dashboard", URL: "/dashboard/coder" })
        break
      case "businessEmployee":
        navItems.push({ name: "Dashboard", URL: "/dashboard/business" })
        break
      case "businessAdmin":
        navItems.push({ name: "Dashboard", URL: "/dashboard/business" })
        break
    }
  }

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          <WebsiteLogo />
        </Link>
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
        {status === "loading" && <Spinner />}
        {status === "authenticated" && user && (
          <NavbarItem>
            <AvatarDropDown />
          </NavbarItem>
        )}
        {status === "unauthenticated" && (
          <NavbarItem>
            <Button color="primary" variant="flat">
              <Link href="/login">Sign In</Link>
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
