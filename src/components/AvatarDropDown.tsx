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

export const AvatarDropDown = ({ user }: { user: Doc<"users"> }) => {
  const sdk = useDescope()

  const handleLogout = useCallback(() => {
    sdk.logout()
  }, [sdk])

  if (!user) {
    return null
  }

  // TODO: items for employee and admin
  const coderItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/dashboard/coder",
    },
    { key: "profile", label: "My Profile", href: "/profile/coder" },
    { key: "new-project", label: "New Project", href: "/projects/new" },
    { key: "projects", label: "My Projects", href: "/projects" },
    { key: "jobs", label: "Applied Jobs", href: "/jobs" },
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
      <DropdownMenu aria-label="User Actions" variant="flat" items={coderItems}>
        {(item) => (
          <DropdownItem
            key={item.key}
            href={item.href}
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
