import LogoInconnu from '../../assets/inconnu.jpeg';
import { Link } from 'react-router-dom';
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { AiFillSetting, AiOutlineLogin, AiOutlineLogout, AiOutlineReload } from 'react-icons/ai';
import classNames from 'classnames';
import { useLogin } from 'Hooks/LoginProvider';
import axios from 'axios';

export default function ProfileButton(): JSX.Element {
  const buttonColor = 'bg-[#CCCCCC]';
  const textColor = 'text-black';
  const { isLogged, userInfos, getUserData } = useLogin();


  const handleComplain = (): void => {
    axios
      .post('/?page=specials&action=complain', '', { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          getUserData({ reload: true, announce: false });
        }
      })
      .catch(() => {});
  };

  return (
    <div>
    
      <Button onClick={handleComplain} className='bg-[#FA8072] p-2 mr-4'>Complain {userInfos?.css_click}</Button>
      
      <Menu>
        <MenuHandler>
          <Avatar tabIndex={-1}
            variant="circular"
            alt={`${userInfos?.login ?? ''}`}
            className="cursor-pointer"
            src={(isLogged &&
                userInfos &&
                userInfos.avatar_url) ||
              LogoInconnu
            }
          />
        </MenuHandler>

        <MenuList className='dark:bg-gray-900'>
          {isLogged && userInfos && (
            <>
              <Typography tabIndex={0} variant="small" className="font-normal outline-none">
                {userInfos.login || ''}
              </Typography>
              <Typography variant="small" className="font-normal">
                {userInfos.display_name || ''}
              </Typography>
              <hr className="my-2 border-blue-gray-50" />
            </>
          )}

          {(isLogged && (

            <>
              <div onClick={() => { getUserData({ reload: true, announce: true }); }}>
                <MenuItem className={classNames('flex items-center gap-2 mb-2', buttonColor)}>
                  <AiOutlineReload className={classNames(textColor)} />
                  <Typography variant="small" className={classNames('font-normal', textColor)}>
                    Reload
                  </Typography>
                </MenuItem>
              </div>

              <Link to={'/settings'}>
                <MenuItem className={classNames('flex items-center gap-2', buttonColor)}>
                  <AiFillSetting className={classNames(textColor)} />
                  <Typography variant="small" className={classNames('font-normal', textColor)}>
                    Settings
                  </Typography>
                </MenuItem>
              </Link>

              <hr className="my-2 border-blue-gray-50" />

              <Link to={'/logout'}>
                <MenuItem className={classNames('flex items-center gap-2', buttonColor)}>
                  <AiOutlineLogin className={classNames(textColor)} />

                  <Typography variant="small" className={classNames('font-normal', textColor)}>
                      Logout
                  </Typography>
                </MenuItem>
              </Link>
            </>

          )) || (
            <a href={`/api/?page=login&action=authorizeapi&next=${encodeURIComponent(window.location.pathname+window.location.search)}`}>
              <MenuItem className={classNames('flex items-center gap-2', buttonColor)}>
                <AiOutlineLogout className={classNames(textColor)} />

                <Typography variant="small" className={classNames('font-normal', textColor)}>
                  Login api
                </Typography>
              </MenuItem>
            </a>
          )}

        </MenuList>
      </Menu>
    </div>


  );
}
