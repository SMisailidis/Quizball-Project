import styles from "./styles/main.module.css";
import QuestionsContainer from "./pages/QuestionsContainer/QuestionsContainer";
import MainScreen from "./pages/MainScreen/MainScreen";
import { useState } from "react";
import data from "./data";
import { Player } from "./classes/Player";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ShowScore from "./pages/ShowScore/ShowScore";
import { SelectedItemType } from "./types/SelectedItemType";

export default function Home() {
  const [categories, setCategories] = useState(data.categories);
  const [showScore, setShowScore] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>();
  const [disableButtons, setDisableButtons] = useState(false);
  const [bonus, setBonus] = useState("");
  const [text, setText] = useState("");
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [playersTurn, setPlayersTurn] = useState<Player | null>(null);
  const [open, setOpen] = useState(true);
  const [textName1, setTextName1] = useState("");
  const [textName2, setTextName2] = useState("");

  const onChangePlayer1Handler = (e: any) => {
    setTextName1(e.target.value);
  };

  const onChangePlayer2Handler = (e: any) => {
    setTextName2(e.target.value);
  };

  const onSubmitNamesHandler = (e: any) => {
    e.preventDefault();

    if (textName1 === "" || textName2 === "") {
      alert("Πρέπει να εισάγετε υποχρεωτικά και τα δύο ονόματα");
      return;
    }

    const player1 = new Player(textName1);
    const player2 = new Player(textName2);

    onUpdatePlayers(player1, player2);
    setOpen(false)
    player1.printData()
    player2.printData()
  };

  const onUpdatePlayers = (p1: Player, p2: Player) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setPlayersTurn(p1);
  };

  const onChangeAnswerHandler = (text: string) => {
    setText(text);
  };

  const onClickQuestionHandler = (selectedItem : SelectedItemType) => {
    setSelectedItem(selectedItem);
  };

  const onClickBonusHandler = (b: string) => {
    setBonus(b);
    setDisableButtons(true);
  };

  const onSubmitAnswerHandler = () => {
    setText("");

    if(!selectedItem) return

    if(playersTurn === null) return

    let points: number = selectedItem.question.difficulty;

    if (bonus === "x2") {
      points = points * 2;
    } else if (bonus === "50-50") {
      points = 1;
    }

    if (text.toUpperCase() === selectedItem.question.answer.toUpperCase()) {
      alert("Congratulations! You got it right!");
      playersTurn.setScore(points);
    } else {
      alert(
        "Wrong answer! The correct one was " +
          selectedItem.question.answer +
          "!"
      );
    }

    checkWinner();
    setShowScore(true);
    removeQuestion();
    setSelectedItem(undefined);
    pickTurn();
    setDisableButtons(false);
  }

  const removeQuestion = () => {

    if(!selectedItem) return

    if(playersTurn === null) return

    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        // Filter out the question with the specified ID
        const filteredQuestions = category.questions.filter(
          (question) => question.id !== selectedItem.question.id
        );

        // Return the category object with the updated questions
        return {
          ...category,
          questions: filteredQuestions,
        };
      })
    );

    if (bonus === "") return;

    const updatedBonuses = playersTurn.bonus.filter(
      (curBonus) => curBonus !== bonus
    );

    playersTurn.setBonuses(updatedBonuses);

    setBonus("");
  };

  const checkWinner = () => {
    let count = 0;
    categories.forEach((category) => {
      if (category.questions.length - 1 <= 0) {
        count++;
      }
    });
    if (count === categories.length) {
      calculateWinner();
    }
  };

  const calculateWinner = () => {

    if(player1 === null || player2 === null) return

    if (player1.score > player2.score) {
      alert(
        `Gongratulation ${player1.name}! you are the winner with ${player1.score} points!`
      );
    } else if (player2.score > player1.score) {
      alert(
        `Gongratulation ${player1.name}! you are the winner with ${player1.score} points!`
      );
    } else {
      alert(`Both of you got ${player1.score} points! Its a draw!`);
    }
  };

  const pickTurn = () => {

    if(playersTurn === null || player1 === null) return 

    if (playersTurn.name === player1.name) {
      setPlayersTurn(player2);
    } else {
      setPlayersTurn(player1);
    }
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "40px",
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={[{ textAlign: "center" }, { paddingBottom: "10px" }]}
          >
            Εισάγεται τα ονόματα των 2 παιχτών
            <hr />
          </Typography>
          <div className={styles.textField}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Δώσε το όνομα του 1ου παίχτη"
              variant="outlined"
              value={textName1}
              onChange={onChangePlayer1Handler}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Δώσε το όνομα του 2ου παίχτη"
              variant="outlined"
              value={textName2}
              onChange={onChangePlayer2Handler}
            />
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
              onClick={onSubmitNamesHandler}
            >
              Καταχωρησε τα ονοματα
            </Button>
          </div>
        </Box>
      </Modal>

      {showScore && (
        <ShowScore
          player1={player1}
          player2={player2}
          showScore={showScore}
          setShowScore={setShowScore}
        />
      )}

      {(playersTurn !== null) && 
       <>
       <div className={styles.outerMainScreen}>
          <div className={styles.innerMainContainer}>
            <div className={styles.innerMain}>
              {!selectedItem ? (
                <div className={styles.emptyDiv}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={[{ textAlign: "center" }, { fontSize: "26px" }]}
                    >
                    Επίλεξε μία κατηγορία
                  </Typography>
                </div>
              ) : (
                <MainScreen
                selectedItem={selectedItem}
                bonus={bonus}
                onSubmitAnswerHandler={onSubmitAnswerHandler}
                onChangeAnswerHandler={onChangeAnswerHandler}
                text={text}
                />
              )}
              <QuestionsContainer
                categories={categories}
                bonuses={playersTurn.bonus}
                disableButtons={disableButtons}
                onClickBonusHandler={onClickBonusHandler}
                onClickQuestionHandler={onClickQuestionHandler}
                setDisabledButtons={setDisableButtons}
              />
            </div>
          </div>
        </div>
        </>
      }
    </>
  );
}