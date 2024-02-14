"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import { usePathname } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@convex/_generated/api"
import { useDescope, useUser } from "@descope/react-sdk"
import { useCallback } from "react"

const AvatarDropDown = ({
  userData,
}: {
  userData: { name: string; role: string; image: string }
}) => {
  const sdk = useDescope()

  const handleLogout = useCallback(() => {
    sdk.logout()
  }, [sdk])

  // TODO: skeleton
  if (!userData) {
    return null
  }
  const coderItems = [
    { key: "dashboard", label: "Dashboard", href: "/dashboard/coder" },
    { key: "profile", label: "My Profile", href: "/profile/coder" },
    { key: "projects", label: "My Projects", href: "/projects" },
    { key: "jobs", label: "Applied Jobs", href: "/jobs" },
    { key: "sign-out", label: "Sign Out" },
  ]

  const items = coderItems
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: userData?.image || "",
          }}
          className="transition-transform"
          description={userData!.role}
          name={userData!.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "sign-out" ? "danger" : "default"}
            className={item.key === "sign-out" ? "text-danger" : ""}
            onClick={() => item.key === "sign-out" && handleLogout()}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default function NavBar() {
  const { user } = useUser()
  useMutation(api.users.storeCoder)
  const pathname = usePathname()
  const navItems = [
    { name: "Home", URL: "/" },
    { name: "Projects", URL: "/projects" },
    { name: "Users", URL: "/users" },
  ]

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link className="font-bold text-inherit cursor-pointer" href="/">
          CODABORATE
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
        {user && (
          <NavbarItem>
            <AvatarDropDown
              userData={{
                name: user?.name || "",
                role: user?.roleNames?.[0] || "",
                image: user?.picture || "",
              }}
            />
          </NavbarItem>
        )}

        {!user && (
          <>
            <NavbarItem>
              <Button color="primary" variant="flat">
                <Link href="/login/business">Business Portal</Link>
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                <Link href="/login/coder">Coder Portal</Link>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
