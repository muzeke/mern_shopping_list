import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/ItemActions";

import PropTypes from "prop-types";

import ItemModal from "./ItemModal";
import axios from "axios";
const ShoppingList = (props) => {
  const { items, loading } = props.item;
  const getSomething = () => {
    axios.get("/api/items").then((res) => {
      console.log(res.data);
    });
  };
  useEffect(() => {
    props.getItems();
    getSomething();
    //disable rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ItemModal />
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  style={{ marginRight: "1rem" }}
                  onClick={() => props.deleteItem(_id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
          {loading ? (
            <CSSTransition key={3} timeout={500} classNames="fade">
              <ListGroupItem>Loading items..</ListGroupItem>
            </CSSTransition>
          ) : (
            ""
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
