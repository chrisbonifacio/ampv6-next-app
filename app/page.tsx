"use client";
import React, { useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { post, put } from "aws-amplify/api";
import {
  Button,
  View,
  WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";

import { Amplify } from "aws-amplify";
import awsconfig from "@/src/amplifyconfiguration.json";

Amplify.configure(awsconfig);

const App = ({ signOut }: WithAuthenticatorProps) => {
  async function postTodo(path: string = "") {
    try {
      const restOperation = post({
        apiName: "todoApi",
        path: `/todo${path}`,
        options: {
          body: {
            message: "Attempting to post a todo",
          },
        },
      });

      const response = await restOperation.response;
      const payload = await response.body.json();

      console.log("POST call succeeded");
      console.log(payload);
    } catch (e) {
      console.log(e);
    }
  }

  async function putTodo(path: string) {
    try {
      const restOperation = put({
        apiName: "todoApi",
        path: `/todo${path}`,
        options: {
          body: {
            message: "Attempting to put a todo",
          },
        },
      });

      const response = await restOperation.response;
      const payload = await response.body.json();

      console.log("PUT call succeeded");
      console.log(payload);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View className="flex flex-col">
      {/* <div className="mb-8">
        <Button onClick={signOut}>Sign Out</Button>
      </div> */}
      <div>
        <Button className="mr-4" onClick={() => postTodo()}>
          POST /todo
        </Button>
        <Button className="mr-4" onClick={() => postTodo("/fail")}>
          POST /todo/fail
        </Button>
        <Button onClick={() => putTodo("/fail")}>PUT /todo/fail</Button>
      </div>
    </View>
  );
};

export default App;
