import React, { useState } from "react";
import Board, { moveCard, moveColumn, removeCard, addCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import useBoard from "../../store/Board";
import "./Board.css";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import AddCardModal from "../../Components/AddCardModal/AddCardModal";

const Boards = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null); // track column for modal
  const { board, setBoard } = useBoard();

  // Handle moving a column
  const handleColumnMove = (_column, source, destination) => {
    const updatedBoard = moveColumn(board, source, destination);
    setBoard(updatedBoard);
  };

  // Handle moving a card
  const handleCardMove = (_card, source, destination) => {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
  };

  // Get column containing a card
  const getColumn = (card) => {
    const column = board.columns.find((col) => col.cards.includes(card));
    return column || {};
  };

  // Get gradient color for a card based on its column title
  const getGradient = (card) => {
    const column = getColumn(card);
    const title = column.title;
    switch (title) {
      case "TODO":
        return { background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(48,189,220,1) 163.54%)" };
      case "Doing":
        return { background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(220,48,48,1) 163.54%)" };
      case "Completed":
        return { background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(48,220,86,1) 163.54%)" };
      case "Backlog":
        return { background: "linear-gradient(65.35deg, rgba(65,65,65,0.67) -1.72%, rgba(134,48,220,1) 163.54%)" };
      default:
        return {};
    }
  };

  // Handle adding a new card
  const handleCardAdd = (title, description) => {
    if (!activeColumn) return;
    const card = {
      id: new Date().getTime(),
      title,
      description,
    };
    const updatedBoard = addCard(board, activeColumn, card);
    setBoard(updatedBoard);
    setModalOpened(false);
  };

  return (
    <div className="board-container">
      <h2>Trello Board</h2>
      <Board
        initialBoard={board}
        allowAddColumn
        allowRenameColumn
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onColumnDragEnd={handleColumnMove}
        renderCard={(props) => (
          <div className="kanban-card" style={getGradient(props)}>
            <div className="card-header">
              <span>{props.title || "No title"}</span>
              <button
                className="remove-button"
                type="button"
                onClick={() => {
                  const updatedBoard = removeCard(board, getColumn(props), props);
                  setBoard(updatedBoard);
                }}
              >
                <RxCross2 color="white" size={15} />
              </button>
            </div>
            <span>{props.description || ""}</span>
          </div>
        )}
        renderColumnHeader={(props) => (
          <div className="column-header">
            <span>{props.title}</span>
            <IoMdAdd
              color="white"
              size={25}
              title="Add card"
              onClick={() => {
                setActiveColumn(props); // set the column for modal
                setModalOpened(true);
              }}
            />
            <AddCardModal
              visible={modalOpened && activeColumn === props}
              handleCardAdd={handleCardAdd}
              onClose={() => setModalOpened(false)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Boards;
