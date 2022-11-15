import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
} from "@mantine/core";
import { useCounter } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface ProductCardProps {
  name: string;
  desc: string;
  imageURL: string;
}

export function ProductCard({ name, desc, imageURL }: ProductCardProps) {
  const { classes } = useStyles();
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={imageURL} alt={name} />
      </Card.Section>
      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>{name}</Text>
          <Text size="xs" color="dimmed">
            {desc}
          </Text>
        </div>
        <Badge variant="outline">Sticker</Badge>
      </Group>
      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Button onClick={handlers.increment}>+1</Button>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              {count}
            </Text>
            <Button onClick={handlers.decrement}>-1</Button>
          </div>
          <Button radius="xl" style={{ flex: 1 }}>
            Add to cart.
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
