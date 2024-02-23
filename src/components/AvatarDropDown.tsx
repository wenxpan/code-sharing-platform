import { useDescope, useUser } from "@descope/react-sdk"
import { useCallback } from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown"
import { User } from "@nextui-org/user"
import { Doc } from "@convex/_generated/dataModel"
import { redirect } from "next/navigation"
import { useAppUser } from "@/lib/useAppUser"

export const AvatarDropDown = ({ user }: { user: Doc<"users"> }) => {
  const sdk = useDescope()

  const handleLogout = useCallback(() => {
    sdk.logout()
    redirect("/")
  }, [sdk])

  if (!user) {
    return null
  }

  const employee = [
    {
      key: "create-jobs",
      label: "Post New Job",
      href: "/jobs/new",
    },
    {
      key: "posted-jobs",
      label: "Posted Jobs",
      href: "/dashboard/business",
    },
  ]
  const admin = [
    {
      key: "manage-employees",
      label: "Manage Employees",
      href: "/dashboard/business/employees",
    },
  ]
  const coder = [
    { key: "profile", label: "My Profile", href: "/dashboard/profile/coder" },
    { key: "new-project", label: "New Project", href: "/projects/new" },
    {
      key: "projects",
      label: "My Projects",
      href: "/dashboard/coder/projects",
    },
    { key: "jobs", label: "Applied Jobs", href: "/dashboard/coder/jobs" },
  ]
  const specificItems =
    user.role === "coder"
      ? coder
      : user.role === "businessEmployee"
        ? employee
        : [...admin, ...employee]
  const navItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/dashboard/",
    },
    ...specificItems,
    { key: "sign-out", label: "Sign Out" },
  ]

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.picture || user.github?.avatar_url,
          }}
          className="transition-transform"
          description={user.role}
          name={user.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat" items={navItems}>
        {(item) => (
          <DropdownItem
            key={item.key}
            // @ts-ignore
            href={item?.href}
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
