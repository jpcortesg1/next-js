import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { UpdateUser } from "../../interfaces/User";
import FormComponent from "../../components/form/Form";
import styles from "./../form/Form.module.css";
import { LoadingButton } from "@mui/lab";
import { getJWT } from "../../services/user.service";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UpdateUser>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://localhost:1337/api/user-cruds/${id}`
      );
      const { attributes } = data.data;
      setUser(() => ({
        birthDate: attributes.birthDate,
        name: attributes.name,
        identificationNumber: attributes.identificationNumber,
      }));
    };
    id && getData();
  }, [id]);

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    const EMAIL: string | undefined = process.env.NEXT_PUBLIC_EMAIL;
    const PASSWORD: string | undefined = process.env.NEXT_PUBLIC_PASSWORD;
    const jwt = await getJWT(EMAIL, PASSWORD);
    try {
      await axios.put(
        `http://localhost:1337/api/user-cruds/${id}`,
        {
          data: user,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      router.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    const EMAIL: string | undefined = process.env.NEXT_PUBLIC_EMAIL;
    const PASSWORD: string | undefined = process.env.NEXT_PUBLIC_PASSWORD;
    const jwt = await getJWT(EMAIL, PASSWORD);
    try {
      await axios.delete(`http://localhost:1337/api/user-cruds/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      router.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        User Management
      </h1>

      <FormComponent form={user} handleForm={handleUser} />

      <div className={styles.actions}>
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
          onClick={handleUpdateUser}
        >
          Update
        </LoadingButton>
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
          onClick={handleDeleteUser}
        >
          Delete
        </LoadingButton>
      </div>
    </Layout>
  );
}
