import { createStyles, Header, Group, Box, Button, Menu } from "@mantine/core";
import Link from "next/link";
import useAuthStore from "../../store";
import { logout } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderMegaMenu() {
  const router = useRouter();
  const { isLoggedIn, reset } = useAuthStore((state: any) => ({
    isLoggedIn: state.isLoggedIn,
    reset: state.reset,
  }));
  const { classes } = useStyles();

  const logoutHandler = async () => {
    reset(); // why no work
    await logout();
    toast("Logged out successfully.!!");
    router.push("/");
  };

  const infoRenderer = () => {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="subtle" color="dark">
            Info
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Link href="/info/AboutUs">About us</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/info/CancellationAndRefund">
              Cancellation and Refund
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/info/ContactUs">Contact Us</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/info/PrivacyPolicy">Privacy Policy</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/info/ShippingAndDelivery">Shipping and Delivery</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/info/TermsAndConditions">Terms and Conditions</Link>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          {isLoggedIn && (
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Link href="/dashboard" className={classes.link}>
                Home
              </Link>
              <Link href="/account" className={classes.link}>
                Account
              </Link>
              <Link href="/settings" className={classes.link}>
                Settings
              </Link>
              {infoRenderer()}
            </Group>
          )}
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            {isLoggedIn ? (
              <>
                <Link href="/orders" className={classes.link}>
                  Orders
                </Link>
                <Link href="/cart" className={classes.link}>
                  Cart
                </Link>
                <Button onClick={logoutHandler} variant="subtle" color="dark">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link className={classes.link} href="/">
                  Continue Screen
                </Link>
                {infoRenderer()}
              </>
            )}
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
