import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import { useHistory } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ViewListIcon from '@material-ui/icons/ViewList';
import FaceIcon from '@material-ui/icons/Face';
import { SVG_URL } from '../config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: '#2c2d2f' }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push('/insert');
            }}
          >
            <img src={`${SVG_URL}/logo.png`} style={{ width: '30px' }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Link Preview
          </Typography>
          {isAuthenticated().auth && (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  history.push('/preview');
                }}
              >
                <ViewListIcon />
                <Typography variant="body1" className={classes.title}>
                  {' '}
                  รายการ
                </Typography>
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  history.push('/insert');
                }}
              >
                <AddPhotoAlternateIcon />
                <Typography variant="body1" className={classes.title}>
                  {' '}
                  เพิ่ม
                </Typography>
              </IconButton>{' '}
            </>
          )}

          {!(isAuthenticated().auth) && (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  history.push('/grid');
                }}
              >
                <Typography variant="body1" className={classes.title}>
                  {' '}
                  เข้าชมตัวอย่าง
                </Typography>
              </IconButton>{' '}
            </>
          )}

          {isAuthenticated().auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <FaceIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() =>
                    signout(() => {
                      history.push('/');
                    })
                  }
                >
                  ออกจากระบบ
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
