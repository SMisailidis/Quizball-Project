import { Button } from "@mui/material";
import styles from "../../styles/BonusActions.module.css";

interface PropsType {
  onClickBonusHandler: (bonus: string) => void;
  bonuses: string[];
}

const BonusActions = (props: PropsType) => {
  const onClickBonusHandler = (e: any) => {
    props.onClickBonusHandler(e.target.value);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.buttonContainer}>
        {props.bonuses.map((bonus, index) => (
          <Button
            className={styles.button}
            key={index}
            variant="contained"
            value={bonus}
            sx={[
              { backgroundColor: "#00998e" },
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
            onClick={onClickBonusHandler}
          >
            {bonus}
          </Button>
        ))}
        <Button
          variant="contained"
          sx={[
            { backgroundColor: "#fb4949" },
            {
              "&:hover": {
                backgroundColor: "#fd0000",
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
          onClick={onClickBonusHandler}
        >
          skip
        </Button>
      </div>
    </div>
  );
};

export default BonusActions;
