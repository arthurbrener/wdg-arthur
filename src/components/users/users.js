import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-materialize";
import { useHistory, useLocation } from "react-router-dom";
import { useStore } from "react-redux";
import { getUserList, deleteUserById } from "../../api";
import qS from "query-string";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
  },
};

Modal.setAppElement("#root");

const UserList = ({ notifier, loading }) => {
  const history = useHistory(),
    location = useLocation(),
    store = useStore(),
    [usersList, setUsersList] = useState([]),
    [currentPage, setCurrentPage] = useState(
      parseInt(qS.parse(location.search).page) || 1
    ),
    [idToDelete, setIdToDelete] = useState(null),
    [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    history.push(`/users?page=${currentPage}`);
    const loadUsers = async () => {
      loading(true);
      const response = await getUserList(currentPage, store);
      setUsersList(response.data);
      loading(false);
    };

    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, currentPage, history]);

  const editUser = (id) => {
    history.push(`/users/${id}`);
  };

  const deleteUser = async () => {
    closeModal();
    await deleteUserById(idToDelete, store);
    notifier("Usuário removido.");
  };

  const generateUsersListHtml = () => {
    if (usersList?.data) {
      const usersListData = usersList.data,
        usersListHtml = [];
      for (let i = 0; i < usersListData.length; i++) {
        usersListHtml.push(
          <li className="collection-item" key={usersListData[i].id}>
            <span
              className="text-link"
              onClick={() => editUser(usersListData[i].id)}
            >
              {usersListData[i].first_name} {usersListData[i].last_name}
            </span>
            <span
              className="right cursor-pointer"
              title="Deletar usuário"
              onClick={() => openModal(usersListData[i].id)}
            >
              &#10006;
            </span>
          </li>
        );
      }
      return usersListHtml;
    }
  };

  const generateUsersListPaginationHtml = () => {
    if (usersList) {
      const usersListPaginationHtml = [];
      for (let i = 0; i < usersList.total_pages; i++) {
        usersListPaginationHtml.push(
          <li
            className={currentPage === i + 1 ? "active" : "waves-effect"}
            onClick={() => goToPage(i + 1)}
            key={i}
          >
            <span>{i + 1}</span>
          </li>
        );
      }
      return usersListPaginationHtml;
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  function openModal(id) {
    setIdToDelete(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Row>
      <Col m={12} s={12}>
        <h5 className="subtitle">Usuários</h5>
        <Card>
          <div>
            <ul className="collection">{generateUsersListHtml()}</ul>
            <ul className="pagination">
              <li className={currentPage === 1 ? "disabled" : "waves-effect"}>
                <span
                  onClick={() => {
                    if (currentPage !== 1) goToPage(currentPage - 1);
                  }}
                >
                  <i className="material-icons">chevron_left</i>
                </span>
              </li>
              {generateUsersListPaginationHtml()}
              <li
                className={
                  currentPage === usersList.total_pages
                    ? "disabled"
                    : "waves-effect"
                }
              >
                <span
                  onClick={() => {
                    if (currentPage !== usersList.total_pages)
                      goToPage(currentPage + 1);
                  }}
                >
                  <i className="material-icons">chevron_right</i>
                </span>
              </li>
            </ul>

            <div>
              <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div>Confirma a remoção do usuário?</div>
                <div className="modal-btn">
                  <Button
                    waves="light"
                    className="red darken-2"
                    onClick={deleteUser}
                  >
                    SIM
                  </Button>
                  <Button
                    waves="light"
                    className="blue darken-2"
                    onClick={closeModal}
                  >
                    NÃO
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserList;
