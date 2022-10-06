import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Table from "../components/table/Table";
import { Meta } from "../interfaces/Meta";
import { User } from "../interfaces/User";

const Home: NextPage = () => {
  const [data, setData] = useState<Array<User>>([]);
  console.log("🚀 ~ file: index.tsx ~ line 13 ~ data", data);
  const [meta, setMeta] = useState<Meta>({
    pagination: {
      page: 0,
      pageCount: 0,
      pageSize: 0,
      total: 0,
    },
  });

  useEffect(() => {
    const getData = async () => {
      const { data: dataRes } = await axios.get(
        "http://localhost:1337/api/user-cruds"
      );
      const { data, meta } = dataRes;
      const newData = data.map((item: any) => {
        const attributes = item.attributes;
        return {
          id: item.id,
          ...attributes,
        };
      });
      setData(() => [...newData]);
      setMeta(() => ({ ...meta }));
    };
    getData();
  }, []);

  return (
    <Layout>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 300,
          letterSpacing: "0.3rem",
          marginBottom: "1rem",
        }}
      >
        ALL USERS
      </h1>
      <Table meta={meta} data={data} />
    </Layout>
  );
};

export default Home;
