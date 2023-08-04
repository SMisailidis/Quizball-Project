import { Autocomplete, Button, Modal, TextField, Typography } from "@mui/material";
import styles from "../../styles/MainScreen.module.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SelectedItemType } from "../../types/SelectedItemType/SelectedItemType";
import { storage } from "../../configs/firebase-config";
import { ref, getDownloadURL } from 'firebase/storage';

interface propsType {
  selectedItem: SelectedItemType;
  bonus: string;
  hasFifty: boolean;
  onSubmitAnswerHandler: () => void;
  setBonus: (bonus: string) => void;
  onChangeAnswerHandler: (text: string) => void;
  retrievesAnswers: () => string[]
  text: string;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

const modalStyleFifty = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

const MainScreen = (props: propsType) => {
  const [options, setOptions] = useState<string[]>(props.retrievesAnswers)
  const [open, setOpen] = useState(false);
  const [openFifty, setOpenFifty] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClosefiftyModal = () => setOpenFifty(false)
  const [imageUrl, setImageUrl] = useState<string>();
  
  const path: string | null = props.selectedItem.question.photoURL;

  const handleOpenfiftyModal = () => {
    props.setBonus("50-50")
    setOpenFifty(true)
  }

  let bonus: any = props.bonus === "x2" ? 2 : 1;


  useEffect(() => {
    if(!path) return

    const storageRef = ref(storage, `images/${path}`);

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error downloading the image:', error);
      });
  }, [path]);

  const onSubmitAnswerHandler = (e: any) => {
    e.preventDefault();
    props.onSubmitAnswerHandler();
  };

  const retrieveModalText = (teams: string) => {

    if(props.selectedItem.category.id !== "c4") return ""

    const tempArray = teams.split("-");
    return (
      tempArray[0] + " vs " + tempArray[1] + " | " + tempArray[2] + " " + tempArray[3].slice(0, -4)
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
            <h1 style={{ color: props.selectedItem.category.bgColor, borderBottom: " 2px solid black" }}>
              {props.selectedItem.category.type}
              {" x"}
              {props.selectedItem.question.difficulty * bonus}
            </h1>
            
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
                    <img className={styles.startingElevenImage}
                      src={imageUrl}
                      alt="Loading..."
                     
                      
                      style={{
                        borderRadius: "20px",
                      }}
                    />
                  </Box>
                </Modal>
              </>
            )}
          </main>
          {props.hasFifty && <Button
            sx={[
              {
                border: `1px solid ${props.selectedItem.category.bgColor}`,
              },
              { borderRadius: "20px" },
              {
                color: `${props.selectedItem.category.bgColor} !important`,
              },
            ]}
            onClick={handleOpenfiftyModal}
          >
            50-50?
          </Button>}
          <Modal
            open={openFifty}
            onClose={handleClosefiftyModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyleFifty}>
                {props.selectedItem.question.fiftyFiftyBonus.map(
                  (answer, index) => (
                    <Box
                      key={index}
                      sx={[
                        {
                          border: `3px solid ${props.selectedItem.category.bgColor}`,
                        },
                        { borderRadius: "20px" },
                        {marginBottom: "5px"},
                        {
                          padding:"0 8px 0 8px"
                        }
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
            </Box>
          </Modal>
        </div>
        <div className = {styles.answerInput}>
          <Autocomplete
            disablePortal
            freeSolo
            fullWidth
            id="combo-box-demo"
            options={options}
            sx={[
              {
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${props.selectedItem.category.bgColor} !important`,
                },
              },
            ]}
            onChange={(event: any, newValue: string | null) => {
              props.onChangeAnswerHandler(newValue as string)
            }}
            onInputChange={(event, newInputValue) => {
              props.onChangeAnswerHandler(newInputValue);
            }}
            renderInput={(params) => <TextField variant="outlined" {...params} label="Σημπλήρωσε την απάντησή σου εδώ" sx={{"& label.Mui-focused": {color: `${props.selectedItem.category.bgColor} !important`,},}}/>}
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
            {
              marginBottom: "10px",
            }
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
