import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { CreateUser } from "../../interfaces/User";
import LoadingButton from "@mui/lab/LoadingButton";
import FormComponent from "../../components/form/Form";
import styles from "./Form.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { getJWT } from "../../services/user.service";
import AlertDialog from "../../components/dialog/Dialog";

export default function Form() {
  const router = useRouter();
  const [form, setForm] = useState<CreateUser>({
    name: "",
    identificationNumber: 0,
    birthDate: new Date().toJSON().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState({
    agree: "Agree",
    disagree: "Disagree",
  });
  const [handleAgree, setHandleAgree] = useState(() => () => {});

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async () => {
    setLoading(true);
    const EMAIL: string | undefined = process.env.NEXT_PUBLIC_EMAIL;
    const PASSWORD: string | undefined = process.env.NEXT_PUBLIC_PASSWORD;
    const jwt = await getJWT(EMAIL, PASSWORD);
    try {
      await axios.post(
        "http://localhost:1337/api/user-cruds",
        {
          data: form,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      router.push("/");
      setLoading(false);
    } catch ({ response }) {
      const { error } = response.data;
      const { errors } = error.details;
      const { message, path } = errors[0];
      setLoading(false);
      setContentDialog((current) => ({
        ...current,
        title: path[0] || null,
        description: message || null,
      }));
      setHandleAgree(() => () => {
        setOpenDialog(false);
      });
      setOpenDialog(true);
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
        CREATE USER
      </h1>

      <FormComponent form={form} handleForm={handleForm} />
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        content={contentDialog}
        handleAgree={handleAgree}
      />

      <div className={styles.actions}>
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
          onClick={handleCreateUser}
        >
          Create
        </LoadingButton>
      </div>
    </Layout>
  );
}
