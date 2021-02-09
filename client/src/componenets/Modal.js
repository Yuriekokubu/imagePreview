import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const ModalButton = ({ deleteLink, LinkId, linkName }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    deleteLink(LinkId);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  return (
    <>
      <LightTooltip title="ลบ" placement="top">
        <Button className="px-2 py-1" variant="danger" onClick={handleShow}>
          <i className="fas fa-close"></i>
        </Button>
      </LightTooltip>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการลบ </Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการลบลิ้ง {linkName} ใช่หรือไม่ ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="danger" onClick={() => handleDelete(LinkId)}>
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalButton;
