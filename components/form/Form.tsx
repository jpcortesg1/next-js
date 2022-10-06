import { FormControl, InputLabel, Input, Grid } from "@mui/material";
import { CreateUser, UpdateUser } from "../../interfaces/User";

interface FormProps {
  form: CreateUser | UpdateUser;
  handleForm(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Form({ form, handleForm }: FormProps) {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={6}
        marginBottom="2rem"
        style={{
          width: "100%",
        }}
      >
        <FormControl
          style={{
            width: "100%",
          }}
        >
          <InputLabel htmlFor="Name">Name</InputLabel>
          <Input
            value={form.name}
            type="text"
            id="Name"
            aria-describedby="helperName"
            name="name"
            onChange={handleForm}
          />
        </FormControl>
      </Grid>

      <Grid
        item
        xs={6}
        marginBottom="2rem"
        style={{
          width: "100%",
        }}
      >
        <FormControl
          style={{
            width: "100%",
          }}
        >
          <InputLabel htmlFor="identificationNumber">
            Identification Number
          </InputLabel>
          <Input
            value={form.identificationNumber}
            type="number"
            id="identificationNumber"
            aria-describedby="helperIdentificationNumber"
            name="identificationNumber"
            onChange={handleForm}
          />
        </FormControl>
      </Grid>

      <Grid
        item
        xs={6}
        style={{
          width: "100%",
        }}
        marginBottom="2rem"
      >
        <InputLabel htmlFor="identificationNumber">
          Identification Number
        </InputLabel>
        <FormControl
          style={{
            width: "100%",
          }}
        >
          <Input
            type="date"
            id="BirthDate"
            value={form.birthDate}
            aria-describedby="helperBirthDate"
            name="birthDate"
            onChange={handleForm}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
