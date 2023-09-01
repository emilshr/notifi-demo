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
import { signIn, signOut, useSession } from "next-auth/react";
import router from "next/router";

export const NavbarPrimaryAction = () => {
  const { status, data } = useSession();

  if (status === "authenticated") {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="rounded-full transition-transform"
            color="secondary"
            size="sm"
            name={data.user.name || "User"}
            showFallback
            classNames={{
              img: "h-[28px] rounded-full ring",
            }}
            src={data?.user.image || ""}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={(key) => {
            if (key === "logout") {
              signOut({ redirect: true, callbackUrl: "/" });
            } else {
              router.push(`/${key}`);
            }
          }}
        >
          <DropdownSection showDivider>
            <DropdownItem key="profile" className="h-14 gap-2" disableAnimation>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {data.user.email || data.user.name}
              </p>
            </DropdownItem>
            <DropdownItem key="dashboard">Dashboard</DropdownItem>
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
  } else if (status === "unauthenticated") {
    return (
      <Button color="primary" onClick={() => signIn("github")}>
        Sign in
      </Button>
    );
  }

  return <Spinner />;
};
