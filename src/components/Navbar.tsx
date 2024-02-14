"use client"

import { signIn, signOut, useSession } from "next-auth/react"
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
import { usePathname, useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import useStoreCoderEffect from "@/lib/useStoreCoderEffect"
import { useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"

const performSignOut = async (router: AppRouterInstance) => {
  try {
    await fetch("/api/auth/federated-sign-out").then(() => {
      signOut({ redirect: false })
      router.replace("/")
    })
  } catch (error) {
    console.error("Error during sign out:", error)
  }
}

const AvatarDropDown = ({
  userData,
}: {
  userData: Doc<"users"> | null | undefined
}) => {
  // TODO: skeleton
  if (!userData) {
    return null
  }
  const router = useRouter()
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
            onClick={() => item.key === "sign-out" && performSignOut(router)}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default function NavBar() {
  const { data: session, status } = useSession()
  // create or get user id in convex and fetch user data
  const userId = useStoreCoderEffect()
  const userData = useQuery(api.users.getCoder, { userId: userId || undefined })
  const pathname = usePathname()
  console.log({ session, status })
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
        {status === "authenticated" && (
          <NavbarItem>
            <AvatarDropDown userData={userData} />
          </NavbarItem>
        )}

        {status === "unauthenticated" && (
          <>
            <NavbarItem>
              <Button
                onClick={() =>
                  signIn("descope", { callbackUrl: "/dashboard/business" })
                }
                color="primary"
                variant="flat"
              >
                Business Portal
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() =>
                  signIn("descope", { callbackUrl: "/dashboard/coder" })
                }
                color="primary"
                variant="flat"
              >
                Coder Portal
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
