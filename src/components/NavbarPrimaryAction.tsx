import { UpgradeIcon } from "@/svg-icons/upgrade-icon";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import router from "next/router";

export const NavbarPrimaryAction = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="rounded-full transition-transform"
          color="secondary"
          size="sm"
          name="John Doe"
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        onAction={(key) => {
          if (key !== "logout") {
            router.push(`/${key}`);
          }
        }}
      >
        <DropdownSection showDivider>
          <DropdownItem key="/" className="h-14 gap-2" disableAnimation>
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">John Doe</p>
          </DropdownItem>
          <DropdownItem key="/">Dashboard</DropdownItem>
          <DropdownItem
            key="pricing"
            endContent={<UpgradeIcon />}
            description="You're currently on the free tier. Click to upgrade!"
            color="success"
          >
            Upgrade
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
