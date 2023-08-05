import styles from "../../styles/QuestionsContainer.module.css";
import heights from "../../styles/scrollOnHeightResizeFix.module.css";
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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
  
};

const QuestionsContainer = (props: propsType) => {
  const categories: CategoryType[] = props.categories;
  const [openBonus, setOpenBonus] = useState(false);
  const handleCloseBonus = () => setOpenBonus(false);
  const [obj, setObj] = useState<SelectedItemType | undefined>()
  
  const handleOpenBonus = () => {
    setOpenBonus(true)
  };

  const onClickBonusHandler = (text: string) => {
    handleCloseBonus();

    onClickQuestionHandler(obj as SelectedItemType)

    if(text !== "")
      props.onClickBonusHandler(text);
  };

  const onClickHandler = (e: any) => {
    const viewPortWidth = document.documentElement.clientWidth;
    
    let qContainer;
    if(viewPortWidth <= 1200){
      qContainer = document.getElementById("container") as HTMLElement;
      qContainer.style.display = "none";
    }
       

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

    handleOpenBonus();

    props.setDisabledButtons(true);
  };

  const onClickQuestionHandler = (obj: SelectedItemType) => {
    props.onClickQuestionHandler(obj);
  }

  const findIndex = (id: string, obj: Array<any>) => {
    const index = obj.findIndex((obj) => obj.id === id);
    return index;
  };

  return (
    <>
    <div>
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
            Θέλεις να επιλέξεις κάποια βοήθεια;
          </Typography>
          <BonusActions
            onClickBonusHandler={onClickBonusHandler}
            bonuses={props.bonuses}
          />
        </Box>
      </Modal>
      </div>
      <div className={styles.container} id="container">
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
                            backgroundColor: "#fff",
                            color:`${category.bgColor}`
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
                        {
                          width: "8vw",
                        }
                        
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
