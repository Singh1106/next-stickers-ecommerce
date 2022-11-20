import { createStyles, Header, Group, Box, Button } from "@mantine/core";
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

  const logoutHandler = () => {
    logout();
    reset();
    toast("Logged out successfully.!!");
    router.push("/");
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
            </Group>
          )}
          <Group className={classes.hiddenMobile}>
            {isLoggedIn ? (
              <>
                <Link href="/orders" className={classes.link}>
                  Orders
                </Link>
                <Link href="/cart" className={classes.link}>
                  Cart
                </Link>
                <Button onClick={logoutHandler}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/">Continue Screen</Link>
              </>
            )}
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
