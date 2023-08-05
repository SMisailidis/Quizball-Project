import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Player } from "../../classes/Player";
import { useEffect } from "react";

interface PropsType {
  player1: Player | null;
  player2: Player | null;
  showScore: boolean;
  setShowScore: (flag: boolean) => void;
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
  animation: "modalAnimation 0.5s ease-in-out",
};

const ShowScore = (props: PropsType) => {
  const handleClose = () => props.setShowScore(false);

  useEffect(() => {
    const timer = setTimeout(handleClose, 2500); // Close modal after 3 seconds

    return () => {
      clearTimeout(timer); // Clear the timeout if the component unmounts before 3 seconds
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes modalAnimation {
            0% {
              opacity: 0;
              transform: translate(-50%, 100%);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        `}
      </style>
      <Modal
        open={props.showScore}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {props.player1 !== null && props.player2 !== null && (
            <TableContainer component={Paper} sx={[{ borderRadius: "20px" }]}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontSize: "20px" }}>
                      {props.player1.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "20px" }}>
                      {props.player2.name}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" sx={{ fontSize: "20px" }}>
                      {props.player1.score}
                    </TableCell>

                    <TableCell align="center" sx={{ fontSize: "20px" }}>
                      {props.player2.score}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ShowScore;
