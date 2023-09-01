import {
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { NavbarPrimaryAction } from "./NavbarPrimaryAction";

export const CustomNavbar = () => {
  return (
    <Navbar isBordered isBlurred position="sticky" maxWidth="xl">
      <NavbarBrand>
        <div className="flex items-center gap-x-2">
          <Link href="/" className="font-bold text-inherit">
            Notifi
          </Link>
          <Tooltip showArrow content="Notifi beta is available now!">
            <Chip
              color="success"
              variant="dot"
              size="sm"
              radius="sm"
              classNames={{
                content: "font-bold text-xs",
              }}
            >
              beta
            </Chip>
          </Tooltip>
        </div>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <ThemeSwitcher />
        <NavbarPrimaryAction />
      </NavbarContent>
    </Navbar>
  );
};
