import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons";
import { logout } from "../dashboard/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Dashboard", address: "/dashboard" },
  { icon: IconUser, label: "Account", address: "/account" },
  { icon: IconSettings, label: "Settings", address: "settings" },
];

export function NavbarMinimalColored() {
  const router = useRouter();
  const { user, setUser } = useAuthStore((state: any) => state);

  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        router.push(link.address);
        setActive(index);
      }}
    />
  ));

  const logoutHandler = () => {
    logout();
    toast("Logged out successfully.!!");
    setUser(null);
    router.push("/");
  };

  return (
    <Navbar
      height={750}
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
      })}
    >
      <Center>{user?.name}</Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={5}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={logoutHandler}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
