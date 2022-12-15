import { useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import { messageType } from "../../../../types/types";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

export type User = {
  _id: string;
  email: string;
  messages: messageType[];
};

interface MessagesSidebarProps {
  users: User[];
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}
export const MessagesSidebar = ({
  users,
  setSelectedId,
}: MessagesSidebarProps) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("");

  const messagesUsers = users.map((item: any) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item._id === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item._id);
        setSelectedId(item._id);
      }}
    >
      <span>{item.email}</span>
    </a>
  ));

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Code sx={{ fontWeight: 700 }}>Messages for admin.</Code>
        </Group>
        {messagesUsers}
      </Navbar.Section>
    </Navbar>
  );
};
