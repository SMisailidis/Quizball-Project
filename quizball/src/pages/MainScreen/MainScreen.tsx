import { Button, Modal, TextField, Typography } from "@mui/material";
import styles from "../../styles/MainScreen.module.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SelectedItemType } from "../../types/SelectedItemType/SelectedItemType";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


interface propsType {
  selectedItem: SelectedItemType;
  bonus: string;
  onSubmitAnswerHandler: () => void;
  onChangeAnswerHandler: (text: string) => void;
  text: string;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 640,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

const MainScreen = (props: propsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const path: string | null = props.selectedItem.question.photoURL;
  let teams: string = "";

  let bonus: any = props.bonus === "x2" ? 2 : 1;

  const [imageUrl, setImageUrl] = useState<string>();

  const firebaseConfig = {
    apiKey: "AIzaSyDN3u-nLXGHHqwgNgs-jlqLXUQ5-CqJGZY",
    authDomain: "quizball-project.firebaseapp.com",
    databaseURL: "https://quizball-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quizball-project",
    storageBucket: "quizball-project.appspot.com",
    messagingSenderId: "642081605780",
    appId: "1:642081605780:web:7dd71b31e9135595ea0c81",
    measurementId: "G-NSJ9LYP634"
  };

  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const storage = getStorage(app);

    const storageRef = ref(storage, `images/${path}`);

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error downloading the image:', error);
      });
  }, []);

  const onSubmitAnswerHandler = (e: any) => {
    e.preventDefault();
    props.onSubmitAnswerHandler();
  };

  const onChangeAnswerHandler = (e: any) => {
    props.onChangeAnswerHandler(e.target.value);
  };

  const retrieveModalText = (teams: string) => {
    const tempArray = teams.split("-");
    return (
      tempArray[0] + " vs " + tempArray[1] + " | " + tempArray[2].slice(0, -4)
    );
  };

  return (
    <div className={styles.outerMainScreen}>
      <div className={styles.container}>
        <header>
          <h1 className={styles["animated-text"]}>QUIZBALL</h1>
        </header>
        <div
          className={styles.innerMainScreen}
          style={{ borderColor: props.selectedItem.category.bgColor }}
        >
          <div className={styles.header}>
            <h1 style={{ color: props.selectedItem.category.bgColor }}>
              {props.selectedItem.category.type}
              {" x"}
              {props.selectedItem.question.difficulty * bonus}
            </h1>
            <hr></hr>
          </div>
          <main className={styles.questionText}>
            <span>{props.selectedItem.question.text}</span>
            {imageUrl && (
              <>
                <Button
                  sx={[
                    {
                      border: `1px solid ${props.selectedItem.category.bgColor}`,
                    },
                    { borderRadius: "20px" },
                    {
                      color: `${props.selectedItem.category.bgColor} !important`,
                    },
                  ]}
                  onClick={handleOpen}
                >
                  Δες την φωτογραφια
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ textAlign: "center" }}
                    >
                      {retrieveModalText(path as string)}
                    </Typography>
                    <img
                      src={imageUrl}
                      alt="as"
                      width={640}
                      height={400}
                      style={{
                        borderRadius: "20px",
                      }}
                    />
                  </Box>
                </Modal>
              </>
            )}
          </main>
        </div>

        {props.bonus === "50-50" && (
          <>
            <div className={styles.fiftyDiv}>
              {props.selectedItem.question.fiftyFiftyBonus.map(
                (answer, index) => (
                  <Box
                    key={index}
                    sx={[
                      {
                        border: `3px solid ${props.selectedItem.category.bgColor}`,
                      },
                      { borderRadius: "20px" },
                    ]}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={[{ textAlign: "center" }, { p: 0.5 }]}
                    >
                      {index + 1}. {answer}
                    </Typography>
                  </Box>
                )
              )}
            </div>
          </>
        )}
        <div>
          <TextField
            id="outlined-basic"
            label="Σημπλήρωσε την απάντησή σου εδώ"
            variant="outlined"
            sx={[
              { width: 550 },
              {
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${props.selectedItem.category.bgColor} !important`,
                },
              },
              {
                "& label.Mui-focused": {
                  color: `${props.selectedItem.category.bgColor} !important`,
                },
              },
            ]}
            value={props.text}
            onChange={onChangeAnswerHandler}
          />
        </div>
        <Button
          variant="contained"
          sx={[
            { backgroundColor: "#0497a7" },
            {
              "&:hover": {
                backgroundColor: "#6cdbe7",
              },
            },
          ]}
          onClick={onSubmitAnswerHandler}
        >
          Καταχωρησε την απαντηση σου
        </Button>
      </div>
    </div>
  );
};

export default MainScreen;
