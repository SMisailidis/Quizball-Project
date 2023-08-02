import { Button } from "@mui/material"
import styles from "../../styles/SelectOptions.module.css"

interface propsType {
    setIsOpenQuiz: (flag: boolean) => void;
    setIsOpenUpload: (flag: boolean) => void;
    setHideSelectButtons: (flag: boolean) => void;
}


const SelectOptions = (props: propsType) => {

    const onClickSelectHandler = (e: any) => {
        const clicked = e.target.value

        if (clicked === "up") {
            props.setIsOpenUpload(true)
        }
        else {
            props.setIsOpenQuiz(true)
        }
        props.setHideSelectButtons(false)
    }

    return (
        <div className={styles.card}>
            <div className={styles.outerContainer}>
                <div className={styles.buttonContainers}>
                    <Button variant="outlined"  sx = {{padding: "10px 0"}} value={"up"} onClick={onClickSelectHandler}>
                        Ανεβασε τις δικες σου ερωτησεις!
                    </Button>
                    <Button variant="outlined" sx = {{padding: "10px 0"}} value={"play"} onClick={onClickSelectHandler}>
                        Παιξε τωρα Quizball!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SelectOptions