import { Button, Modal, TextField, Typography } from "@mui/material";
import styles from "../../styles/MainScreen.module.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { SelectedItemType } from "../../types/SelectedItemType/SelectedItemType";
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

  const path: string | undefined = props.selectedItem.question.photoURL;
  let photo: any;
  let teams: string = "";

  let bonus: any = props.bonus === "x2" ? 2 : 1;

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

  if (path !== undefined) {
    photo = require(`../../images/${path}`);
    teams = retrieveModalText(path);
  }

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
            {photo !== undefined && (
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
                      {teams}
                    </Typography>
                    <img
                      src={photo}
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
