import styles from "./styles/main.module.css";
import heights from "./styles/scrollOnHeightResizeFix.module.css";
import QuestionsContainer from "./pages/QuestionsContainer/QuestionsContainer";
import ShowScore from "./pages/ShowScore/ShowScore";
import MainScreen from "./pages/MainScreen/MainScreen";
import { SelectedItemType } from "./types/SelectedItemType";
import { CategoryType } from "./types/CategoryType";
import { QuestionsType } from "./types/QuestionsType";
import { Player } from "./classes/Player";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import UploadQuestions from "./pages/UploadQuestions/UploadQuestions";
import SelectOptions from "./pages/SelectOptions/SelectOptions";
import HomeIcon from "@mui/icons-material/Home";

export default function Home() {
  document.title = "Quizball";
  const [categories, setCategories] = useState<CategoryType[]>();
  const [selectAnswers, setSelectAnswers] = useState<CategoryType[]>();
  const [selectedItem, setSelectedItem] = useState<
    SelectedItemType | undefined
  >();
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [playersTurn, setPlayersTurn] = useState<Player | null>(null);
  const [bonus, setBonus] = useState("");
  const [text, setText] = useState("");
  const [textName1, setTextName1] = useState("");
  const [textName2, setTextName2] = useState("");
  const [open, setOpen] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isOpenQuiz, setIsOpenQuiz] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [hideSelectButtons, setHideSelectButtons] = useState(true);
  const [toggleHome, setToggleHome] = useState(false);

  const removeTonalMarks = (text: string) => {
    const tonalMarksRegex = /[\u0300-\u036F]/g;
    return text.normalize("NFD").replace(tonalMarksRegex, "");
  };

  useEffect(() => {
    fetchDataAndProcess(setCategories, setSelectAnswers);
  }, []);

  const fetchDataAndProcess = async (
    setCategories: any,
    setSelectAnswers: any
  ) => {
    try {
      const response = await fetch(
        "https://quizball-project-default-rtdb.europe-west1.firebasedatabase.app/categories.json"
      );
      const firebaseData = await response.json();

      if (firebaseData) {
        const dataArray: CategoryType[] = Object.values(firebaseData);

        const loadedData = dataArray.map((dataItem) => ({
          type: dataItem.type,
          id: dataItem.id,
          bgColor: dataItem.bgColor,
          questions: getRandomQuestions(dataItem.questions, 3),
        }));

        setCategories(loadedData);
        setSelectAnswers(loadedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRandomQuestions = (data: QuestionsType[], numQuestions: number) => {
    const dataArray: any[] = Object.values(data); // Convert the object values to an array
    const shuffledArray = shuffleArray(dataArray);

    const selectedQuestions: any[] = [];
    const difficultyQuestions: any = {
      1: [],
      2: [],
      3: [],
    };

    for (const question of shuffledArray) {
      if (difficultyQuestions[question.difficulty].length < 1) {
        difficultyQuestions[question.difficulty].push(question);
        selectedQuestions.push(question);
      }
      if (selectedQuestions.length === numQuestions) {
        break;
      }
    }
    return selectedQuestions.sort((a, b) => a.difficulty - b.difficulty);
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
    setOpen(false);
  };

  const onUpdatePlayers = (p1: Player, p2: Player) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setPlayersTurn(p1);
  };

  const onChangeAnswerHandler = (text: string) => {
    setText(text);
  };

  const onClickQuestionHandler = (selectedItem: SelectedItemType) => {
    setSelectedItem(selectedItem);
  };

  const onClickBonusHandler = (b: string) => {
    setBonus(b);
    setDisableButtons(true);
  };

  const onSubmitAnswerHandler = () => {
    setText("");
    setSelectedItem(undefined);

    if (!selectedItem) return;

    if (playersTurn === null) return;

    let points: number = selectedItem.question.difficulty;

    if (bonus === "x2") {
      points = points * 2;
    } else if (bonus === "50-50") {
      setBonus("50-50");
      points = 1;
    }

    const noTonalText = removeTonalMarks(text);
    setShowScore(true);

    if (
      noTonalText.toUpperCase() === selectedItem.question.answer.toUpperCase()
    ) {
      alert("Congratulations! You got it right!");
      playersTurn.setScore(points);
    } else {
      alert(
        "Wrong answer! The correct one was " +
          selectedItem.question.answer +
          "!"
      );
    }

    let qContainer = document.getElementById("container");
    if (qContainer?.style.display === "none") qContainer.style.display = "flex";

    checkWinner();
    removeQuestion();
    pickTurn();
    setDisableButtons(false);
  };

  const removeQuestion = () => {
    if (!selectedItem) return;

    if (playersTurn === null) return;

    setCategories((prevCategories) => {
      if (!prevCategories) return;

      const categoryIdToFilter = selectedItem.category.id;

      const categoryToFilter = prevCategories.find(
        (category) => category.id === categoryIdToFilter
      );

      if (!categoryToFilter) {
        return prevCategories;
      }

      const filteredQuestions = categoryToFilter.questions.filter(
        (question) => question.id !== selectedItem.question.id
      );

      const updatedCategories = prevCategories.map((category) => {
        if (category.id === categoryIdToFilter) {
          return {
            ...category,
            questions: filteredQuestions,
          };
        } else {
          return category;
        }
      });

      return updatedCategories;
    });

    if (bonus === "") return;

    const updatedBonuses = playersTurn.bonus.filter(
      (curBonus) => curBonus !== bonus
    );

    playersTurn.setBonuses(updatedBonuses);
    setBonus("");
  };

  const checkWinner = () => {
    if (!categories) return;

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
    if (player1 === null || player2 === null) return;

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
    if (playersTurn === null || player1 === null) return;

    if (playersTurn.name === player1.name) {
      setPlayersTurn(player2);
    } else {
      setPlayersTurn(player1);
    }
  };

  const retrievesAnswers = () => {
    const tempArray: Array<string> = [];

    selectAnswers?.map((category) => {
      category.questions.map((question) => {
        tempArray.push(question.fiftyFiftyBonus[0]);
        tempArray.push(question.fiftyFiftyBonus[1]);
      });
    });

    const noDuplicates: Set<string> = new Set(tempArray);

    return Array.from(noDuplicates).sort();
  };

  const onClickHandleHome = () => {
    resetAll();
  };

  const resetAll = () => {
    setToggleHome(false);
    setIsOpenQuiz(false);
    setIsOpenUpload(false);
    setHideSelectButtons(true);
    setOpen(true);
    setShowScore(false);
    setDisableButtons(false);
    setSelectedItem(undefined);
    setPlayersTurn(null);
    setPlayer1(null);
    setPlayer2(null);
    setBonus("");
    setText("");
    setTextName1("");
    setTextName2("");
    fetchDataAndProcess(setCategories, setSelectAnswers);
  };

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    width: "55%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "40px",
    boxShadow: 24,
    p: 5,
    overflow: "scroll",
  };

  const disableScrollbar = {
    scrollbarWidth: "none",
  };

  return (
    <>
      {hideSelectButtons && (
        <SelectOptions
          setIsOpenQuiz={setIsOpenQuiz}
          setIsOpenUpload={setIsOpenUpload}
          setHideSelectButtons={setHideSelectButtons}
          setToggleHome={setToggleHome}
        />
      )}

      {isOpenUpload && (
        <UploadQuestions
          categories={categories as CategoryType[]}
          setIsOpenUpload={setIsOpenUpload}
          setHideSelectButtons={setHideSelectButtons}
        >
          <div className={styles.homeButtonContainer}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ border: "1px solid black" }}
              onClick={onClickHandleHome}
            >
              <HomeIcon />
            </IconButton>
          </div>
        </UploadQuestions>
      )}

      {isOpenQuiz && (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={heights.bodyFix}>
            <Box sx={[modalStyle, disableScrollbar, { height: "30%" }]}>
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
                    { backgroundColor: "#347FB1" },
                    {
                      "&:hover": {
                        backgroundColor: "#2e6a92",
                      },
                    },
                  ]}
                  onClick={onSubmitNamesHandler}
                >
                  Καταχωρησε τα ονοματα
                </Button>
              </div>
            </Box>
          </div>
        </Modal>
      )}

      {showScore && (
        <ShowScore
          player1={player1}
          player2={player2}
          showScore={showScore}
          setShowScore={setShowScore}
        />
      )}

      {playersTurn !== null && (
        <>
          <div className={styles.homeButtonContainer}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ border: "1px solid black" }}
              onClick={onClickHandleHome}
            >
              <HomeIcon />
            </IconButton>
          </div>
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
                      {"Επίλεξε μία κατηγορία\n"}
                      <p className={styles.playerName}>{playersTurn.name}</p>
                    </Typography>
                  </div>
                ) : (
                  <>
                    <MainScreen
                      selectedItem={selectedItem}
                      bonus={bonus}
                      setBonus={setBonus}
                      hasFifty={
                        playersTurn.bonus.find((bonus) => bonus === "50-50") !==
                        undefined
                      }
                      onSubmitAnswerHandler={onSubmitAnswerHandler}
                      onChangeAnswerHandler={onChangeAnswerHandler}
                      retrievesAnswers={retrievesAnswers}
                      text={text}
                    />
                  </>
                )}
                {categories && (
                  <QuestionsContainer
                    categories={categories}
                    bonuses={playersTurn.bonus}
                    disableButtons={disableButtons}
                    onClickBonusHandler={onClickBonusHandler}
                    onClickQuestionHandler={onClickQuestionHandler}
                    setDisabledButtons={setDisableButtons}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
