import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import styles from "../../styles/UploadQuestions.module.css"
import { CategoryType } from "../../types/CategoryType"
import { useState } from "react";
import { QuestionsType } from "../../types/QuestionsType";
import { storage } from "../../configs/firebase-config";
import { ref, uploadBytes} from "firebase/storage"

interface propsType {
    categories: CategoryType[]
    setIsOpenUpload: (flag: boolean) => void;
    setHideSelectButtons: (flag: boolean) => void;
}

const UploadQuestions = (props: propsType) => {
    
    const [successPost, setSuccessPost] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [success, setSuccess] = useState<'primary' | 'success' | 'error'>("primary")
    const [categorySelect, setCategorySelect] = useState("")
    const [questionTextField, setQuestionTextField] = useState("")
    const [numberTextField, setNumberTextField] = useState(1)
    const [answerTextField, setAnswerTextField] = useState("")
    const [fiftyTextField, setFiftyTextField] = useState("")
    const [isDisabledQuestion, setIsDisabledQuestion] = useState(false)
    const [isCorrectCategory, setIsCorrectCategory] = useState(true) 
    const [isCorrectQuestion, setIsCorrectQuestion] = useState(true)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(true)
    const [isCorrectFifty, setIsCorrectFifty] = useState(true)
    const [label, setLabel] = useState("Select a file")

    const regexPattern = /^([\u0300-\u036F]|\d|,|.|-)+[/]([\u0300-\u036F]|\d|,|.|-)+$/;
    const regexFileName = /^([a-zA-Z])+[-]([a-zA-Z])+[-](\d{4})[-]([a-zA-Z])+.png$/

    const resetAll = () => {
        setCategorySelect("")
        setQuestionTextField("")
        setNumberTextField(1)
        setAnswerTextField("")
        setFiftyTextField("")
        setIsDisabledQuestion(false)
        setIsCorrectCategory(true)
        setIsCorrectQuestion(true)
        setIsCorrectAnswer(true)
        setIsCorrectFifty(true)
        setSelectedFile(null)
        setLabel("Select a file")
    }

    const removeTonalMarks = (text: string) => {
        const tonalMarksRegex = /[\u0300-\u036F]/g;
        return text.normalize("NFD").replace(tonalMarksRegex, "");
    };

    const handleSelectChange = (e: any) => {
        const { value } = e.target
        setCategorySelect(value)

        if(value === "3") {
            setQuestionTextField("Ποιος λείπει από την ενδεκάδα;")
            setIsDisabledQuestion(true)
        }
        else if (value === "6") {
            setQuestionTextField("Ποιας ομάδας είναι το λογότυπο;")
            setIsDisabledQuestion(true)
        }
        else {
            setQuestionTextField("")
            setIsDisabledQuestion(false)
        }

        setIsCorrectCategory(true)
    }

    const questionTextHandler = (e: any) => {
        const { value } = e.target;
        setQuestionTextField(value);
        setIsCorrectQuestion(true)
    }

    const numberTextHandler = (e: any) => {
        const { value } = e.target;
        setNumberTextField(value)
    }

    const answerTextHandler = (e: any) => {
        const { value } = e.target;
        setAnswerTextField(value);
        setIsCorrectAnswer(true)
    }

    const fiftyTextHandler = (e: any) => {
        const { value } = e.target;
        setFiftyTextField(value)

        setIsCorrectFifty(true)
    }

    const handleSubmitQuestion = () => {

        let flag = false
        
        if(categorySelect === "") {
            setIsCorrectCategory(false)
            flag = true
        }

        if(questionTextField === "") {
            setIsCorrectQuestion(false)
            flag = true
        }

        if(answerTextField === "") {
            setIsCorrectAnswer(false)
            flag = true
        }
        
        if(fiftyTextField === "") {
            setIsCorrectFifty(false)
            flag = true
        }

        if(!regexPattern.test(fiftyTextField)) {
            setIsCorrectFifty(false)
            flag = true
        }

        if(flag) return

        const noTonalsAnswer = removeTonalMarks(answerTextField)
        const noTonalsFifty = removeTonalMarks(fiftyTextField).split("/")
        
        if(noTonalsAnswer !== noTonalsFifty[0] && noTonalsAnswer !== noTonalsFifty[1]) {
            alert("Πρέπει η απάντηση να συμπεριλαμβάνεται στο 50-50!")
            setIsCorrectFifty(false)
            return
        }

        const obj : QuestionsType = {
            text: questionTextField,
            id: Math.random().toString(),
            difficulty: numberTextField,
            answer: noTonalsAnswer,
            fiftyFiftyBonus: noTonalsFifty,
            photoURL: selectedFile !== null ? selectedFile.name : null
        }

        if(categorySelect === "3") {
            if(!regexFileName.test(selectedFile?.name as string)){
                alert("Λάθος όνομα αρχείου! Για την κατηγορία ΠΟΙΟΣ ΛΕΙΠΕΙ;\nΤα αρχεία .png πρέπει να έχουν όνομα\nπ.χ Chealse-Liverpool-2023-FA.png\nΔηλαδή\nΕντός έδρας-Εκτός έδρας-Χρόνος-Διοργάνωση")
                return
            }
        }

        postObj(obj)

        if(!successPost) {
            setSuccess("success")
            setTimeout(() => {
                setSuccess("primary");
              }, 2000);
        }
        else {
        }
    }

    const handleFileChange = (e: any) => {
      const file = e.target.files?.[0]

      if(!file) return
  
      setSelectedFile(file);
      if(file.name.length >= 30){
        const truncatedName = file.name.substring(0, 15) + '...';
        setLabel(truncatedName);
      } else {
        setLabel(file.name)
      }
    };
  
    async function uploadFile() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (!file) {
          return;
        }
      
        const storageRef = ref(storage, `images/${file.name}`);
      
        try {
          await uploadBytes(storageRef, file);
          alert("Η ερώτηση καθώς και η φωτογραφία ανέβηκαν επιτυχώς!")
        } catch (error) {
            alert('File upload failed. Please try again.');
            console.error(error);
            setSuccess("error")
        }
    };

    const postObj = (obj: QuestionsType) => {
        fetch(`https://quizball-project-default-rtdb.europe-west1.firebasedatabase.app/categories/${categorySelect}/questions.json`, {
            method: 'POST',
            body: JSON.stringify(obj)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Question upload successful!');
            uploadFile()
            setSuccess("success")
            setTimeout(() => {
                setSuccess("primary");
                resetAll()
              }, 2000);
            })
            .catch(error => {
                console.error('Error uploading question:', error);
                setSuccess("error")
            });        
    }

    const onClickHandleBack = () => {
        props.setIsOpenUpload(false)
        props.setHideSelectButtons(true)
    }

    return (
        <div className={styles.card}>
            <div className={styles.outerContainer}>
                <div className={styles.header}>
                <IconButton color="inherit" sx={{border: "1px solid black"}} onClick={onClickHandleBack}>
                    <HomeIcon />
                </IconButton>
                    <h2>Συμπλήρωσε την φόρμα</h2>
                    <hr />
                </div>
                <FormControl sx={[{width:"60%"}, {marginBottom: "10px"}]}>
                    <InputLabel id="demo-simple-select-label" error={!isCorrectCategory}>Διάλεξε μία κατηγορία</InputLabel>
                    <Select
                        error={!isCorrectCategory}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categorySelect}
                        label="Διάλεξε μία κατηγορία"
                        onChange={handleSelectChange}
                    >
                        {props.categories.map((category, index) => (
                            <MenuItem key={index} value={index.toString()}>{category.type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className={styles.textFieldsContainer}>
                    <TextField
                        required = {isCorrectQuestion}
                        error = {!isCorrectQuestion}
                        sx={{width: "100%"}}
                        id="outlined-basic"
                        label="Δώσε το κείμενο της ερώτησης"
                        variant="outlined"
                        value={questionTextField}
                        disabled={isDisabledQuestion}
                        onChange={questionTextHandler}
                    />
                    <FormControl sx={{width: "100%"}}>
                        <InputLabel id="demo-simple-select-label">Δώσε την δυσκολία της ερώτησης</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={numberTextField}
                            label="Δώσε την δυσκολία της ερώτησης"
                            onChange={numberTextHandler}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required = {isCorrectAnswer}
                        error = {!isCorrectAnswer}
                        sx={{width: "100%"}}
                        id="outlined-basic"
                        label="Δώσε την απάντηση της ερώτησης"
                        variant="outlined"
                        value={answerTextField}
                        onChange={answerTextHandler}
                    />
                    <TextField
                        required = {isCorrectFifty}
                        error = {!isCorrectFifty}
                        sx={{width: "100%"}}
                        id="standard-helperText"
                        label="Δώσε την βοήθεια 50-50"
                        variant="outlined"
                        helperText="Μορφή: 1η απαντηση/2η απαντηση"
                        value={fiftyTextField}
                        onChange={fiftyTextHandler}
                    />
                </div>
                <div className={styles["file-input-container"]}>
                 <label htmlFor="fileInput" className={styles["custom-file-label"]}>
                    {label}
                    <input  onChange={handleFileChange} accept=".png" type="file" id="fileInput"  className={styles["custom-file-input"]}/>
                    </label>
                </div>

                <div>
                    <Button variant="contained" color={success} sx={[{ width: '100%' }, { backgroundColor: '#347FB1' },{ '&:hover': {backgroundColor: '#2e6a92',}, }, ]} onClick={handleSubmitQuestion}>Καταχωρησε την ερωτηση</Button>
                </div>
            </div>
        </div>
    )
}

export default UploadQuestions