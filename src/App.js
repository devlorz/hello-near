import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import {
  Title,
  createStyles,
  TextInput,
  Button,
  Group,
  Box,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import Layout from "./Components/Layout";

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
    },
  },
}));

export default function App() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "",
    },
  });
  const [greeting, setGreeting] = React.useState("");

  const submit = (values) => {
    if (values.name) {
      window.contract
        .get_greeting({
          name: values.name,
        })
        .then((greeting) => {
          setGreeting(greeting);
        });
    }
  };

  if (!window.walletConnection.isSignedIn()) {
    return (
      <Layout buttonClick={login}>
        <main style={{ marginTop: 60 }}>
          <Title className={classes.title}>
            Please sign in before using app
          </Title>
        </main>
      </Layout>
    );
  }

  return (
    <Layout buttonClick={logout} isLoggedIn={true}>
      <main style={{ marginTop: 60 }}>
        <Title className={classes.title}>
          Enter your name to see the magic!
        </Title>
        <Box sx={{ maxWidth: 500, marginBottom: 20 }} mx="auto">
          <form onSubmit={form.onSubmit(submit)}>
            <TextInput
              required
              placeholder="Enter your name"
              {...form.getInputProps("name")}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>

          <Text
            component="div"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            weight={700}
            style={{ fontSize: 40, marginTop: 40 }}
          >
            {greeting}
          </Text>
        </Box>
      </main>
    </Layout>
  );
}
