import { useDescope, useUser } from "@descope/react-sdk"
import { useCallback } from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown"
import { User } from "@nextui-org/user"
import { useAppUser } from "@/lib/useAppUser"

export const AvatarDropDown = () => {
  const { user } = useAppUser()
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
      href: `/dashboard/coder/${user._id}`,
    },
    { key: "profile", label: "My Profile", href: "/profile/coder" },
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
            src: user.picture || "",
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
