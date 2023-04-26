import ImageUpload from "../ImageUpload/ImageUpload";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent, Chip,
  FormControl, Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent, Stack,
  TextField
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import "./newGameForm.scss";
import axios from "axios";

export interface NewGameFormValues {
  gameName: string
  rules?: string
  weight?: number
  cover?: File
}

const NewGameForm = () => {
  const [categories , setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newGameFormValues, setNewGameFormValues] = useState<NewGameFormValues>({
    gameName: '',
    weight: 0
  })

  useEffect(() => {
    axios
      .get('http://localhost:3000/category')
      .then(res => setCategories(res.data))
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleCategorySelection = (event: SelectChangeEvent) => {
    const newCategoriesList = categories.filter(category => category !== event.target.value)
    // update selected categories list
    setCategories(newCategoriesList)
    setSelectedCategories([...selectedCategories, event.target.value])
    // TODO upon selection: keep menu open
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

  const handleDeleteCategory = (selectedCategory: string) => {
    const filteredCategories = selectedCategories.filter(category => category !== selectedCategory)
    setSelectedCategories(filteredCategories)
    // refresh categories selection list
    setCategories([...categories, selectedCategory])
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
              <Grid2 xs={6}>
                <FormControl fullWidth>
                  <InputLabel id={"categories-label"}>Catégories</InputLabel>
                  <Select
                    labelId={"categories-label"}
                    id={"categories"}
                    value={""}
                    label={"Catégories"}
                    onChange={handleCategorySelection}
                  >
                    {categories.map((category, index) => {
                      return <MenuItem value={category} key={category + index}><p>{ category }</p></MenuItem>
                    })
                    }
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2>
                <Stack spacing={1}>
                  {selectedCategories.map((selectedCategory, index) => {
                    return <Chip
                      label={selectedCategory}
                      onDelete={() => handleDeleteCategory(selectedCategory)}
                      key={selectedCategory + index}
                    />
                  })}
                </Stack>
              </Grid2>
            </Grid2>
          </Grid2>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewGameForm
