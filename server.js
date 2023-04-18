import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains";
import * as dotenv from "dotenv";

dotenv.config();

// TODO: For custom user questions
import prompt from "prompt-sync";

const run = async () => {
  const datasource = new DataSource({
    type: "sqlite",
    database: "db/chinook.db",
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    }),
    database: db,
  });

  const res = await chain.run(
    "How many employees are there from Calgary city?"
  );
  console.log(res);
};

run();
