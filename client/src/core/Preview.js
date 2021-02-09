import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import 'moment/locale/th';
import { API, IMG_URL, SVG_URL, ZIP_URL } from '../config';
import { toast } from 'react-toastify';
import Modal from '../componenets/Modal';
import { Grid, _ } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import MaterialNavbar from '../componenets/MaterialNavbar';
import LightBox from '../componenets/LightBox';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Mansory from '../componenets/Grid';

const Preview = () => {
  const [dataRow, setdataRow] = useState([]);
  const [image, setImage] = useState([]);
  const [open, setOpen] = useState(true);

  const init = () => {
    Axios.get(`${API}/list`).then((result) => {
      setdataRow(result.data);
    });
    Axios.get(`${API}/image`).then((result) => {
      setImage(result.data);
    });
  };

  const gotoURL = (url) => {
    window.open(url);
  };

  const handleDelete = (link) => {
    Axios.delete(`${API}/delete`, { data: { deleteId: link } }).then((data) => {
      toast.success('Delete Successful', {
        closeOnClick: true,
        duration: 1500,
      });
      init();
    });
  };

  const subStringTextURL = (text) => {
    return text.substring(2);
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const dataArray = [];
  dataRow.map((e) => {
    dataArray.push([
      e.web_id,
      _(
        e.img_path ? (
          <LightBox img={e.img_path} webId={e.web_id} />
        ) : (
          'ไม่มีรูปแสดง'
        )
      ),
      e.web_name.slice(0, 10),
      e.web_url
        ? subStringTextURL(`${e.web_url.match(/\/.*?\/.*?(?=\/)/) || [][0]}`)
        : '-',
      e.web_details ? e.web_details.slice(0, 30) : '-',
      moment(e.timestamp).locale('th').format('lll'),
      _(
        e.zip_path !== null ? (
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">{e.zip_path}</Typography>
              </React.Fragment>
            }
          >
            <img
              style={{ width: '30px', cursor: 'pointer' }}
              src={`${SVG_URL}/zip.svg`}
              onClick={() => window.open(`${ZIP_URL}/${e.zip_path}`)}
            />
          </HtmlTooltip>
        ) : (
          'No'
        )
      ),
      _(
        <div className="ml-1">
          <LightTooltip title="ไปเว็บ" placement="top">
            <button
              onClick={() => gotoURL(e.web_url)}
              className="btn btn-success p-1 mr-1"
            >
              <i className="fas fa-external-link-alt"></i>
            </button>
          </LightTooltip>
          <LightTooltip title="รูปภาพ" placement="top">
            <a href={`/image/${e.web_id}`}>
              <button className="btn btn-warning p-1 mr-1">
                <i className="fas fa-clone"></i>
              </button>
            </a>
          </LightTooltip>
          <LightTooltip title="แก้ไข" placement="top">
            <a href={`/edit/${e.web_id}`}>
              <button className="btn btn-primary p-1 mr-1">
                <i className="fas fa-pen"></i>
              </button>
            </a>
          </LightTooltip>

          <Modal
            deleteLink={handleDelete}
            LinkId={e.web_id}
            linkName={e.web_name}
          >
            <button className="btn btn-danger p-1">
              <i className="fas fa-times"></i>
            </button>
          </Modal>
        </div>
      ),
    ]);
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <MaterialNavbar />
      <div className="d-flex justify-content-end mt-1">
        <FormControlLabel
          control={
            <Switch
              onClick={() => setOpen(!open)}
              name="checkedB"
              color="default"
              defaultChecked={false}
            />
          }
          label={open ? 'Grid' : 'Table'}
        />
      </div>
      {!open ? (
        <div className="m-2">
          <Grid
            data={dataArray}
            columns={[
              'รหัส',
              'รูปภาพ',
              'ชื่อ',
              'ลิงค์',
              'รายละเอียด',
              'วันที่',
              'ไฟล์',
              { name: 'จัดการ', width: '70px' },
            ]}
            search={true}
            sort={true}
            fixedHeader={true}
            pagination={{ enabled: true, limit: 10 }}
            style={{ margin: '0 auto' }}
          />
        </div>
      ) : (
        <Mansory />
      )}
    </>
  );
};

export default Preview;
