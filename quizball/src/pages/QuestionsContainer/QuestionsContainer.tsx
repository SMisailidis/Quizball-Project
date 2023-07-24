import styles from "../../styles/QuestionsContainer.module.css";
import { CategoryType } from "../../types/CategoryType";
import { Box, Button, Modal, Typography } from "@mui/material";
import BonusActions from "../BonusActions/BonusActions";
import { useState } from "react";
import { SelectedItemType } from "../../types/SelectedItemType/SelectedItemType";

interface propsType {
  categories: CategoryType[];
  bonuses: string[];
  disableButtons: boolean;
  onClickBonusHandler: (bonus: string) => void;
  onClickQuestionHandler: (question: SelectedItemType) => void;
  setDisabledButtons: (flag: boolean) => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "43%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 640,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

const QuestionsContainer = (props: propsType) => {
  const categories: CategoryType[] = props.categories;
  const [openBonus, setOpenBonus] = useState(false);
  const handleOpenBonus = () => setOpenBonus(true);
  const handleCloseBonus = () => setOpenBonus(false);
  const [obj, setObj] = useState<SelectedItemType | undefined>()

  const onClickBonusHandler = (text: string) => {
    handleCloseBonus();

    props.onClickQuestionHandler(obj as SelectedItemType);
    props.onClickBonusHandler(text);
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();

    const splittedID = e.target.id.split(" ");
    const categoryID = splittedID[0];
    const questionID = splittedID[1];

    const categoryIndex = findIndex(categoryID, categories);

    const questionIndex = findIndex(
      questionID,
      categories[categoryIndex].questions
    );

    setObj({
      category: categories[categoryIndex],
      question: categories[categoryIndex].questions[questionIndex],
    })

    if (props.bonuses.findIndex(bonus => bonus !== "x2") !== 0) handleOpenBonus();
    
    if(props.bonuses.length === 0 || props.bonuses[0] === "50-50"){
      props.onClickQuestionHandler(obj as SelectedItemType);
    }
    props.setDisabledButtons(true);
  };

  const findIndex = (id: string, obj: Array<any>) => {
    const index = obj.findIndex((obj) => obj.id === id);
    return index;
  };

  return (
    <>
      <Modal
        open={openBonus}
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
            Θες να επιλέξεις κάποια βοήθεια;
          </Typography>
          <BonusActions
            onClickBonusHandler={onClickBonusHandler}
            bonuses={props.bonuses}
          />
        </Box>
      </Modal>
      <div className={styles.container}>
        <ul className={styles.list}>
          {categories.map((category, index) => (
            <div
              className={styles.outerCategories}
              key={index}
              style={{
                backgroundColor: `${category.bgColor}`,
              }}
            >
              <li className={styles.innerCategories} key={index}>
                <span className={styles.span}>
                  {category.type.toUpperCase()}
                </span>
                <div className={styles.buttonContainer}>
                  {category.questions.map((question, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      disabled={props.disableButtons }
                      id={`${category.id} ${question.id}`}
                      value={question.difficulty}
                      sx={[
                        { backgroundColor: `${category.bgColor}` },
                        {
                          "&:hover": {
                            backgroundColor: "#98e1e9",
                          },
                        },
                        {
                          border: "2px solid white",
                        },
                        {
                          borderRadius: "35px",
                        },
                        {
                          fontSize: "18px",
                        },
                      ]}
                      onClick={onClickHandler}
                    >
                      {`x${question.difficulty}`}
                    </Button>
                  ))}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuestionsContainer;
