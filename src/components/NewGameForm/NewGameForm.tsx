import ImageUpload from "../ImageUpload/ImageUpload";

import { useState } from "react";

import {
  Card,
  CardContent,
  FormControl, Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import "./newGameForm.scss";

export interface NewGameFormValues {
  gameName: string
  rules?: string
  weight?: number
  cover?: File
}

const NewGameForm = () => {
  const [category, setCategory] = useState('')
  const [newGameFormValues, setNewGameFormValues] = useState<NewGameFormValues>({
    gameName: '',
    weight: 0
  })

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGameFormValues({ ...newGameFormValues, gameName: event.target.value })
  }

  const handleRulesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGameFormValues({ ...newGameFormValues, rules: event.target.value })
  }

  const handleWeightChange = () => {
    const weightInput = document.getElementById("weight-selector") as HTMLInputElement
    const weightValue = weightInput.valueAsNumber

    if (weightValue >= 0 && weightValue <=5) {
      setNewGameFormValues({ ...newGameFormValues, weight: weightValue })
    }
  }

    return (
      <Card className={"new-game-form"}>
        <CardContent>
          <form>
            <Grid2 container spacing={2} display={"flex"} flexDirection={"column"}>
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <ImageUpload setNewGameFormValues={setNewGameFormValues} newGameFormValues={newGameFormValues} />
                </Grid2>
                <Grid2 xs={6}>
                  <Grid2>
                    <TextField
                      variant={"outlined"}
                      label={"Nom du jeu"}
                      value={newGameFormValues.gameName}
                      onChange={handleGameNameChange}
                      fullWidth
                      required
                    />
                  </Grid2>
                  <Grid2>
                    <TextField
                      variant={"outlined"}
                      label={"Règles"}
                      value={newGameFormValues.rules}
                      onChange={handleRulesChange}
                      fullWidth />
                  </Grid2>
                  <Grid2>
                    <Input
                      type={"number"}
                      value={newGameFormValues.weight}
                      onChange={handleWeightChange}
                      id={"weight-selector"}
                      fullWidth />
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 container>
                <Grid2 xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id={"categories-label"}>Catégories</InputLabel>
                    <Select
                      labelId={"categories-label"}
                      id={"categories"}
                      value={category}
                      label={"Catégories"}
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value={"economie"}>Économie</MenuItem>
                      <MenuItem value={"gestion"}>Gestion</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
              </Grid2>
            </Grid2>
          </form>
        </CardContent>
      </Card>
    )
}

 export default NewGameForm
